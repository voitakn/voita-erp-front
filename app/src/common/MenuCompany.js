Ext.define('Erp.view.common.MenuCompany', {
    extend: 'Ext.Container',
    xtype: 'company_menu',
    requires: [
        'Erp.view.base.BaseCtrl'
    ],
    margin: '0 20 0 0',
    viewModel: {
        data: {
            activeMenu: {
                active: ''
            }
        },
        formulas: {
            no_com_place_list_all(get) {
                return !User.checkAccess('com.place_list_all');
            },
            no_com_worker_list(get) {
                return !User.checkAccess('com.worker_list');
            },
            no_inv_sell_card_by_id(get) {
                return !User.checkAccess('inv.sell_card_by_id');
            },
            no_com_customer_save(get) {
                return !User.checkAccess('com.customer_save');
            },
            no_com_subscription(get) {
                return !User.checkAdmin();
            }
        }
    },
    setActiveMenu(menuItem) {
        this.activeMenu = menuItem;
        this.getViewModel().set('activeMenu', {active: menuItem});
    },
    getActiveMenu() {
        return this.activeMenu;
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('Company')
            }]
        },
        {
            xtype: 'menu',
            floated: false,
            autoHide: false,
            bodyBorder: false,
            manageBorders: false,
            border: 0,
            width: 190,
            docked: 'left',
            defaults: {
                handler: 'onCompanyMenuClick'
            },
            bind: {
                groups: '{activeMenu}'
            },
            items: [
                {
                    iconCls: 'x-fa fa-cog blue',
                    value: 'company',
                    group: 'active',
                    text: i18n.gettext('Company info')
                },{
                    iconCls: 'x-fa fa-map-marker blue',
                    value: 'places',
                    group: 'active',
                    text: i18n.gettext('Points of sale'),
                    hidden: true,
                    bind: {
                        hidden: '{no_com_place_list_all}'
                    }
                },{
                    iconCls: 'x-fa fa-users blue',
                    value: 'workers',
                    group: 'active',
                    text: i18n.gettext('Users'),
                    hidden: true,
                    bind: {
                        hidden: '{no_com_worker_list}'
                    }
                },{
                    iconCls: 'menu-icon account-balance-wallet blue',
                    value: 'subscription',
                    group: 'active',
                    text: i18n.gettext('Subscription'),
                    hidden: true,
                    bind: {
                        hidden: '{no_com_subscription}'
                    }
                }/*, {
                    iconCls: 'menu-icon account-balance-wallet blue',
                    value: 'billing',
                    group: 'active',
                    text: i18n.gettext('Billing')
                }, {
                    iconCls: 'menu-icon account-balance-wallet blue',
                    value: 'expense',
                    group: 'active',
                    text: i18n.gettext('Expenses'),
                    // hidden: true,
                    // bind: {
                    //     hidden: '{no_inv_sell_card_by_id}'
                    // }
                }*/
            ]
        }
    ]
});