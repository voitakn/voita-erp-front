Ext.define('Erp.base.field.Phone', {
    xtype: 'phonefield',
    extend: 'Ext.field.Text',
    inputType: 'tel',
    clearable: true,
    autoComplete: false,
    errorTarget: 'side',
    validators: function(val){
       //console.('phonefield', val);
        if(val.length === 0) {
            return true;
        }
        return /^\+[0-9]{9,13}$/g.test(val) ? true : i18n.gettext('Please enter valid phone number!');
    }
});