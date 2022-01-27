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
            iconCls: 'erp-icon dashboard blue-dark',
            xtype: 'dashboard',
            leaf: true,
            hidden: true
        }, {
            iconCls: 'x-fa fa-cog blue-dark',
            xtype: 'company',
            text: i18n.gettext('Settings'),
            leaf: true
        }, {
            iconCls: 'x-fa fa-sitemap blue-dark',
            xtype: 'catalog',
            text: i18n.gettext('Catalog'),
            leaf: true
        }, {
            iconCls: 'erp-icon shopping-cart blue-dark',
            xtype: 'retail',
            text: i18n.gettext('Retail'),
            leaf: true
        }, {
            iconCls: 'erp-icon movements blue-dark',
            xtype: 'movement_list',
            text: i18n.gettext('Movements'),
            leaf: true
        }, {
            iconCls: 'erp-icon purchases blue-dark',
            text: i18n.gettext('Purchases'),
            xtype: 'purchase_list',
            leaf: true
        }, {
            iconCls: 'x-fa fa-truck blue-dark',
            xtype: 'supplier',
            text: i18n.gettext('Suppliers'),
            leaf: true
        }, {
            iconCls: 'erp-icon fact-check blue-dark',
            xtype: 'inventory',
            text: i18n.gettext('Stock'),
            leaf: true
        }, {
            iconCls: 'erp-icon insights blue-dark',
            xtype: 'report_period',
            text: i18n.gettext('Report'),
            leaf: true
        }, {
            iconCls: 'erp-icon expenses blue-dark',
            xtype: 'expenses',
            text: i18n.gettext('Expenses'),
            leaf: true
        }, {
            iconCls: 'x-fa fa-cog blue-dark',
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
            subscription: 'company',
            sell_bills: 'retail',
            sell_pos: 'retail',
            pos_sell: 'retail',
            price_monitor: 'retail',
            pos_list: 'retail',
            revert_list: 'retail',
        }
    },
    formulas: {
        user_fio(get) {
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
