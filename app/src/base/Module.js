Ext.define('Erp.base.Module', {
    extend: 'Ext.Container',
    layout: 'fit',
    autoSize: true,
    padding: '15 15 15 30',
    onRender() {
        this.callParent();
        const ctrl = this.getController();
        if (ctrl && ctrl.onViewRender) {
            ctrl.onViewRender(this);
        }
    },
    listeners: {
        show(view, eOpts) {
            const ctrl = view.getController();
            if(ctrl && ctrl.onViewShow) {
                ctrl.onViewShow(view);
            }
        },
        deactivate(oldActiveItem, cnt, newActiveItem) {
            const ctrl = this.getController();
            const tooltips = this.query('tooltip');
            const dialogs = this.query('dialog');
            if(tooltips.length > 0) {
                Ext.each(tooltips, tooltip => tooltip.hide());
            }
            if(dialogs.length > 0) {
                Ext.each(dialogs, dialog => dialog.hide());
            }
            if(ctrl && ctrl.onViewHide) {
                ctrl.onViewHide(this);
            }
        }
    },
})
