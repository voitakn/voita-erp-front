Ext.define('Erp.base.field.Number', {
    xtype: 'decimalfield',
    extend: 'Ext.field.Number',
    textAlign: 'right',
    placeholder: '0.000',
    clearable: true,
    decimals: 3
});