/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('Erp.view.main.MainCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    requires: [
        'Erp.store.CatalogEditStore'
    ],
    routes: {
        ':xtype': { action: 'mainRoute' },
        ':xtype/:cardId': { action: 'mainRoute' },
    },
    lastRout: null,
    noAuth: {
        login: 'auth/login.html',
        register: 'auth/register.html'
    },
    onMainRender() {
        const me = this;
        const vm = me.getViewModel();
        const winSize = Ext.Viewport.getSize();
        if(!winSize || winSize.width < 1441) {
            vm.set('navCollapsed', true);
        } else {
            vm.set('navCollapsed', false);
        }
    },
    mainviewResize(panel) {
        const me = this;
        const vm = me.getViewModel();
        const winSize = Ext.Viewport.getSize();
        if(!winSize || winSize.width < 1300) {
            vm.set('main_btn_hide', true);
            vm.set('navCollapsed', true);
        } else {
            vm.set('main_btn_hide', false);
            if(winSize.width < 1441) {
                vm.set('navCollapsed', true);
            }
        }
    },
    collapseMenu(btn) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('navCollapsed', !vm.get('navCollapsed'));
    },
    mainRoute(xtype, cardId) {
       //console.('>>>> mainRoute', xtype, cardId);
        const me = this;
        const vm = me.getViewModel();
        const view = me.getView();
        const authKey = localStorage.getItem('authKey');
        const authExp = localStorage.getItem('authExp');

        if (view) {
            if (me.noAuth[xtype]) {
                view.removeAll(true, true);
                document.location.href = me.noAuth[xtype];
                return;
            }
            if(!authKey ||
                authKey === '' ||
                (Math.floor((new Date()).getTime() / 1000) > Number(authExp))) {
                User.cleanAuth();
                document.location.href = me.noAuth.login;
                return;
            }

            if (User.data.token) {
                me.preloadModule(xtype, cardId);
            } else {
                Ext.Ajax.request({
                    url: Api.urls.check,
                    method: 'GET',
                    success(resp, opt) {
                        const result = Ext.decode(resp.responseText);
                        console.log('Api.urls.check', result);
                        if (!result.success) {
                            User.cleanAuth();
                            document.location.href = me.noAuth.login;
                            return;
                        }
                        User.initData(result.data);
                        me.preloadModule(xtype, cardId);
                    },
                    failure(resp, opt) {
                        Ext.Msg.alert(i18n.gettext('Error!'), i18n.gettext('Data was not received!'),
                            () => {
                                document.location.href = me.noAuth.login;
                            });
                    }
                });
            }
        }
    },

    preloadModule(xtype, cardId) {
        const me = this;
        const vm = me.getViewModel();
        if(User.catalogStore) {
            this.renderModule(xtype, cardId);
        } else {
            User.catalogStore = Ext.create('Ext.data.TreeStore', {
                proxy: {
                    type: 'ajax',
                    url: Api.com.catalog_tree,
                    reader: {
                        type: 'json',
                        typeProperty:  'mtype',
                        rootProperty:  'data'
                    }
                },
                autoLoad: true,
                parentIdProperty: 'parent_id',
                root: {
                    title: i18n.gettext('Catalog'),
                    id: null,
                    expanded: true
                },
                listeners: {
                    load(store, data) {
                        me.renderModule(xtype, cardId);
                    }
                }
            });
        }
    },

    renderModule(xtype, cardId) {
        const me = this;
        const vm = me.getViewModel();
        const view = me.getView();
        let notNeedMenu = true;
        if (me.noAuth[me.lastRout]) {
            view.removeAll(true, true);
        }

        let content = view.lookup('content_view');
        if (!content) {
            notNeedMenu = false;
            me.renderMenu(xtype);
            content = view.lookup('content_view');
        }

        const has_xtype = Ext.ClassManager.getByAlias(`widget.${xtype}`);
        let item;

        if (!has_xtype) {
            xtype = 'page404';
        }
        item = content.child(`component[routeId=${xtype}]`);

        if (!item) {
            item = {
                xtype,
                routeId: xtype
            };
        }
        me.lastRout = xtype;
        content.setActiveItem(item);
        const cardItem = content.child(`component[routeId=${xtype}]`);
        cardItem.getViewModel().set('cardId', cardId);

        //if(notNeedMenu && !cardId) {
            me.selectDesktopMenu(xtype);
        //}
        if(vm.get('navCollapsed') === true) {
            vm.set('user_btn_name', User.charName());
        } else {
            vm.set('user_btn_name', User.fullName());
        }

        vm.set('hide_subscription_update', !User.checkPosNeedPay());

        if(User.checkPosNeedRenew()) {
            vm.set('subscription_need_renew', true);
            vm.set('subscription_cancel_date', User.checkPosNeedRenew());
        }
        if(User.checkPosEndTrial()) {
           //console.('subscription_show_trial', User.checkPosEndTrial());
            vm.set('hide_subscription_update', true);
            vm.set('subscription_show_trial', true);
            vm.set('subscription_trial_date', User.checkPosTrialDate());
        }

    },
    renderMenu(xtype) {
        const me = this;
        const vm = me.getViewModel();
        const view = me.getView();
        const menu = view.lookup('main_menu');
        if (!menu) {
            const mainView = view.add({ xtype: 'mainview', reference: 'mainview' });
            const menuData = vm.get('menu');
            /*if (Ext.platformTags.desktop) {

            }*/
            const menuStore = vm.getStore('desktop_menu');
            const menuTree = mainView.down('main_left').down('treelist');
            const loadItems = [];
            Ext.Array.each(menuData, (item) => {
                if (item.children) {
                    let newChildren = [];
                    Ext.Array.each(item.children, (itemCh) => {
                        if (User.accessMenu(itemCh.xtype)) {
                            newChildren.push(itemCh);
                        }
                    });
                    if (newChildren.length > 0) {
                        item.children = newChildren;
                        loadItems.push(item);
                    }
                } else {
                    if (User.accessMenu(item.xtype)) {
                        loadItems.push(item);
                    }
                }
            });
            menuStore.setRoot({expanded: true, children: loadItems});
            if(xtype) {
                me.selectDesktopMenu(xtype);
            }
        }
    },

    selectDesktopMenu(xtype) {
        const vm = this.getViewModel();
        const menuMap = vm.get('menuMap');
        vm.set('menuSelected', null);
        const menuStore = vm.getStore('desktop_menu');
        if (xtype) {
            const menuId = menuMap[xtype] || xtype;
            const record = menuStore.findNode('xtype', menuId);
            if (record) {
                vm.set('menuSelected', record);
            }
        }
        /*if (Ext.platformTags.desktop) {

        }*/
    },
    onMenuItemClick(treelist, row) {
        const me = this;
        const record = row.item.getNode();
       //console.('onMenuItemClick', record);
        if (record.data.xtype) {
            me.redirectTo(record.data.xtype);
            return true;
        } else {
            me.selectDesktopMenu(Ext.History.hash);
        }
    },
    onClickExit(btn) {
        const me = this;
        User.cleanData();
        Ext.Ajax.request({
            url: Api.urls.logout,
            jsonData: {},
            method: 'POST',
            success(resp, opt) {
                me.redirectTo('login');
            },
            failure(resp, opt) {
                Notice.showToast(resp);
                me.redirectTo('login');
            }
        });

    },
    openMyProfile(btn) {
        this.redirectTo('myprofile');
    },
    goToSubscription(btn) {
        this.redirectTo('subscription');
    }
});
