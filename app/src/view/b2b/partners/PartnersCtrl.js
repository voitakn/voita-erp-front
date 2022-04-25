Ext.define('Erp.view.b2b.partners.PartnersCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.partners_ctrl',
    bindings: {
        onChangeCountry: '{createCard.country_id}',
        doSearch: '{filter_search}',
        reloadPartnersGrid: '{partner_type}',
        changeTypePartner: '{editCard.params.client}'
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
        const me = this;
        const vm = this.getViewModel();
        const partner_type = this.getView().lookup('partnertype');
        const partners_store = vm.getStore('partners_store');
        if (vm.get('filter_search') || vm.get('partner_type') !== null) {
            vm.set('filter_search', '');
            partner_type.setValue('');
            partner_type.setInputValue(`${i18n.gettext('All')}`);
        }
        if (partners_store) {
            me.reloadPartnersGrid();
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
    onCreateNewPartner(btn) {
        const me = this;
        const vm = me.getViewModel();
        const create_partner = me.lookup('create_partner');
        vm.set({
            createCard: {},
            search_name: '',
            search_email: ''
        });
        create_partner.show();
    },
    onCreateNewCancel(btn) {
        const me = this;
        const vm = me.getViewModel();
        vm.getStore('partners_search_name_store').loadData([]);
        vm.set('createCard', {});
        btn.up('dialog').hide();
    },
    onAddNewCancel(btn) {
        btn.up('dialog').hide();
    },
    onCreateNewHide() {
        const me = this;
        const vm = me.getViewModel();
        vm.set('isUserEmail', false);
    },
    onAddNewHide() {
        const me = this;
        const vm = me.getViewModel();
        vm.set('isUserEmail', false);
        vm.set('newCard', {});
    },
    onSearchName() {
        // console.log('onSearchName');
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('partners_search_name_store');
        const search_length = vm.get('search_name').length;
        if (search_length > 2) {
            if (store) {
                store.load();
            }
        }
    },
    onSearchByEmail() {
        // console.log('onSearchByEmail');
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('partners_search_email_store');
        if (vm.get('search_email').length > 6) {
            if (store) {
                store.load();
            }
        }
    },
    onChangeStore() {
        // console.log('onChangeStore');
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('partners_search_email_store');
        let record = store.data.items[0];
        record ? me.onSelectPartners(record) : me.createNewPartner();
    },
    saveNewPartner(btn) {
        const me = this;
        const vm = me.getViewModel();
        const form = me.lookup('create_partner_form');
        if (form.validate()) {
            // console.log('saveNewPartner createCard', vm.get('createCard'));
            Ext.Ajax.request({
                url: Api.b2b.partner_create,
                jsonData: vm.get('createCard'),
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
    },
    addNewPartner(btn) {
        const me = this;
        const vm = me.getViewModel();
        const form = me.lookup('add_partner_form');
        if (form.validate()) {
            Ext.Ajax.request({
                url: Api.b2b.partner_invite,
                jsonData: {
                    customer_net_id: vm.get('newCard.customer_net_id'),
                    params: vm.get('newCard.params'),
                },
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
    },
    onSelectPartners(record) {
        // console.log('onSelectPartners', record);
        const me = this;
        const vm = me.getViewModel();
        const create_partner = me.lookup('create_partner');
        const add_partner = me.lookup('add_partner');
        const price_row_combobox = me.lookup('price_row_combobox');
        const country_list = vm.getStore('country_store').load();
        const rules_price_store = vm.getStore('rules_price_store').load();
        const filters = country_list.getFilters();
        create_partner.hide();
        filters.add((country) => country.id > 0);
        price_row_combobox.setStore(rules_price_store);
        vm.set('newCard', {
            customer_net_id: record.data.id,
            title: record.data.title,
            email: record.data.email,
            phone: record.data.phone || '',
            country_id: record.data.country_id,
            params_partner: {
                address: record.data.address || '',
                city: record.data.city || '',
                postcode: record.data.postcode || '',
            },
            params: {
                client: false,
                supplier: false,
                price_row: '',
            },
            params_user: {
                name: User.data.params.name,
                surname: User.data.params.surname,
                phone: User.data.params.phone || ''
            }
        });
        country_list.getRange().forEach(rec => {
            if (rec.data.id === record.data.country_id) {
                vm.set('newCard.country_en', rec.data.country_en);
            }
        });
        vm.getStore('partners_search_name_store').loadData([]);
        add_partner.show();
    },
    createNewPartner() {
        // console.log('createNewPartner');
        const me = this;
        const vm = me.getViewModel();
        const form = me.lookup('create_partner_form');
        const create_partner = me.lookup('create_partner');
        const create_country_combobox = me.lookup('create_country_combobox');
        const country_list = vm.getStore('country_store').load();
        const filters = country_list.getFilters();
        const rules_price_store = vm.getStore('rules_price_store').load();
        const create_price_row_combobox = me.lookup('create_price_row_combobox');
        filters.add((country) => country.id > 0);
        create_price_row_combobox.setStore(rules_price_store);
        vm.set('createCard', {
            title: '',
            email: vm.get('search_email'),
            phone: '',
            country_id: User.data.country.id,
            params_partner: {
                address: '',
                city: '',
                postcode: '',
            },
            params: {
                client: false,
                supplier: false,
                price_row: '',
            },
            params_user: {
                name: User.data.params.name,
                surname: User.data.params.surname,
                phone: User.data.params.phone
            }
        });
        vm.set('isUserEmail', true);
        create_country_combobox.setStore(country_list);
        form.validate();
        create_partner.show();
    },
    onChangeCountry(id) {
        const me = this;
        const vm = me.getViewModel();
        const country_list = vm.getStore('country_store').load();
        const phonefield = me.lookup('create_partner_phone');
        if (id) {
            const phone_mask = country_list.getById(id).getData().params.phone_mask;
            phonefield.setInputMask(phone_mask);
        }
    },
    onAcceptInvite(grid, row) {
        // console.log(grid, row);
        const me = this;
        const vm = me.getViewModel();
        const tooltip = this.lookup('accept_invite');
        const invite_data = Ext.clone(row.record.data);
        const confirm_price_row_combobox = me.lookup('confirm_price_row_combobox');
        const country_list = vm.getStore('country_store').load();
        const rules_price_store = vm.getStore('rules_price_store').load();
        confirm_price_row_combobox.setStore(rules_price_store);
        vm.set('confirmCard', invite_data);
        country_list.getRange().forEach(rec => {
            if (rec.data.id === invite_data.country_id) {
                vm.set('confirmCard.country_en', rec.data.country_en);
            }
        });
        tooltip.setTarget(row.event.target);
        tooltip.show();
    },
    confirmInvite(btn) {
        const me = this;
        const vm = me.getViewModel();
        const jsonData = {
            invite_id: vm.get('confirmCard.id'),
            params: vm.get('confirmCard.params'),
        }
        Ext.Ajax.request({
            url: Api.b2b.partner_accept,
            jsonData,
            method: "POST",
            success: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                btn.up('tooltip').hide();
            },
            failure: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    onCancelConfirm() {
        const me = this;
        const vm = me.getViewModel();
        const tooltip = this.lookup('accept_invite');
        tooltip.hide();
    },
    onConfirmHide() {
        const me = this;
        const vm = me.getViewModel();
        vm.set('confirmCard', {});
    },
    onEditItem(grid, row) {
        // console.log(grid, row);
        const me = this;
        const vm = me.getViewModel();
        const tooltip = me.lookup('edit_partner');
        const edit_data = Ext.clone(row.record.data);
        const edit_price_row_combobox = me.lookup('edit_price_row_combobox');
        const country_list = vm.getStore('country_store').load();
        const rules_price_store = vm.getStore('rules_price_store').load();
        edit_price_row_combobox.setStore(rules_price_store);
        vm.set('editCard', edit_data);
        country_list.getRange().forEach(rec => {
            if (rec.data.id === edit_data.country_id) {
                vm.set('editCard.country_en', rec.data.country_en);
            }
        });
        tooltip.setTarget(row.event.target);
        tooltip.show();
    },
    onEditCancel() {
        const me = this;
        const vm = me.getViewModel();
        const tooltip = this.lookup('edit_partner');
        tooltip.hide();
    },
    onEditHide() {
        const me = this;
        const vm = me.getViewModel();
        vm.set('editCard', {});
    },
    savePartner(btn) {
        const me = this;
        const vm = me.getViewModel();
        const edit_partner_form = me.lookup('edit_partner_form');
        const jsonData = {
            invite_id: vm.get('editCard.id'),
            params: vm.get('editCard.params'),
        }
        if (edit_partner_form.validate()) {
            Ext.Ajax.request({
                url: Api.b2b.partner_save,
                jsonData,
                method: "POST",
                success: function (resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    me.reloadPartnersGrid();
                    btn.up('tooltip').hide();
                },
                failure: function (resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });
        }
    },
    goToCatalog(grid, row) {
        const id = Ext.clone(row.record.data.id);
        console.log('redirect to ', `b2b_catalog/${id}`);
        this.redirectTo(`b2b_catalog/${id}`)
    },
    changeTypePartner(type) {
        console.log('changeTypePartner', type);
        const me = this;
        const vm = me.getViewModel();
        if (!type) {
            vm.set('editCard.params.price_row', null)
        }
    },
    onRemoveInvite(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const confirm = Ext.create('Erp.common.DeleteConfirm', {
            target: row.event.target,
            viewModel: {
                data: {
                    title: i18n.gettext('Attention'),
                    message: i18n.gettext('Do you want to remove invite?')
                }
            },
            listeners: {
                onConfirm(tooltip) {
                    let jsonData = {
                        invite_id: row.record.id
                    }
                    Ext.Ajax.request({
                        url: Api.b2b.partner_remove,
                        jsonData,
                        method: "POST",
                        success: function (resp, opt) {
                            let result = Ext.JSON.decode(resp.responseText);
                            Notice.showToast(result);
                            me.onShowPartnersOutgoing();
                            tooltip.destroy();
                        },
                        failure: function (resp, opt) {
                            let result = Ext.JSON.decode(resp.responseText);
                            Notice.showToast(result);
                        },
                    });
                }
            }
        });
        confirm.show();
    }
});
