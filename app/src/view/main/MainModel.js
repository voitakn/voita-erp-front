/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Erp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'Erp',
        user_btn_name: 'Manager',
        user_btn_icon: 'x-fa fa-user-circle white',
        logout_btn_text: i18n.gettext('Log out'),
        logo_src: 'resources/shared/images/Voita_logo_40.webp',
        nologo_src: 'resources/shared/images/no_logo.png',
        navCollapsed: true,
        hide_subscription_update: true,
        subscription_need_renew: false,
        subscription_show_trial: false,
        main_btn_cls: 'main-btn-chevron',
        main_btn_icon: 'x-fa fa-chevron-right blue',

        menu: [{
            text: i18n.gettext('Dashboard'),
            iconCls: 'menu-icon dashboard blue',
            xtype: 'dashboard',
            leaf: true,
            hidden: true
        }, {
            iconCls: 'x-fa fa-cog blue',
            xtype: 'company',
            text: i18n.gettext('Company'),
            leaf: true
        }, {
            iconCls: 'x-fa fa-sitemap blue',
            xtype: 'catalog',
            text: i18n.gettext('Catalog'),
            leaf: true
        }, {
            iconCls: 'fas fa-wallet blue',
            xtype: 'retail',
            text: i18n.gettext('Retail'),
            leaf: true
        },
            //     {
            //     iconCls: 'fas fa-receipt blue',
            //     xtype: 'sell_pos',
            //     text: i18n.gettext('POS'),
            //     leaf: true
            // }, {
            //     iconCls: 'fas fa-receipt blue',
            //     xtype: 'pos_sell',
            //     text: i18n.gettext('POS'),
            //     leaf: true
            // }, {
            //     iconCls: 'x-fa fa-th-list blue',
            //     text: i18n.gettext('Sellings'),
            //     xtype: 'sell_bills',
            //     leaf: true
            // }, {
            //     iconCls: 'x-fas fa-cash-register blue',
            //     xtype: 'pos_list',
            //     text: i18n.gettext('Cash registers'),
            //     leaf: true
            // }, {
            //     iconCls: 'x-fas fa-undo blue',
            //     xtype: 'revert_list',
            //     text: i18n.gettext('Refunds'),
            //     leaf: true
            // }, {
            //     iconCls: 'x-fas fa-sort-amount-up blue',
            //     xtype: 'price_monitor',
            //     text: i18n.gettext('Price Monitor'),
            //     leaf: true
            // },
            {
                iconCls: 'x-fas fa-shipping-fast blue',
                xtype: 'movement_list',
                text: i18n.gettext('Movements'),
                leaf: true
            }, {
                iconCls: 'menu-icon purchases blue',
                text: i18n.gettext('Purchases'),
                xtype: 'purchase_list',
                leaf: true
            }, {
            iconCls: 'x-fa fa-truck blue',
            xtype: 'supplier',
            text: i18n.gettext('Suppliers'),
            leaf: true
        }, {
            iconCls: 'menu-icon fact-check blue',
            xtype: 'inventory',
            text: i18n.gettext('Stock'),
            leaf: true
        }, {
            iconCls: 'erp-icon insights blue',
            xtype: 'report_period',
            text: i18n.gettext('Report'),
            leaf: true
        }, {
            iconCls: 'x-fa fa-cog blue',
            text: i18n.gettext('Settings'),
            leaf: false,
            expanded: true,
            children: [
                {
                    text: i18n.gettext('Groups'),
                    xtype: 'admin_group',
                    leaf: true
                }, {
                    text: i18n.gettext('Roles'),
                    xtype: 'admin_groles',
                    leaf: true
                }, {
                    text: i18n.gettext('Customers'),
                    xtype: 'admin_customer',
                    leaf: true
                }, {
                    text: i18n.gettext('Countries'),
                    xtype: 'admin_country',
                    leaf: true
                }
            ]
        }],
        menuMap: {
            purchase_buy: 'purchase_list',
            purchase_card: 'purchase_list',
            produce: 'catalog',
            movement_list: 'movement_list',
            movement_add: 'movement_list',
            movement_card: 'movement_list',
            places: 'company',
            workers: 'company',
            subscription: 'company'
        }
    },
    formulas: {
        user_fio(get) {
           //console.('user_fio');
            if(User && User.data) {
                return User.fullName();
            }
            return 'Manager';
        },
        on_micro_menu: {
            bind: {
                bindTo: '{navCollapsed}',
                deep: true
            },
            get(val) {
                if(val === true) {
                    this.set('main_btn_cls', 'main-btn-chevron closed');
                    this.set('main_btn_icon', 'x-fa fa-chevron-right blue');
                    this.set('user_btn_name', User.charName());
                    this.set('logout_btn_text', '');
                    this.set('user_btn_icon', 'x-fa fa-user-circle white');
                    this.set('logo_src', 'resources/shared/images/voita-logo.webp');
                } else {
                    this.set('main_btn_cls', 'main-btn-chevron');
                    this.set('main_btn_icon', 'x-fa fa-chevron-left blue');
                    this.set('user_btn_name', User.fullName());
                    this.set('logout_btn_text', i18n.gettext('Log out'));
                    this.set('user_btn_icon', 'x-fa fa-user-circle white');
                    this.set('logo_src', 'resources/shared/images/Voita_logo_40.webp');
                }
                return val ? 50 :160;
            }
        }
    },
    stores: {
        desktop_menu: {
            type: 'tree',
            root: {
                expanded: true,
                children: []
            }
        }
    }
});
