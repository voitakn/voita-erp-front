class Gettext {
    //context_glue = "\004";
    context_glue = "";
    _locale_data = {};
    constructor(params) {
        this.domain = params.domain || 'messages';
        if(params.locale_data) {
            this.locale_data = params.locale_data;
        }
        this.try_load_lang();
    }
    async ErpGetPoFile(url = '') {
        const response = await fetch(url);
        return await response.text();
    }
    try_load_lang() {
        if(this.locale_data) {
            let locale_copy = this.locale_data;
            this.locale_data = undefined;
            this.parse_locale_data(locale_copy);
        }

        const links = document.querySelectorAll('link[rel=gettext]');
        if(links.length > 0) {
            links.forEach(link => {
                if (link.type === 'application/x-po') {
                    this.try_load_lang_po(link.href)
                }
            });
        }
    }
    parse_locale_data(locale_data) {
        // suck in every domain defined in the supplied data
        for (var domain in locale_data) {
            // skip empty specs (flexibly)
            if ((! locale_data.hasOwnProperty(domain)) || (! this.isValidObject(locale_data[domain])))
                continue;
            // skip if it has no msgid's
            var has_msgids = false;
            for (var msgid in locale_data[domain]) {
                has_msgids = true;
                break;
            }
            if (! has_msgids) continue;

            // grab shortcut to data
            var data = locale_data[domain];

            // if they specifcy a blank domain, default to "messages"
            if (domain == "") domain = "messages";
            // init the data structure
            if (! this.isValidObject(this._locale_data[domain]) )
                this._locale_data[domain] = { };
            if (! this.isValidObject(this._locale_data[domain].head) )
                this._locale_data[domain].head = { };
            if (! this.isValidObject(this._locale_data[domain].msgs) )
                this._locale_data[domain].msgs = { };

            for (let key in data) {
                if (key == "") {
                    var header = data[key];
                    for (var head in header) {
                        var h = head.toLowerCase();
                        this._locale_data[domain].head[h] = header[head];
                    }
                } else {

                    this._locale_data[domain].msgs[key] = data[key];
                }
            }
        }

        // build the plural forms function
        for (var domain in this._locale_data) {
            if (this.isValidObject(this._locale_data[domain].head['plural-forms']) &&
                typeof(this._locale_data[domain].head.plural_func) == 'undefined') {
                // untaint data
                var plural_forms = this._locale_data[domain].head['plural-forms'];
                var pf_re = new RegExp('^(\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;a-zA-Z0-9_\(\)])+)', 'm');
                if (pf_re.test(plural_forms)) {
                    //ex english: "Plural-Forms: nplurals=2; plural=(n != 1);\n"
                    //pf = "nplurals=2; plural=(n != 1);";
                    //ex russian: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10< =4 && (n%100<10 or n%100>=20) ? 1 : 2)
                    //pf = "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)";

                    var pf = this._locale_data[domain].head['plural-forms'];
                    if (! /;\s*$/.test(pf)) pf = pf.concat(';');
                    /* We used to use eval, but it seems IE has issues with it.
                     * We now use "new Function", though it carries a slightly
                     * bigger performance hit.
                    var code = 'function (n) { var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) }; };';
                    this._locale_data[domain].head.plural_func = eval("("+code+")");
                    */
                    var code = 'var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) };';
                    this._locale_data[domain].head.plural_func = new Function("n", code);
                } else {
                    throw new Error("Syntax error in language file. Plural-Forms header is invalid ["+plural_forms+"]");
                }

                // default to english plural form
            } else if (typeof(this._locale_data[domain].head.plural_func) == 'undefined') {
                this._locale_data[domain].head.plural_func = function (n) {
                    var p = (n != 1) ? 1 : 0;
                    return { 'nplural' : 2, 'plural' : p };
                };
            } // else, plural_func already created
        }

        return 1;
    }
    try_load_lang_po(url) {
        var me = this;
        return this.ErpGetPoFile(url).then((data) => {
            if (!data) return;



            var domain = me.uri_basename(url);
            var parsed = me.parse_po(data);

            var rv = {};
            // munge domain into/outof header
            if (parsed) {
                if (! parsed[""]) parsed[""] = {};
                if (! parsed[""]["domain"]) parsed[""]["domain"] = domain;
                domain = parsed[""]["domain"];
                rv[domain] = parsed;
                me.parse_locale_data(rv);
            }
            return 1;
        });
    }
    uri_basename(uri) {
        var rv;
        if (rv = uri.match(/^(.*\/)?(.*)/)) {
            var ext_strip;
            if (ext_strip = rv[2].match(/^(.*)\..+$/))
                return ext_strip[1];
            else
                return rv[2];
        } else {
            return "";
        }
    }
    parse_po(data) {
        const rv = {};
        let buffer = {};
        var lastbuffer = "";
        const errors = [];
        const lines = data.split("\n");
        for (var i=0; i<lines.length; i++) {
            // chomp
            lines[i] = lines[i].replace(/(\n|\r)+$/, '');

            let match;

            // Empty line / End of an entry.
            if (/^$/.test(lines[i])) {
                if (typeof(buffer['msgid']) != 'undefined') {
                    var msg_ctxt_id = (typeof(buffer['msgctxt']) != 'undefined' &&
                        buffer['msgctxt'].length) ?
                        //buffer['msgctxt']+this.context_glue+buffer['msgid'] :
                        `${buffer['msgctxt']}${this.context_glue}${buffer['msgid']}` :
                        buffer['msgid'];
                    var msgid_plural = (typeof(buffer['msgid_plural']) != 'undefined' &&
                        buffer['msgid_plural'].length) ?
                        buffer['msgid_plural'] :
                        null;

                    // find msgstr_* translations and push them on
                    var trans = [];
                    for (var str in buffer) {
                        let match;
                        if (match = str.match(/^msgstr_(\d+)/))
                            trans[parseInt(match[1])] = buffer[str];
                    }
                    trans.unshift(msgid_plural);

                    // only add it if we've got a translation
                    // NOTE: this doesn't conform to msgfmt specs
                    if (trans.length > 1) rv[msg_ctxt_id] = trans;

                    buffer = {};
                    lastbuffer = "";
                }

                // comments
            } else if (/^#/.test(lines[i])) {
                continue;

                // msgctxt
            } else if (match = lines[i].match(/^msgctxt\s+(.*)/)) {
                lastbuffer = 'msgctxt';
                buffer[lastbuffer] = this.parse_po_dequote(match[1]);

                // msgid
            } else if (match = lines[i].match(/^msgid\s+(.*)/)) {
                lastbuffer = 'msgid';
                buffer[lastbuffer] = this.parse_po_dequote(match[1]);

                // msgid_plural
            } else if (match = lines[i].match(/^msgid_plural\s+(.*)/)) {
                lastbuffer = 'msgid_plural';
                buffer[lastbuffer] = this.parse_po_dequote(match[1]);

                // msgstr
            } else if (match = lines[i].match(/^msgstr\s+(.*)/)) {
                lastbuffer = 'msgstr_0';
                buffer[lastbuffer] = this.parse_po_dequote(match[1]);

                // msgstr[0] (treak like msgstr)
            } else if (match = lines[i].match(/^msgstr\[0\]\s+(.*)/)) {
                lastbuffer = 'msgstr_0';
                buffer[lastbuffer] = this.parse_po_dequote(match[1]);

                // msgstr[n]
            } else if (match = lines[i].match(/^msgstr\[(\d+)\]\s+(.*)/)) {
                lastbuffer = 'msgstr_'+match[1];
                buffer[lastbuffer] = this.parse_po_dequote(match[2]);

                // continued string
            } else if (/^"/.test(lines[i])) {
                buffer[lastbuffer] += this.parse_po_dequote(lines[i]);

                // something strange
            } else {
                errors.push("Strange line ["+i+"] : "+lines[i]);
            }
        }


        // handle the final entry
        if (typeof(buffer['msgid']) != 'undefined') {
            var msg_ctxt_id = (typeof(buffer['msgctxt']) != 'undefined' &&
                buffer['msgctxt'].length) ?
                //buffer['msgctxt']+this.context_glue+buffer['msgid'] :
                `${buffer['msgctxt']}${this.context_glue}${buffer['msgid']}` :
                buffer['msgid'];
            var msgid_plural = (typeof(buffer['msgid_plural']) != 'undefined' &&
                buffer['msgid_plural'].length) ?
                buffer['msgid_plural'] :
                null;

            // find msgstr_* translations and push them on
            var trans = [];
            for (var str in buffer) {
                let match;
                if (match = str.match(/^msgstr_(\d+)/))
                    trans[parseInt(match[1])] = buffer[str];
            }
            trans.unshift(msgid_plural);

            // only add it if we've got a translation
            // NOTE: this doesn't conform to msgfmt specs
            if (trans.length > 1) rv[msg_ctxt_id] = trans;

            buffer = {};
            lastbuffer = "";
        }


        // parse out the header
        if (rv[""] && rv[""][1]) {
            var cur = {};
            var hlines = rv[""][1].split(/\\n/);
            for (var i=0; i<hlines.length; i++) {
                if (! hlines.length) continue;

                var pos = hlines[i].indexOf(':', 0);
                if (pos != -1) {
                    var key = hlines[i].substring(0, pos);
                    var val = hlines[i].substring(pos +1);
                    var keylow = key.toLowerCase();

                    if (cur[keylow] && cur[keylow].length) {
                        errors.push("SKIPPING DUPLICATE HEADER LINE: "+hlines[i]);
                    } else if (/#-#-#-#-#/.test(keylow)) {
                        errors.push("SKIPPING ERROR MARKER IN HEADER: "+hlines[i]);
                    } else {
                        // remove begining spaces if any
                        val = val.replace(/^\s+/, '');
                        cur[keylow] = val;
                    }

                } else {
                    errors.push("PROBLEM LINE IN HEADER: "+hlines[i]);
                    cur[hlines[i]] = '';
                }
            }

            // replace header string with assoc array
            rv[""] = cur;
        } else {
            rv[""] = {};
        }

        // TODO: XXX: if there are errors parsing, what do we want to do?
        // GNU Gettext silently ignores errors. So will we.
        // alert( "Errors parsing po file:\n" + errors.join("\n") );

        return rv;
    }
    isValidObject(thisObject) {
        if (null == thisObject) {
            return false;
        } else if ('undefined' == typeof(thisObject) ) {
            return false;
        } else {
            return true;
        }
    }
    parse_po_dequote(str) {
        let match;
        if (match = str.match(/^"(.*)"/)) {
            str = match[1];
        }
        // unescale all embedded quotes (fixes bug #17504)
        str = str.replace(/\\"/g, "\"");
        return str;
    }
    dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category = 5) {
        if (! this.isValidObject(msgid)) return '';

        const plural = this.isValidObject(msgid_plural);
        const msg_ctxt_id = this.isValidObject(msgctxt) ?
            //msgctxt+this.context_glue+msgid :
            `${msgctxt}${this.context_glue}${msgid}` :
            msgid;

        const domainname = this.isValidObject(domain) ? domain :
            this.isValidObject(this.domain) ? this.domain : 'messages';

        // category is always LC_MESSAGES. We ignore all else
        const category_name = 'LC_MESSAGES';

        var trans = [];
        let found = false;
        let domain_used; // so we can find plural-forms if needed

        if(this._locale_data && this._locale_data[domainname]) {
            domain_used = this._locale_data[domainname];
            if(domain_used.msgs[msg_ctxt_id]) {
                trans  = domain_used.msgs[msg_ctxt_id];
                found = true;
                trans.shift();
            }
        }

        // default to english if we lack a match, or match has zero length
        if (!found) {
            trans = [msgid, msgid_plural ];
        }

        var translation = trans[0];
        if (plural) {
            var p;
            if (found && this.isValidObject(domain_used.head.plural_func) ) {
                var rv = domain_used.head.plural_func(n);
                if (! rv.plural) rv.plural = 0;
                if (! rv.nplural) rv.nplural = 0;
                // if plurals returned is out of bound for total plural forms
                if (rv.nplural <= rv.plural) rv.plural = 0;
                p = rv.plural;
            } else {
                p = (n != 1) ? 1 : 0;
            }
            if (this.isValidObject(trans[p]))
                translation = trans[p];
        }

        return translation;
    }
    gettext(msgid) {
        var msgctxt;
        var msgid_plural;
        var n;
        var category;
        return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
    }
    ngettext(msgid, msgid_plural, n) {
        var msgctxt;
        var category;
        return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
    };
}