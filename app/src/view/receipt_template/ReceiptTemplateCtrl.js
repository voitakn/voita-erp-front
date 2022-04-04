Ext.define('Erp.view.receipt_template.ReceiptTemplateCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.receipt_template_ctrl',
    bindings: {
        renderPrintConfig: {
            widthCnt: '{widthCnt}',
            text_1: '{text_1}',
            text_2: '{text_2}',
            type_series: '{type_series}',
            type_text: '{type_text}',
        },
    },
    onViewShow() {
        const me = this;
        const vm = me.getViewModel();
        const userData = User.data;
        let customerConfigs = userData.customer.configs || {};
        let receipt_cfg = userData.customer.configs.receipt_cfg || {
            type: {}
        };
        let texts = receipt_cfg.texts || {};
        // console.log('receipt_cfg 1', receipt_cfg);
        vm.set({
            'widthCnt': receipt_cfg.width || 56,
            'invoice_type_edit': receipt_cfg.invoice_type_edit ? receipt_cfg.invoice_type_edit : false,
            'text_1': texts.text_1 || '',
            'text_2': texts.text_2 || '',
            'type_series': receipt_cfg.type.series || 'IN',
            'type_text': receipt_cfg.type.text || 'Invoice',
        });
        vm.set('old_configs_template', {
            width: receipt_cfg.width || 56,
            invoice_type_edit: receipt_cfg.invoice_type_edit ? receipt_cfg.invoice_type_edit : false,
            texts: {
                text_1: texts.text_1 || '',
                text_2: texts.text_2 || ''
            },
            type: {
                series: receipt_cfg.type.series || 'IN',
                text: receipt_cfg.type.text || 'Invoice'
            }
        });
        vm.set('all_configs', customerConfigs);
        me.setActiveMenu('receipt_template');
        me.renderPrintConfig();
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
            "client_name": 'Final customer',
            "origin": 'Original',
            "caixa": ' 1',
            "text_1": vm.get('text_1'),
            "text_2": vm.get('text_2'),

        }
        invoiceData.configs = user_data.customer.configs;
        invoiceData.type_invoice = vm.get('type_invoice');
        invoiceData.logo = user_data.customer.configs.logo;
        invoiceData.edit_config = true;
        invoiceData.configs.receipt_cfg = User.data.customer.configs.receipt_cfg || {};
        invoiceData.configs.receipt_cfg.texts = {};
        invoiceData.configs.receipt_cfg.type = {};
        invoiceData.configs.receipt_cfg.width = widthCnt;
        invoiceData.configs.receipt_cfg.texts.text_1 = vm.get('text_1');
        invoiceData.configs.receipt_cfg.texts.text_2 = vm.get('text_2');
        invoiceData.configs.receipt_cfg.type.series = vm.get('type_series');
        invoiceData.configs.receipt_cfg.type.text = vm.get('type_text');
        const cnt = Receipt.htmlRender(invoiceData);
        print_content.setHtml(cnt);
        JsBarcode(".barcode", `${invoiceData.configs.receipt_cfg.type.series}${invoiceData.doc_number}`, {height: 30, width: 0.9});
    },
    onEditTemplate(btn) {
        const me = this;
        const vm = me.getViewModel();
        const template_settings_edit = me.lookup('template_settings_edit');
        template_settings_edit.setTarget(btn);
        template_settings_edit.show();
    },
    onCancelTemplateEdit(btn) {
        const me = this;
        const vm = me.getViewModel();
        const template_settings_edit = me.lookup('template_settings_edit');
        const old_configs_template = vm.get('old_configs_template');
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
        texts.text_1 = vm.get('text_1');
        texts.text_2 = vm.get('text_2');
        receipt_cfg.width = vm.get('widthCnt');
        receipt_cfg.texts = texts;
        receipt_cfg.type = type;
        if (old_configs_template.type.series !== type.series) {
            receipt_cfg.type.series = type.series;
            receipt_cfg.invoice_type_edit = true;
        }
        if (old_configs_template.type.text !== type.text) {
            receipt_cfg.type.text = type.text;
            receipt_cfg.invoice_type_edit = true;
        }
        if (old_configs_template.invoice_type_edit === true) {
            receipt_cfg.invoice_type_edit = true;
        }
        let customer = User.data.customer;
        customer.configs.receipt_cfg = receipt_cfg;
        Ext.Ajax.request({
            url: Api.com.customer_save,
            jsonData: customer,
            method: "POST",
            success: function (resp) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                User.updateUserSession(() => {
                    me.onViewShow()
                });
                template_settings_edit.hide();
            },
        });
    }
})
