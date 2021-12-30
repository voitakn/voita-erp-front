Ext.define('Erp.view.dashboard.DashboardCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_ctrl',
    onViewShow() {
        this.companyRender();
        this.mainStat();
        this.placesStat();
    },
    companyRender() {
        const me = this;
        const vm = me.getViewModel();
        const userData = User.data;
        const customerConfigs = userData.customer.configs || {};
        vm.set('company', {
            title: userData.customer.title,
            phone: userData.customer.phone,
            email: userData.customer.email,
            postcode: customerConfigs.postcode,
            city: customerConfigs.city,
            address: customerConfigs.address,
            country_en: userData.country.country_en,
            pos_number: userData.place_ids.length || 0,
            user_number: userData.worker_ids.length || 0,
            tax_number: customerConfigs.tax_number || ''
        });
    },
    mainStat() {
        const me = this;
        const vm = this.getViewModel();
        Ext.Ajax.request({
            url: Api.com.desk_main_stat,
            jsonData: {},
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if(result.success) {
                    if(result.data) {
                        vm.set('mainData', result.data);
                    }
                }
            },
            failure(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
    },
    placesStat() {
        const me = this;
        const vm = this.getViewModel();
        Ext.Ajax.request({
            url: Api.com.desk_places_stat,
            jsonData: {},
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if(result.success) {
                    if(result.data) {
                        me.renderStatPlaces(result.data);
                    }
                }
            },
            failure(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
    },
    renderStatPlaces(data) {
        //dashboard_statpos_container
        const me = this;
        const vm = this.getViewModel();
        const cntPos = me.lookup('dashboard_statpos_container');
        cntPos.removeAll();

        if(data && data.length > 0) {
            Ext.Array.each(data, (item)=>{
                let pos = User.placesObj[item.place_id] || {};
                let posParam = pos.params || {};
                cntPos.add({
                    items: [
                        {
                            items: [
                                {
                                    bodyCls: 'size-15 bolder',
                                    html: pos.title,
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Phone'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right',
                                            html: posParam.phone || ''
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Address'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right',
                                            html: posParam.address || ''
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Location'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right',
                                            html: `${posParam.postcode || ''} ${posParam.city || ''}`
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'size-15 bolder',
                                    html: i18n.gettext('Today'),
                                },
                                {
                                    items: [
                                        {
                                            html: i18n.gettext('Sales amount'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder green-dark',
                                            html: Ext.util.Format.erpMoney(item.sell_today)
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Purchases amount'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder blue',
                                            html: Ext.util.Format.erpMoney(item.buy_today)
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Movements sent'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder red',
                                            html: Ext.util.Format.erpMoney(item.movement_from_today)
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Movements received'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder green-dark',
                                            html: Ext.util.Format.erpMoney(item.movement_to_today)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'size-15 bolder',
                                    html: i18n.gettext('This month'),
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Sales amount'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder green-dark',
                                            html: Ext.util.Format.erpMoney(item.sell_period)
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Purchases amount'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder blue',
                                            html: Ext.util.Format.erpMoney(item.buy_period)
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Movements sent'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder red',
                                            html: Ext.util.Format.erpMoney(item.movement_from_period)
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Movements received'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder green-dark',
                                            html: Ext.util.Format.erpMoney(item.movement_to_period)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'size-15 bolder',
                                    html: i18n.gettext('Previous month'),
                                },
                                {
                                    items: [
                                        {
                                            html: i18n.gettext('Sales amount'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder green-dark',
                                            html: Ext.util.Format.erpMoney(item.sell_period_past)
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Purchases amount'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder blue',
                                            html: Ext.util.Format.erpMoney(item.buy_period_past)
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Movements sent'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder red',
                                            html: Ext.util.Format.erpMoney(item.movement_from_period_past)
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Movements received'),
                                            margin: '0 15 0 0',
                                        },{
                                            flex: 1,
                                            cls: 'text-right bolder green-dark',
                                            html: Ext.util.Format.erpMoney(item.movement_to_period_past)
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });
            })
        }
    }
});
