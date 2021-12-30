Ext.define('Erp.view.home2.Home', {
    extend: 'Ext.Container',
    xtype: 'home2',
    requires: [],
    autoSize: true,
    scrollable: 'y',
    viewModel: {
        type: 'home2_vm'
    },
    controller: 'home2_ctrl',
    platformConfig: {
        desktop: {
            items: [
                {
                    xtype: 'home_desktop'
                }
            ]
        },
        tablet: {
            items: [
                {
                    xtype: 'container',
                    html: 'Hello there tablet!'
                }
            ]
        },
        phone: {
            items: [
                {
                    xtype: 'dashboard',
                }
            ]
        }
    },

});
