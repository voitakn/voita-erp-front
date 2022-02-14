Ext.define('Erp.view.partners.PartnersCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.partners_ctrl',
    bindings: {
        // onClickMenu: '{active_partners_menu}',
        doSearch: '{filter_search}',
        reloadPartnersGrid: '{partner_type}',

    },
    onViewShow() {
        const me = this;
        me.onShowPartners();
        me.setActiveB2bMenu('partners');
        me.lookup('partners_tabs').setActiveItem(0);
    },
    reloadPartnersGrid() {
        const partners_store = this.getViewModel().getStore('partners_store');
        if (partners_store) {
            partners_store.loadPage(1);
        }
    },
    doSearch(search) {
        if (!search || search.length === 0 || search.length > 2) {
            this.getViewModel().getStore('partners_store').loadPage(1);
        }
    },
    onShowPartners() {
        const vm = this.getViewModel();
        const partner_type = this.getView().lookup('partnertype');
        const partners_store = vm.getStore('partners_store');
        if (vm.get('filter_search') || vm.get('partner_type') !== null) {
            vm.set('filter_search', '');
            partner_type.setValue('');
            partner_type.setInputValue(`${i18n.gettext('All')}`);
        } else {
            if (partners_store) {
                partners_store.loadPage(1);
            }
        }
    },
    onShowPartnersIncoming() {
        const vm = this.getViewModel();
        const partners_incoming_store = vm.getStore('partners_incoming_store');
        partners_incoming_store.loadPage(1);
    },
    onShowPartnersOutgoing() {
        const vm = this.getViewModel();
        const partners_outgoing_store = vm.getStore('partners_outgoing_store');
        partners_outgoing_store.loadPage(1);
    },
    onAddNewPartner(btn) {
        const me = this;
        const vm = me.getViewModel();
        const add_partner = me.lookup('add_partner');
        const form = me.lookup('add_partner_form');
        form.validate();
        add_partner.show();

    },
    onAddNewCancel(btn) {
        btn.up('dialog').hide();
    },
    onAddNewHide() {
        const me = this;
        const vm = me.getViewModel();
        vm.set('isUserEmail', false);
        vm.set('newCard', {});
    },
    onCheckEmail(btn) {
        const me = this;
        const vm = me.getViewModel();
        const form = me.lookup('add_partner_form');
        const phonefield = me.lookup('new_partner_phone');
        const country_combobox = me.lookup('country_combobox');
        const price_row_combobox = me.lookup('price_row_combobox');
        if (form.validate()) {
            vm.set('isUserEmail', true);
            vm.set('newCard.params.client', false);
            vm.set('newCard.params.supplier', false);
            // phonefield.setInputMask(User.data.country.params.phone_mask);
            const country_list = vm.getStore('country_store').load();
            const rules_price_store = vm.getStore('rules_price_store').load();
            const filters = country_list.getFilters();
            filters.add((country) => country.id > 0);
            country_combobox.setStore(country_list);
            price_row_combobox.setStore(rules_price_store);
            vm.set('newCard.country_id', User.data.country.id);
            vm.set('newCard.params_user', {
                "name": User.data.params.name,
                "surname": User.data.params.surname,
                "phone": User.data.params.phone
            });

        }
    },
    addNewPartner(btn) {
        const me = this;
        const vm = me.getViewModel();
        const form = me.lookup('add_partner_form');
        if (form.validate() && vm.get('newCard.title') && vm.get('newCard.country_id')) {
            // console.log('newCard', vm.get('newCard'));
            Ext.Ajax.request({
                url: Api.b2b.partner_create,
                jsonData: vm.get('newCard'),
                method: "POST",
                success: function (resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    btn.up('dialog').hide();
                },
                failure: function (resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });

        }

    }
});
