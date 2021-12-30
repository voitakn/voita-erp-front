/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('Erp.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'appmain',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: 'fit',
    items: [],
    listeners: {
        resize: 'mainviewResize'
    },
    onRender() {
        this.callParent();
        this.getController().onMainRender();
    }
});
