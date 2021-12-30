//FormModal
Ext.define('Erp.base.FormModal', {
    extend: 'Ext.form.Panel',
    xtype: 'base_form_modal',
    floated: true,
    modal: true,
    centered: true,
    closable: true,
    width: 800,
    height: 700,
    bodyPadding: 20,
    session: true,
});
