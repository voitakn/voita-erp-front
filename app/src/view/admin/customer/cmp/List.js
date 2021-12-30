Ext.define('Erp.view.admin.customer.cmp.List', {
    extend: 'Ext.grid.Grid',
    xtype: 'admin_customer_list',
    reference: 'customer_list',
    scrollable: 'y',
    reserveScrollbar: true,
    autoSize: true,
    requires: [
        'Erp.store.Countries'
    ],
    plugins: {
        gridpagingtoolbar: true
    },
    selectable: {
        columns: false,
        cells: false,
        checkbox: true,
        row: false,
        headerCheckbox: false,
        extensible: false,
        mode: 'single',
    },
    bind: {
        store: '{customers_store}',
        selection: '{customer_sel}'
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                html: Ext.String.format('<b>{0}</b>', i18n.gettext('Customers management'))
            },{
                xtype: 'button',
                text: i18n.gettext('Add'),
                cls: 'green-dark',
                iconCls: 'x-fa fa-plus',
                handler: 'addNewCustomer',
                hidden: true,
                shadow: false,
                bind: {
                    hidden: '{no_adm_customer_create}',
                    disabled: '{on_new_form}'
                }
            },{
                xtype: 'combobox',
                clearable: true,
                forceSelection: true,
                editable: false,
                queryMode: 'local',
                margin: '0 0 0 15',
                placeholder: i18n.gettext('Filter by country'),
                valueField: 'id',
                displayTpl: '{country_en} ({country_orig})',
                itemTpl: '{country_en} ({country_orig})',
                store: {
                    type: 'counties_store'
                },
                bind: {
                    value: '{filter_country_id}'
                }
            },{
                xtype: 'searchfield',
                margin: '0 0 0 15',
                flex: 1,
                placeholder: i18n.gettext('Search by title'),
                bind: {
                    value: '{filter_search}'
                }
            }]
        }
    ],
    columns: [
        {
            text: i18n.gettext('Organization'),
            dataIndex: 'title',
            flex: 1,
        },{
            text: i18n.gettext('Email'),
            dataIndex: 'email',
            width: 200
        },{
            text: i18n.gettext('Phone'),
            dataIndex: 'phone',
            width: 160
        },{
            text: i18n.gettext('Currency'),
            dataIndex: 'currency',
            width: 100
        }
    ]
});
