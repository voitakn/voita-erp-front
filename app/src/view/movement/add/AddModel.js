Ext.define('Erp.view.movement.add.AddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.movement_add_vm',
    data: {
        amount_data: null,
        boxes: 1,
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
            from_place_id: null,
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
        pos_market_place_from: 'Not selected',
        pos_market_place_to: 'Not selected',
        checkout_amount_end: 0.00,
        btn_text_save: i18n.gettext('Yes, continue'),
    },
    stores: {
        sell_items_store: {
            model: 'Erp.model.MoveProductsStore',
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
            model: 'Erp.model.MoveProducts',
            autoLoad: false,
            autoSync: false,
            pageSize: 20,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.com.produce_list
                },
                extraParams: {
                    catalog_id: '{filter.catalog_id}',
                    place_id: '{filter.from_place_id}',
                    search: '{filter.search}',
                }
            }
        },
        select_by_barcode_produce_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.MoveProducts',
            autoLoad: false,
            autoSync: true,
            pageSize: 20,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.com.produce_list
                },
                extraParams: {
                    search: '{filter.barcode}',
                }
            },
            listeners: {
                datachanged: 'onChangeByBarcode'
            }
        },
    },
});
