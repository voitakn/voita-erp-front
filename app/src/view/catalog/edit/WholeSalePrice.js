Ext.define('Erp.view.catalog.edit.WholeSalePrice', {
    extend: 'Erp.base.ToolTip',
    xtype: 'wholesale_price',
    reference: 'wholesale_price',
    width: 250,
    height: 180,
    layout: 'fit',
    title: i18n.gettext('Wholesale prices'),
    align: 't50-b50',
    closable: true,
    items: [
        {
            xtype: 'componentdataview',
            itemConfig: {
                bodyCls: 'shadow-sm border border-1 rounded margin-sh',
                items: [
                    {
                        xtype: 'item_cnt',
                    }
                ],
            },
            itemDataMap: {
                textTitle: {
                    html: 'title'
                },
                textPercent: {
                    html: 'fmt_percent'
                },
                textPrice: {
                    html: 'fmt_price',
                },
            },
            bind: {
                store: '{wholesale_price_store}',
            }
        },
    ]
})