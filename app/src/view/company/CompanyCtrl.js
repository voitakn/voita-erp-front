Ext.define('Erp.view.company.CompanyCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.company_ctrl',
    bindings: {
        onBrowseImage: '{image}',
        onConfigVmChange: {
            pos_mode: '{edit_configs.pos_mode}',
            tax_include: '{edit_configs.tax_include}',
        },
        renderPrintConfig: {
            widthCnt: '{widthCnt}',
            text_1: '{text_1}',
            text_2: '{text_2}',
            type_series: '{type_series}',
            type_text: '{type_text}',
        },
    },
    dropListen: false,
    onViewShow() {
        const me = this;
        const vm = me.getViewModel();
        const userData = User.data;
        let customerConfigs = userData.customer.configs || {};
        let receipt_cfg = customerConfigs.receipt_cfg || {};
        let texts = receipt_cfg.texts || {};
        let type = receipt_cfg.type || {};
        let countryD = userData.country || {};
        const phonefiled = me.lookup('company_phone');
        phonefiled.setInputMask(userData.country.params.phone_mask);
        const userModel = Ext.create('Erp.model.Company', {
            id: userData.customer.id,
            date_create: userData.customer.date_create,
            country_id: userData.country.id,
            title: userData.customer.title,
            email: userData.customer.email,
            postcode: customerConfigs.postcode || '',
            city: customerConfigs.city || '',
            address: customerConfigs.address || '',
            phone: userData.customer.phone,
            currency: countryD.params.currency.name,
            country_en: userData.country.country_en,
            tax_name: countryD.params.tax_number.name,
            tax_number: customerConfigs.tax_number || '',
            logo: customerConfigs.logo,
            logo_id: customerConfigs.logo_id,
            lng: userData.customer.lng,
            configs: customerConfigs
        });
        vm.set('theCard', userModel);
        vm.set({
            'widthCnt': receipt_cfg.width || 56,
            'invoice_type_edit': receipt_cfg.invoice_type_edit,
            'text_1': texts.text_1 || '',
            'text_2': texts.text_2 || '',
            'type_series': type.series || i18n.gettext('FR'),
            'type_text': type.text || i18n.gettext('Facturo recibo'),
        });
        vm.set('old_configs_template', {
            width: receipt_cfg.width || 56,
            invoice_type_edit: receipt_cfg.invoice_type_edit,
            texts: {
                text_1: texts.text_1 || '',
                text_2: texts.text_2 || ''
            },
            type: {
                series: type.series || i18n.gettext('FR'),
                text: type.text || i18n.gettext('Facturo recibo')
            }
        });
        vm.set('all_configs', customerConfigs);
        me.setActiveMenu('company');
        me.logoImgLoad();
        me.renderEditCfg(customerConfigs);
        me.renderOldCfg(customerConfigs);
        me.renderPrintConfig();
    },
    renderEditCfg(customerConfigs) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('edit_configs.pos_mode', customerConfigs.pos_mode || false);
        vm.set('edit_configs.tax_include', customerConfigs.tax_include);
    },
    renderOldCfg(customerConfigs) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('old_configs.pos_mode', customerConfigs.pos_mode || false);
        vm.set('old_configs.tax_include', customerConfigs.tax_include);
    },
    renderPrintConfig() {
        const me = this;
        const vm = me.getViewModel();
        const print_content = me.lookup('print_content');
        const user_data = User.data;
        const widthCnt = vm.get('widthCnt');
        vm.set('series_template', vm.get('type_series') + new Date().getFullYear());
        const invoiceData = {
            "id": "519bfecf-7c35-424b-a79f-294f3fb0c2b4",
            "period": "2022-01",
            "y_m": "2022-01",
            "doc_index": 9,
            "doc_number": "2022/9",
            "doc_date": "2022-01-11",
            "pay_type": "card",
            "tax_total": 0.45,
            "price_total": 2.5,
            "amount_total": 5,
            "sale_total": 0,
            "paid": true,
            "revert": false,
            "budget": false,
            "title": null,
            "date_create": "2022-01-11T10:02:38.549255",
            "customer_id": "44d6c440-291e-44bf-a7bc-787f01158674",
            "customer_id_net": null,
            "user_id": "8fc7e12c-0dee-4963-9f00-b2b9e96212c3",
            "place_id": "97c4d527-c4e5-4a55-a803-7b242153f87e",
            "cashopen_id": null,
            "pay_params": {
                "pay_type": "card"
            },
            "items": [
                {
                    "id": "497cec32-5c4c-4b14-b613-fe34d5620558",
                    "title": "Milk Porto",
                    "barcode": "4056489199816",
                    "params": {},
                    "tax_rate": 1.21,
                    "serv": false,
                    "unit_type": "item",
                    "price": {
                        "id": "f705c917-8017-4c27-9035-e97a55b751ba",
                        "sale": 0,
                        "price": 0.5,
                        "place_id": null,
                        "price_base": 0.5,
                        "date_update": "2022-01-06T13:57:08.246585",
                        "sale_percent": 0
                    },
                    "amount": 2,
                    "tax_value": 21,
                    "item_price": 0.5,
                    "price_total": 1,
                    "tax_price": 0.08677685950413222,
                    "tax_total": 0.17355371900826444,
                    "sale_total": 0
                },
                {
                    "id": "917b268b-def9-472e-9f44-cfc1880ec745",
                    "title": "Milk pack",
                    "barcode": "5601002114099",
                    "params": {
                        "description": "",
                        "places_prices": false
                    },
                    "tax_rate": 1.21,
                    "serv": false,
                    "unit_type": null,
                    "price": {
                        "id": "e22d2f87-4de3-45b3-a1b2-2b10fafb7cbe",
                        "sale": 0,
                        "price": 0.5,
                        "place_id": null,
                        "price_base": 0.5,
                        "date_update": "2022-01-05T13:10:16.979523",
                        "sale_percent": 0
                    },
                    "amount": 3,
                    "tax_value": 21,
                    "item_price": 0.5,
                    "price_total": 1.5,
                    "tax_price": 0.08677685950413222,
                    "tax_total": 0.26033057851239666,
                    "sale_total": 0
                }
            ],
            "company_name": user_data.customer.title,
            "company_email": user_data.customer.email,
            "company_phone": user_data.customer.phone,
            "company_address_1": user_data.customer.configs.address,
            "company_address_2": " ",
            "tax_number": user_data.customer.configs.tax_number,
            "capital": "1.00",
            "tax_include": false,
            "logo": false,
            "operator": User.fullName(),
            "date_time": Ext.Date.format(new Date(), "Y-m-d H:i"),
            "client_tax_number": "---------",
            "client_name": i18n.gettext('Final customer'),
            "origin": i18n.gettext('Original'),
            "caixa": i18n.gettext('Checkout 1'),
            "text_1": vm.get('text_1'),
            "text_2": vm.get('text_2'),

        }
        invoiceData.configs = user_data.customer.configs;
        invoiceData.type_invoice = vm.get('type_invoice');
        invoiceData.logo = user_data.customer.configs.logo;
        invoiceData.edit_config = true;
        invoiceData.configs.receipt_cfg.width = widthCnt;
        invoiceData.configs.receipt_cfg.texts.text_1 = vm.get('text_1');
        invoiceData.configs.receipt_cfg.texts.text_2 = vm.get('text_2');
        invoiceData.configs.receipt_cfg.type.series = vm.get('type_series');
        invoiceData.configs.receipt_cfg.type.text = vm.get('type_text');
        const cnt = ReceiptSpain.htmlRender(invoiceData);
        print_content.setHtml(cnt);
        JsBarcode(".barcode", `${invoiceData.configs.receipt_cfg.type.series}${invoiceData.doc_number}`, {height: 30, width: 0.9});
    },
    toBack(btn) {
        Ext.util.History.back();
    },
    onEditCard(btn) {
        const me = this;
        const vm = me.getViewModel();
        const editCard = me.lookup('company_edit');
        editCard.setTarget(btn);
        editCard.show();
    },
    onCancelEdit(btn) {
        const me = this;
        const vm = me.getViewModel();
        const editCard = me.lookup('company_edit');
        editCard.hide();
    },
    onSaveEdit(btn) {
        const me = this;
        const vm = me.getViewModel();
        const editCard = me.lookup('company_edit');
        const form = btn.up('formpanel');
        const theCard = vm.get('theCard');
        const configs = theCard.get('configs');
        configs.postcode = theCard.get('postcode');
        configs.city = theCard.get('city');
        configs.address = theCard.get('address');
        configs.postcode = theCard.get('postcode');
        configs.pos_mode = theCard.get('pos_mode');
        configs.tax_number = theCard.get('tax_number');
        if (theCard.modified) {
            if (form.isValid()) {
                theCard.save({
                    callback(record, operation, success) {
                        if (success) {
                            editCard.hide();
                            User.updateUserSession(()=>{me.onViewShow()});
                        }
                    }
                });
            }
        } else {
            editCard.hide();
        }
    },
    onCancelLogo(btn) {
        const me = this;
        const vm = me.getViewModel();
        const editLogo = me.lookup('logo_edit');
        me.onClearLogo();
        editLogo.hide();
    },
    onClearLogo() {
        const me = this;
        let preview = me.lookup('canvas_preview');
        let fileForm = me.lookup('company_logo_form');
        preview.getSurface().removeAll();
        preview.setHeight(150);
        preview.setWidth(150);
        preview.getSurface().add([{
            type: 'circle',
            cx: 75,
            cy: 75,
            r: 75,
            fillStyle: '#eeeeee'
        },{
            type: 'text',
            x: 75,
            y: 90,
            text: 'No logo!',
            textAlign: 'center',
            fontSize: 30,
            fillStyle: '#3392CA'
        }]);
        preview.getSurface().renderFrame();
        fileForm.reset();
    },
    onSaveLogo(btn) {
        const me = this;
        const vm = me.getViewModel();
        const preview = me.lookup('canvas_preview');
        const theCard = vm.get('theCard');
        const canv = preview.el.dom.querySelector('canvas');
        const base64img = canv.toDataURL('image/webp', 0.9);
        const sprt =  preview.getSurface().getItems();
        let ifLogo = false;
        if(sprt.length > 0) {
            Ext.Array.each(sprt, (row)=>{
                if(row.type === 'image') {
                    ifLogo = true;
                }
            });
        }
        if(ifLogo) {
            Ext.Ajax.request({
                url: '/logos/upload',
                method: 'POST',
                jsonData: {
                    img: `${base64img}`,
                    user_id: User.data.user_id,
                    customer_id: User.data.customer.id,
                    active: true,
                    id: theCard.get('logo_id') || ''
                },
                success: function(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if(result.data && result.data.id && result.data.id.length === 36){
                        me.saveLogoLink(result.data.id);
                    }
                },
                failure: function (resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                }
            });
        }
    },
    saveLogoLink(logoId) {
        const me = this;
        const vm = me.getViewModel();
        const logoLink = `/logos/src/${logoId}`;
        const theCard = vm.get('theCard');
        vm.set('theCard.logo', logoLink);
        vm.set('theCard.logo_id', logoId);
        vm.set('theCard.data.configs.logo_id', logoId);
        vm.set('theCard.data.configs.logo', logoLink);
        theCard.save({
            callback(record, operation, success) {
                if (success) {
                    User.updateUserSession(()=>{
                        me.onViewShow();
                        me.onCancelLogo();
                    });
                }
            }
        });
    },
    onEditLogo(btn) {
        const me = this;
        const vm = me.getViewModel();
        const oldLogo = vm.get('all_configs.logo');
        const editLogo = me.lookup('logo_edit');
        const addFile = me.lookup('addFile');
        let preview = me.lookup('canvas_preview');
        if(oldLogo && oldLogo.length > 0) {
            const origLogo = me.lookup('company_logo_view');
            const origImg = origLogo.el.dom.querySelector('img');
            const ts = new Date().getTime();
            preview.getSurface().removeAll();
            preview.setHeight(origImg.height);
            preview.setWidth(origImg.width);
            preview.getSurface().add({
                type: 'image',
                src: `${oldLogo}?${ts}`,
                width: origImg.width,
                height: origImg.height,
                y: 0,
                x: 0
            });
            preview.getSurface().renderFrame();
        } else {
            me.onClearLogo();
        }
        if(!me.dropListen) {
            addFile.el.dom.addEventListener('drop', (e)=>{me.logoFileDrop(e)}, false);
            me.dropListen = true;
        }
        editLogo.setTarget(btn);
        editLogo.show();
    },
    logoFileDrop(e){
        const me = this;
        const form = me.lookup('company_logo_form');
        form.reset();
        e.preventDefault();
        e.stopPropagation();
        let dt = e.dataTransfer;
        let files = dt.files;
        if(files && files.length > 0) {
            me.renderLogoCanvas(files[0]);
        } else {
            me.onClearLogo();
        }
    },
    logoFileSelect(fld) {
        const files = fld.getFiles();
        if(files && files.length > 0) {
            this.renderLogoCanvas(files[0]);
        } else {
            this.onClearLogo();
        }
    },
    renderLogoCanvas(logoFile){
        const me = this;
        const reader = new FileReader();
        const image = new Image();
        const newWidth = 150;
        const preview = me.lookup('canvas_preview');
        reader.readAsDataURL(logoFile);
        preview.getSurface().removeAll();
        image.onload = () => {
            const oldWidth = image.width;
            const oldHeight = image.height;
            const newHeight = Math.floor(oldHeight / oldWidth * newWidth);
            preview.setHeight(newHeight);
            preview.setWidth(newWidth);
            preview.getSurface().add({
                type: 'image',
                x: 0,
                y: 0,
                src: image.src,
                width: newWidth,
                height: newHeight,
            });
            preview.getSurface().renderFrame();
        }
        reader.onloadend = () => {
            image.src = reader.result;
        }
    },
    logoImgLoad() {
        const me = this;
        const vm = me.getViewModel();
        const logoSrc = vm.get('all_configs.logo');
        const origLogo = me.lookup('company_logo_view');
        origLogo.setHtml('<div></div>');
        const ts = new Date().getTime();
        if(logoSrc && logoSrc.length > 0) {
            origLogo.setHtml(`<img src="${logoSrc}?${ts}"/>`);
        }
    },
    onConfigVmChange(configs) {
        const me = this;
        const vm = me.getViewModel();
        const theCard = vm.get('theCard');
        const cardConfigs = theCard.get('configs');
        const old_configs = vm.get('old_configs');
        let modified = false;
        Ext.Object.each(configs, (key, val)=>{
            if(old_configs[key] !== val) {
                cardConfigs[key] = val;
                modified = true;
            }
        });
        if (modified) {
            theCard.save({
                callback(record, operation, success) {
                    if (success) {
                        User.updateUserSession(() => {
                            me.onViewShow()
                        });
                    }
                }
            });
        }
    },
    onEditTemplate(btn) {
        const me = this;
        const vm = me.getViewModel();
        const template_settings_edit = me.lookup('template_settings_edit');
        // const receipt_cfg = User.data.customer.configs.receipt_cfg;
        template_settings_edit.setTarget(btn);
        template_settings_edit.show();
        // vm.set('old_configs_template', Ext.clone(receipt_cfg));
        // vm.set('invoice_type_edit', receipt_cfg.invoice_type_edit);
        console.log('invoice_type_edit', vm.get('invoice_type_edit'));
    },
    onCancelTemplateEdit(btn) {
        const me = this;
        const vm = me.getViewModel();
        const template_settings_edit = me.lookup('template_settings_edit');
        const old_configs_template = vm.get('old_configs_template');

        if (old_configs_template.receipt_cfg) {
        }
        vm.set({
            'widthCnt': old_configs_template.width,
            'text_1': old_configs_template.texts.text_1,
            'text_2': old_configs_template.texts.text_2,
            'type_series': old_configs_template.type.series,
            'type_text': old_configs_template.type.text,
        });

        template_settings_edit.hide();
    },
    onSaveTemplate() {
        const me = this;
        const vm = me.getViewModel();
        const theCard = vm.get('theCard');
        const configs = theCard.data.configs;
        const template_settings_edit = me.lookup('template_settings_edit');
        let receipt_cfg = {};
        let texts = {};
        let type_series = vm.get('type_series') || '';
        let type_text = vm.get('type_text') || '';
        let type = {
            series: type_series,
            text: type_text
        };
        const old_configs_template = vm.get('old_configs_template');
        console.log('old_configs_template', old_configs_template);
        texts.text_1 = vm.get('text_1');
        texts.text_2 = vm.get('text_2');
        receipt_cfg.width = vm.get('widthCnt');
        receipt_cfg.texts = texts;
        receipt_cfg.type = type;
        if (old_configs_template.type.series !== type.series) {
            console.log('type.series !==', type.series);
            receipt_cfg.type.series = type.series;
            receipt_cfg.invoice_type_edit = true;
        }
        if (old_configs_template.type.text !== type.text) {
            console.log('type.text !==', type.text);
            receipt_cfg.type.text = type.text;
            receipt_cfg.invoice_type_edit = true;
        }
        if (old_configs_template.invoice_type_edit === true) {
            receipt_cfg.invoice_type_edit = true;
        }
        configs.receipt_cfg = receipt_cfg;
        me.onConfigVmChange(configs);
        template_settings_edit.hide();
    }
});
