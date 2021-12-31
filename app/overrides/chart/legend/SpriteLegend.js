
Ext.define('Erp.overrides.chart.legend.SpriteLegend', {
    override: 'Ext.chart.legend.SpriteLegend',
    isXType: function(xtype) {
        return xtype === 'sprite';
    }
});