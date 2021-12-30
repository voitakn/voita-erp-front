Ext.define('Erp.view.worker.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'worker_grid',
    reference: 'worker_grid',
    emptyText: i18n.gettext('Data is not available!'),
    bind: {
        store: '{workers_store}',
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('Personnel')
            },{
                xtype: 'button',
                margin: '0 0 0 20',
                iconCls: 'x-fa fa-plus green-dark',
                text: i18n.gettext('New User'),
                handler: 'addNewWorker',
                hidden: true,
                bind: {
                    hidden: '{no_com_worker_save}'
                }
            }]
        },
        {
            xtype: 'worker_new',
            reference: 'worker_new',
        }
    ],
    columns: [
        {
            text: i18n.gettext('E-mail'),
            minWidth: 150,
            flex: 1,
            hidden: true,
            bind: {
                hidden: !'{no_com_worker_save}'
            },
            tpl: `<div>{login}</div>`,
            cell: {encodeHtml: false}
        },{
            text: i18n.gettext('E-mail'),
            minWidth: 150,
            flex: 1,
            hidden: true,
            bind: {
                hidden: '{no_com_worker_save}'
            },
            tpl: `<div><a href="/#employee/{id}"><b>{login}</b></a></div>`,
            cell: {encodeHtml: false}
        },{
            text: i18n.gettext('Name'),
            minWidth: 130,
            flex: 1,
            tpl: `{params.name} {params.surname}`,
        },{
            text: i18n.gettext('Phone'),
            minWidth: 130,
            flex: 1,
            tpl: `{params.phone}`,
        },{
            text: i18n.gettext('Active'),
            dataIndex: 'active',
            tpl: `{active:checkIcon}`,
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        }
    ],
});
