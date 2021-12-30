Ext.define('Erp.data.Api', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.erp_api',
    paramsAsJson: true,
    reader: {
        type: 'json',
        rootProperty: 'data',
        totalProperty: 'total',
        keepRawData: true
    },
    actionMethods: {
        create: 'POST',
        read: 'POST',
        update: 'POST',
        destroy: 'POST'
    },
    writer: {
        writeAllFields: true,
        type: 'json'
    },
    extractResponseData: function(response) {
        Notice.showToast(response.responseJson);
        return response;
    }
});