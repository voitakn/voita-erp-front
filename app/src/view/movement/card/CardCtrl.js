Ext.define('Erp.view.movement.card.CardCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.movement_card_ctrl',
    requires: [
        'Erp.util.receipt.PrintInvoice',
    ],
    bindings: {
        onCardId: '{cardId}',
        loadInvoiceItems: '{show_invoice}'
    },
    onCardId(cardId) {
        const vm = this.getViewModel();
        if (!cardId || cardId.length !== 36) {
            vm.set('show_invoice', {});
        } else {
            this.loadInvoice(cardId);
        }
    },
    onViewHide() {
        const vm = this.getViewModel();
        vm.set('cardId', null);
    },
    toBack(btn) {
        Ext.util.History.back();
    },
    loadInvoice(onSellCardId) {
        const me = this;
        const vm = this.getViewModel();
        const workers_store = Ext.data.StoreManager.lookup('workersStore');
        Ext.Ajax.request({
            url: Api.inv.move_list_month,
            jsonData: {"id": onSellCardId},
            method: "POST",
            success: function (resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    if (result.data && result.data.length > 0) {
                        const invData = result.data[0];
                        if (invData.from_user_id) {
                            const from_user = workers_store.getById(invData.from_user_id) || {
                                name: User.data.params.name,
                                surname: User.data.params.surname,
                            };
                            invData.user_from = Ext.String.format('{0} {1}', from_user.name, from_user.surname);
                        }
                        if (invData.params.from_place.from_place_id) {
                            const record = invData.params.from_place;
                            invData.from_place = Ext.String.format('{0} {1} {2} {3}', record.title, record.postcode, record.city, record.address);
                        }
                        if (invData.params.to_place.to_place_id) {
                            const record = invData.params.to_place;
                            invData.to_place = Ext.String.format('{0} {1} {2} {3}', record.title, record.postcode, record.city, record.address);
                        }
                        vm.set('show_invoice', invData);
                    }
                }
            },
            failure: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
    },
    loadInvoiceItems(invoice) {
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('move_invoice_items_store');
        if (store) {
            if (invoice.id) {
                store.load();
            } else {
                store.loadData([]);
            }
        }
    },
    changeStatusToSent() {
        const me = this;
        const vm = this.getViewModel();
        Ext.Ajax.request({
            url: Api.inv.move_dispatched,
            jsonData: {
                id: vm.get('show_invoice.id'),
                period_year: vm.get('year')
            },
            method: "POST",
            success: function (resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    if (result.data) {
                        me.onCardId(result.data.id);
                    }
                }
            },
            failure: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
        this.getView().down('movement_sent').hide();
    },
    changeStatusToReceive() {
        const me = this;
        const vm = this.getViewModel();
        Ext.Ajax.request({
            url: Api.inv.move_accepted,
            jsonData: {
                id: vm.get('show_invoice.id'),
                period_year: vm.get('year')
            },
            method: "POST",
            success: function (resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    if (result.data) {
                        me.onCardId(result.data.id);
                    }
                }
            },
            failure: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
        this.getView().down('movement_receive').hide();
    },
    printReceiptInvoice() {
        const vm = this.getViewModel();
        const itemsStore = vm.getStore('move_invoice_items_store');
        const show_invoice = vm.get('show_invoice');
        const invoiceData = {};
        let printItems = [];
        Ext.Array.each(itemsStore.getRange(), (rec) => {
            rec.data.title = rec.data.item_params.title;
            rec.data.barcode = rec.data.item_params.barcode;
            rec.data.description = rec.data.item_params.description;
            printItems.push(rec.data);
        });
        invoiceData.company_name = User.data.customer.title;
        invoiceData.company_phone = User.data.customer.phone;
        invoiceData.company_tax = User.data.customer.configs.tax_number;
        invoiceData.company_postcode = User.data.customer.configs.postcode;
        invoiceData.company_city = User.data.customer.configs.city;
        invoiceData.company_address = User.data.customer.configs.address;
        invoiceData.items = printItems;
        invoiceData.from_place = show_invoice.params.from_place;
        invoiceData.to_place = show_invoice.params.to_place;
        invoiceData.date_create = Ext.util.Format.erpFromUTC(show_invoice.date_create, 'Y-m-d H:i');
        invoiceData.operator = show_invoice.user_from;
        invoiceData.comment = show_invoice.comment;
        invoiceData.doc_number = 'MI' + show_invoice.doc_number;
        invoiceData.bill_price_total = show_invoice.price_total;
        invoiceData.bill_products_total = show_invoice.amount_total;
        invoiceData.boxes = show_invoice.boxes;
        invoiceData.logo = User.data.customer.configs.logo;
        vm.set('invoiceData', invoiceData);
        PrintInvoice.htmlRender(invoiceData);
    },
    confirmStatusToSent() {
        this.getView().down('movement_sent').show();
    },
    confirmStatusToReceive() {
        this.getView().down('movement_receive').show();
    }
});