Ext.define('Erp.view.admin.customer.CustomerCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin_customer_ctrl',
    bindings: {
        doSearch: '{filter_search}',
        reloadStore: '{filter_country_id}',
        loadCustomer: '{customer_sel}',
    },
    all_rendered: false,
    doSearch: function(search){
       //console.('doSearch', search);
        if(!search || search.length === 0 || search.length > 2){
            this.reloadStore();
        }
    },
    reloadStore: function(country_id){
        if(this.all_rendered) {
            this.getViewModel().getStore('customers_store').load();
        } else {
            this.all_rendered = true;
        }
    },
    addNewCustomer: function(btn){
        const view = this.getView();
        const card = this.lookup('admin_customer_right');
        const list = this.lookup('customer_list');
        card.setActiveItem(1);
        list.getSelectable().deselectAll();
    },
    addedNewForm: function(form){
        const vm = this.getViewModel();
        const pass = form.down('passwordfield');
        const mail = form.down('emailfield');
        pass.inputElement.dom.autocomplete = 'new-password';
        mail.inputElement.dom.autocomplete = 'off';
        vm.set('newCard', {
            customer: {params: {}},
            user: {login: '', passwd: '', params: {}},
            place: {title: i18n.gettext('Store'), params: {}},
            catalog: {
                products_use: true,
                services_use: true,
                products_name: i18n.gettext('Products'),
                services_name: i18n.gettext('Services')
            },
            price_cols: {
                title: i18n.gettext('Retail'),
                percent: 15,
                priority: 1,
                markup: 1.15,
            }
        });
        form.validate();
    },

    onSaveNew: function(btn){
        const me = this;
        const form = this.lookup('admin_customer_new');
        const vm = this.getViewModel();
        const customers = vm.getStore('customers_store');
       //console.('onSaveNew', form, form.validate());
        if(!form.validate()) {
            Notice.showToast({success:false,code_err:"all.not_required"});
            return;
        }
        let newCard = vm.get('newCard');
        newCard.price_cols.markup = newCard.price_cols.percent * 0.01 + 1;
       //console.('newCard', newCard);
        Ext.Ajax.request({
            url: Api.adm.customer_create,
            jsonData: newCard,
            method: "POST",
            success: function(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                customers.load();
                me.onCancelNew();
            },
            failure: function(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });

    },

    onCancelNew: function(){
        const vm = this.getViewModel();
        const form = this.lookup('admin_customer_new');
        const card = this.lookup('admin_customer_right');
        vm.set('newCard_country', null);
        vm.set('newCard', {});
        card.setActiveItem(0);
    },

    loadCustomer: function(record){
        const vm = this.getViewModel();
        const card = this.lookup('admin_customer_right');
        const item = card.getActiveItem();
        if(!record) {
            vm.set('theCard', null);
            vm.getStore('card_users_list').loadData([]);
            vm.getStore('card_places_list').loadData([]);
            if(item.reference === 'admin_customer_tabs'){
                card.setActiveItem(0);
            }
        } else {
            const rec_id = record.get('id');
            Ext.Ajax.request({
                url: Api.adm.customer_card,
                jsonData: {id: rec_id},
                method: "POST",
                success: function(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    let data = result.data;
                    if(data.params) {
                        if(data.params.tax_number) {
                            data.tax_value = data.params.tax_number.value || '';
                        }
                    }
                    let theCard = Ext.create('Erp.model.admin.CustomerCard', data);
                    vm.set('theCard', theCard);
                    vm.getStore('card_users_list').loadData(data.users || []);
                    vm.getStore('card_places_list').loadData(data.places || []);
                    card.setActiveItem(2);
                },
                failure: function(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    card.setActiveItem(0);
                    vm.set('theCard', null);
                },
            });
        }
    },
    onCancelCard: function(btn){
        const vm = this.getViewModel();
        //const card = this.lookup('admin_customer_right');
        const list = this.lookup('customer_list');
        list.getSelectable().deselectAll();
        //card.setActiveItem(0);
        //vm.set('theCard', null);
    }
});
