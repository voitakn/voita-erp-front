Ext.define('Erp.view.place.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'place_grid',
    reference: 'place_grid',
    emptyText: i18n.gettext('Data was not found!'),
    bind: {
        store: '{places_store}',
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('Points of sale')
            },{
                xtype: 'button',
                margin: '0 0 0 20',
                iconCls: 'x-fa fa-plus green-dark',
                text: i18n.gettext('Add point'),
                hidden: true,
                bind: {
                    hidden: '{no_com_place_save}'
                },
                handler: 'addNewPlace'
            }/*,{
                xtype: 'container',
                margin: '0 0 0 20',
                cls: 'red bolder align-self-center',
                html: i18n.gettext('To add points of sale, switch to a paid plan!'),
                hidden: true,
                bind: {
                    hidden: '{no_com_place_save}'
                },
            },{
                xtype: 'button',
                margin: '0 0 0 20',
                cla: 'green-dark',
                text: i18n.gettext('Buy points of sale'),
                hidden: true,
                bind: {
                    hidden: '{no_com_place_save}'
                },
                handler: 'goToByPoints'
            }*/]
        },{
            xtype: 'container',
            margin: '15 0',
            docked: 'top',
            cls: 'justify',
            html: i18n.gettext(`When you add or remove a point of sale (POS), you agree to the change to the subscription terms and agree to change the quantity and total amount of your subscription.`),
        }
    ],
    columns: [
        {
            text: i18n.gettext('Point of sale'),
            minWidth: 250,
            flex: 1,
            tpl: `<div><a href="/#point/{id}"><b>{title}</b></a></div>
                <div>{params.postcode} {params.address} {params.city}</div>`,
            cell: {encodeHtml: false}
        },{
            text: i18n.gettext('Phone'),
            width: 150,
            tpl: `<div>{params.phone}</div><div>{params.director}</div>`,
            cell: {encodeHtml: false}
        },{
            text: i18n.gettext('Main'),
            dataIndex: 'main',
            tpl: `{main:checkIcon}`,
            width: 80,
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        }
    ],
});
