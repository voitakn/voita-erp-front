Ext.define('Erp.util.User', {
    alternateClassName: ['User'],
    singleton: true,
    data: {},
    initData(data) {
        const me = this;
        this.data = data;
        this.placesObj = {};
        this.workersObj = {};
        let rulesObj = {};
        this.units = Ext.create('Erp.store.Units');
        this.taxesStore = Ext.create('Erp.data.Store', {
            model: 'Erp.model.Iva',
            data: data.country.params.iva
        });
        Ext.Ajax.request({
            url: Api.price.cols_list,
            jsonData: {},
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                if (result.success) {
                    if (result.data) {
                        let resultData = result.data;
                        // console.log('updateUserSession.data', resultData);
                        if (resultData && resultData.length > 0) {
                            Ext.each(resultData, recPl => {
                                if (!rulesObj[recPl.id]) {
                                    rulesObj[recPl.id] = recPl;
                                }
                            })
                        }
                    }
                } else {
                    Notice.showToast(result);
                }
            },
            failure(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
        this.rulesObj = rulesObj;
    },
    cleanData() {
        this.cleanAuth();
        this.data = {};
    },
    cleanAuth() {
        localStorage.removeItem('authKey');
        localStorage.removeItem('authExp');
        localStorage.removeItem('cluster_id');
        localStorage.removeItem('posKey');
        localStorage.removeItem('posExp');
        localStorage.removeItem('posCheckout');
        localStorage.removeItem('posPlaceId');
    },
    checkAlias(alias) {
        const me = this;
        if (me.modules[alias]) {
            return me.checkAccess(me.modules[alias]);
        }
        return false;
    },
    checkAccess(access) {
        const me = this;
        if (me.data.groups && me.data.groups.root) {
            return true;
        }
        if(me.data && me.data.roles) {
            return !!me.data.roles[access];
        }
        return false;
    },
    clusterApi(url, cluster) {
        if(url.startsWith('/logos/')) {
            return url;
        }
        if(url.startsWith('/api/customer/logout')) {
            document.location.href = '/user/logout';
            return false;
        }

        if(url.startsWith('/api/user/data')) {
            return url;
        }

        if(url.startsWith('/api/billing/tariff_list')) {
            return url;
        }
        if(url.startsWith('/api/billing/create_card')) {
            return url;
        }
        if(url.startsWith('/api/billing/create_sepa')) {
            return url;
        }
        if(url.startsWith('/api/billing/subscription_check')) {
            return url;
        }
        if(url.startsWith('/api/billing/subs_pos_method')) {
            return url;
        }
        if(url.startsWith('/api/user/reload')) {
            return url;
        }

        if(User.data && User.data.roles) {
            let urlPar, urlSplit = url;
            if (url.indexOf('?') !== -1) {
                urlPar = url.split('?');
                urlSplit = urlPar[0];
            }
            const urlArr = urlSplit.split('/');
            let urlRole = '';
            if(urlArr[0] === 'api') {
                urlRole = `${urlArr[1]}.${urlArr[2]}`;
            } else {
                urlRole = `${urlArr[2]}.${urlArr[3]}`;
            }

            if(User.data.roles[urlRole]) {
                if(User.data.roles[urlRole].cl === true) {
                    return `${Ext.mainCfg.clsApi.protocol}://${cluster}.${Ext.mainCfg.clsApi.domain}${Ext.mainCfg.clsApi.port}${url}`;
                } else {
                    return url;
                }
            }
        }
        return false;
    },
    checkMenus() {
        const me = this;
        const menu = {};
        const menus = Object.keys(me.modules);
        if (menus.length > 0) {
            Ext.each(menus, (val) => {
                const item = me.modules[val];
                if (me.checkAccess(item)) {
                    menu[val] = true;
                }
            });
        }
        me.menu = menu;
    },
    currency() {
        return this.data &&
            this.data.country &&
            this.data.country.params &&
            this.data.country.params.currency &&
            this.data.country.params.currency.name ?
            this.data.country.params.currency.name : 'EUR';
    },
    symbol() {
        return this.data &&
            this.data.country &&
            this.data.country.params &&
            this.data.country.params.currency &&
            this.data.country.params.currency.symbol ?
            this.data.country.params.currency.symbol : '€';
    },
    money(v) {
        const me = this;
        const val = v || 0.00;
        return Ext.util.Format.currency(val, this.symbol(), 2);
    },
    taxes() {
        return this.data.country.params.iva || [];
    },
    shortName() {
        const { data } = this;
        let short_n = '';
        if (data && data.params) {
            short_n = Ext.String.format('{0} {1}', data.params.name,
                data.params.surname ? data.params.surname[0] : '');
        }
        return short_n;
    },
    fullName() {
        const { data } = this;
        let short_n = '';

        if (data && data.params) {
            short_n = Ext.String.format('{0} {1}',
                data.params.name,
                data.params.surname);
        }
       //console.('fullName()', short_n);
        return short_n;
    },
    charName() {
        const { data } = this;
        let short_n = '';
        if (data && data.params) {
            short_n = Ext.String.format('{0}{1}',
                data.params.name ? data.params.name[0] : '',
                data.params.surname ? data.params.surname[0] : '');
        }
        return short_n;
    },
    places() {
        return (this.data && this.data.places) ? this.data.places : [];
    },
    accessMenu(xtype) {
        const me = this;
        const procedure = me.modules[xtype];
        if(xtype === 'sell_pos') {
            if(!User.checkPosMode()) { return false}
        }
        if(xtype === 'pos_sell') {
            if(User.checkPosMode()) { return false}
        }
        /*if(xtype === 'pos_list') {
            if(!User.checkPosMode()) { return false}
        }*/
        if(xtype === 'sell_retail') {
            //if(User.checkPosMode()) { return false}
            return false;
        }

        return (!procedure) ? false : !!me.checkAccess(procedure);
    },
    checkPosMode() {
        return !!User.data.customer.configs.pos_mode;
    },
    checkPosEndTrial() {
       //console.('checkPosEndTrial', User.data.groups, User.data.plan_pos_full);
        if(User.data.groups && User.data.groups["admin"]){
            if(User.data.plan_pos_full) {
                if(User.data.plan_pos_full.is_trial) {
                    return true;
                }
            }
        }
        return false;
    },
    checkPosTrialDate() {
        return User.data.plan_pos_full.trial_date || '';
    },
    checkPosNeedPay() {
        //We can start payment only from admin account
        if(User.data.groups && User.data.groups["admin"]){
            if(User.data.plan_pos_full) {
                if(User.data.plan_pos_full.is_trial) {
                    return false;
                }
                if(User.data.plan_pos_full.status === 10) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    checkPosNeedRenew() {
        //We can start payment only from admin account
        if(User.data.groups && User.data.groups["admin"]){
            if(User.data.plan_pos_full) {
                if(User.data.plan_pos_full.cancel_start === true) {
                    return User.data.plan_pos_full.cancel_date;
                }
            }
            return false;
        }
        return false;
    },
    checkAdmin() {
        if(User.data.groups && User.data.groups["admin"]){
            return true;
        }
        return false;
    },
    updateUserSession(callback) {
        const me = this;
        Ext.Ajax.request({
            url: Api.user.reload,
            method: "GET",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                if(result.success) {
                    if(result.data && result.data["user_id"]) {
                       // console.log('updateUserSession.data', result.data);
                        me.initData(result.data);
                        if(callback  && typeof callback === 'function') {
                            callback();
                        }
                    }
                } else {
                    Notice.showToast(result);
                }
            },
            failure(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
    },
    modules: {
        dashboard: 'inv.sell_retail_create',
        home: 'inv.sell_retail_create',
        admin_country: 'adm.countries',
        admin_customer: 'adm.customer_list',
        admin_groles: 'adm.groles_list',
        admin_group: 'adm.group_list',
        catalog: 'items.catalog_tree',
        sell_retail: 'inv.sell_retail_create',
        sell_bills: 'inv.sell_list_date_user',
        purchase_list: 'items.purchase_produce_list',
        places: 'com.place_list_all',
        workers: 'com.worker_list',
        supplier: 'com.supplier_list',
        myprofile: 'com.login_params_save',
        expenses: 'inv.expense_list',
        inventory: 'inv.invent_by_place',
        company: 'com.customer_save',
        store_order: 'items.catalog_tree',
        retail: 'inv.sell_retail_create',
        sell_pos: 'inv.cashopen_start',
        pos_sell: 'inv.sell_retail_create',
        pos_list: 'inv.cashopen_list',
        partners: 'b2b.partners_list',
        movement_add: 'inv.move_list_month',
        movement_list: 'inv.move_list_month',
        movement_card: 'inv.move_list_month',
        price_monitor: 'price.last_prices',
        prices_rules: 'price.cols_list',
        revert_list: 'inv.sell_revert_list',
        subscription: 'billing.tariff_list',
        report_period: 'report.main_stat',
    },
});
