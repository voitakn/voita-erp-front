Ext.define('Erp.overrides.field.Spinner', {
    override: 'Ext.field.Spinner',
    textAlign: 'right',
    placeholder: '0.0000',
    clearable: true,
    decimals: 4,
    minValue: 0,
    decimalSeparator: '.'
});