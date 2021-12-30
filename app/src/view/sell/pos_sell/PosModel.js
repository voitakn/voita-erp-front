Ext.define('Erp.view.sell.pos_sell.PosModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pos_sell_vm',
    requires: [
        'Erp.model.ItemSell',
        'Erp.model.RetailProduceList'
    ],
    data: {
        amount_data: null,
        price_data: null,
        prod_data: null,
        sell_data: {},
        sell_stores: [],
        pay_card: {},
        pay_cash: {
            price_total: 0.00,
            nominal: null
        },
        hide_one_place: false,
        bill_tax_total: 0.00,
        bill_amount_total: 0.00,
        bill_price_total: 0.00,
        bill_sale_total: 0.00,
        bill_products_total: 0,
        bill_sell_current: 1,
        bill_sell_total: 1,
        cash_amount: 0.00,
        filter: {
            catalog_id: null,
            search: null,
            search_barcode: null,
            place_id: null,
            only_amount: false,
            hours: 8,
            cash_register: null,
        },
        retail_type: true,
        quantity: 1.00,
        new_quantity: '',
        flow_digits: false,
        digits: 0,
        clear_barcode: false,
        prev_button: true,
        next_button: true,
        check_checkout: false,
        pos_market_place: '',
        checkout_amount_end: 0.00,
        btn_text_save: i18n.gettext('Yes, continue'),
    },
    stores: {
        sell_items_store: {
            model: 'Erp.model.RetailSell',
            autoSync: true,
            proxy: {
                type: 'memory'
            },
            listeners: {
                datachanged: 'sellItemsChanged'
            }
        },
        select_produce_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.RetailProduceList',
            autoLoad: false,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.com.retail_produce_list
                },
                extraParams: {
                    catalog_id: '{filter.catalog_id}',
                    place_id: '{filter.place_id}',
                    search: '{filter.search}',
                    only_amount: '{filter.only_amount}',
                }
            }
        },
        select_by_barcode_produce_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.RetailProduceList',
            autoLoad: false,
            autoSync: true,
            pageSize: 50,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.com.retail_produce_barcode
                },
                extraParams: {
                    place_id: '{filter.place_id}',
                    barcode: '{filter.barcode}',
                }
            },
            listeners: {
                datachanged: 'onChangeByBarcode'
            }
        },
    },
    formulas: {
        place_data(get) {
            return User.places();
        },
        price_currency(get) {
            return Ext.String.format('{0}: <b>{1}</b> {2}',
                i18n.gettext('Price'),
                Ext.util.Format.number(get('price_data.price'), '0.00'),
                User.symbol()
            );
        },
        price_total(get) {
            return Ext.String.format('<b>{0}</b>{1}',
                Ext.util.Format.number(get('price_data.price') * get('price_data.amount'), '0.00'),
                User.symbol()
            );
        },
        pay_price_total(get) {
            return Ext.String.format('<b>{0}</b> {1}',
                Ext.util.Format.number(get('bill_price_total'), '0.00'),
                User.symbol()
            );
        },
        seller_full_name(get) {
            return User.fullName();
        }
    }
});
