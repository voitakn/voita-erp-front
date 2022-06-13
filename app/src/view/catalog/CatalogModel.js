Ext.define('Erp.view.catalog.CatalogModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.catalog_vm',
    requires: [
        'Erp.model.CatalogEdit'
    ],
    data: {
        catalog_edit_title: i18n.gettext('Section adding'),
        filter_search: '',
        filter_catalog_id: null,
        price_retail: {},
        newProd: {
            catalog_id: null
        },
        newServ: {
            catalog_id: null
        }
    },
    stores: {
        produce_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.ProduceList',
            autoLoad: true,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.items.produce_list
                },
                extraParams: {
                    catalog_id: '{filter_catalog_id}',
                    search: '{filter_search}',
                }
            }
        },
        taxes_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.Iva',
            proxy: {
                type: 'memory'
            },
            data: []
        },
        wholesale_price_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.CatalogWhosalePriceList',
            proxy: {
                type: 'memory'
            },
            data: []
        },

    },
    formulas: {
        no_items_produce_save(get) {
            return !(User.checkAccess('items.produce_save'));
        },
        no_items_catalog_tree_save(get) {
            return !User.checkAccess('items.catalog_tree_save');
        },
        theCardCatalog(get) {
            return !!get('theCard.serv') ? 'serv' : 'prod';
        },
        currencySymbol() {
            return `${User.currency()} (${User.symbol()})`;
        }
    },
});
