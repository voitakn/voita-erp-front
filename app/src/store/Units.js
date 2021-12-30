Ext.define('Erp.store.Units', {
    extend: 'Erp.data.Store',
    alias: 'store.unitStore',
    fields: ['id', 'name', 'abr'],
    storeId: 'unitStore',
    proxy: {
        type: 'memory'
    },
    data: [
        {id: 'item', name: i18n.gettext('Item'), abr: ''},
        {id: 'kg', name: i18n.gettext('Kilogram'), abr: i18n.gettext('kg')},
        {id: 'g', name: i18n.gettext('Gram'), abr: i18n.gettext('g')},
        {id: 'mg', name: i18n.gettext('Milligram'), abr: i18n.gettext('mg')},
        {id: 'tn', name: i18n.gettext('Ton'), abr: i18n.gettext('tn')},
        {id: 'L', name: i18n.gettext('Litre'), abr: i18n.gettext('L')},
        {id: 'mL', name: i18n.gettext('Millilitre'), abr: i18n.gettext('mL')},
        {id: 'm', name: i18n.gettext('Metre'), abr: i18n.gettext('m')},
        {id: 'cm', name: i18n.gettext('Centimetre'), abr: i18n.gettext('cm')},
        {id: 'm2', name: i18n.gettext('Square Metre'), abr: i18n.gettext('m2')},
        {id: 'cm2', name: i18n.gettext('Square Centimetre'), abr: i18n.gettext('cm2')},
        {id: 'oz', name: i18n.gettext('Ounce'), abr: i18n.gettext('oz')},
        {id: 'fl oz', name: i18n.gettext('Fluid Ounce'), abr: i18n.gettext('fl oz')},
    ]
});
