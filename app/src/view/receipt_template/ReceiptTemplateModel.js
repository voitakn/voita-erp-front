Ext.define('Erp.view.receipt_template.ReceiptTemplateModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.receipt_template_vm',
    formulas: {
        no_com_customer_save(get) {
            return !User.checkAccess('com.customer_save');
        },
    }
});
