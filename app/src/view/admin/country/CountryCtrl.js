Ext.define('Erp.view.admin.country.CountryCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin_country_ctrl',
    bindings: {
        loadCountry: '{country_sel}',
    },
    onViewRender() {
        const me = this;
        const right_cnt = me.lookup('right_cnt');
        right_cnt.setHidden(false);
        me.getViewModel().getStore('country_store').load();
    },
    onViewShow() {
        const me = this;
        me.onCancel();
    },
    loadCountry(country_sel) {
        const me = this;
        const vm = me.getViewModel();
        const country_panel = me.lookup('country_panel');
        const right_cnt = me.lookup('right_cnt');
        if (country_sel) {
           //console.('country_sel', country_sel);
            right_cnt.setHidden(true);
            country_panel.setHidden(false);
            const textarea = me.lookup('textarea_json');
            const data = country_sel.getData();
            const json = JSON.stringify(data, undefined, 4);
            textarea.setValue(json);
            vm.set('country_json', json);
        }
    },
    onSave() {
        const me = this;
        const vm = me.getViewModel();
        const json = vm.get('country_json');
        Ext.Ajax.request({
            url: Api.adm.country_save,
            jsonData: json,
            method: "POST",
            success: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                me.getViewModel().getStore('country_store').load();
            },
            failure: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });

    },
    onCancel() {
        const me = this;
        const country_panel = me.lookup('country_panel');
        const right_cnt = me.lookup('right_cnt');
        const list = me.lookup('country_list');
        list.getSelectable().deselectAll();
        country_panel.setHidden(true);
        right_cnt.setHidden(false);
    },
    onAddNewCountry() {
        const me = this;
        const country_panel = me.lookup('country_panel');
        const right_cnt = me.lookup('right_cnt');
        right_cnt.setHidden(true);
        country_panel.setHidden(false);
        const textarea = me.lookup('textarea_json');
        const data = {
            country_en: '',
            country_orig: '',
            params: {
                tz: '',
                iva: [
                    {
                        name: '',
                        value: 1
                    }
                ],
                lng: '',
                code2: '',
                code3: '',
                currency: {
                    code: 978,
                    name: 'EUR',
                    symbol: '€'
                },
                code_phone: '+00',
                phone_mask: '+00 0000 000 000',
                tax_number: {
                    name: '',
                    value: ''
                }
            },
            active: true
        };
       //console.('onAddNewCountry', data);
        const json = JSON.stringify(data, undefined, 4);
        textarea.setValue(json);
    },
});
