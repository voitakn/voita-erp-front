Ext.define('Erp.view.home.Purchases', {
	extend: 'Ext.Container',
	xtype: 'purchases_line_basic',
	layout: 'fit',
	requires: [
		'Ext.chart.axis.Numeric',
		'Ext.chart.axis.Time',
		'Ext.chart.series.Line',
		'Ext.chart.interactions.ItemHighlight',
		'Ext.chart.series.CandleStick',
		'Ext.chart.plugin.ItemEvents'
	],
	
	items: [
		{
			xtype: 'container',
			margin: '10',
			items: [
				
				{
					xtype: 'head2',
					margin: '20',
					items: [
						{
							xtype: 'datefield',
							reference: 'filter_days_from_purchases',
							label: `<b>${i18n.gettext('Date from')}</b>`,
							width: 150,
							dateFormat: 'd M',
							maxDate: new Date(),
							required: true,
							margin: '0 10',
							hidden: true,
							listeners: {
								change: 'changeDateFromPurchases'
							},
							bind: {
								value: '{filter_day_from_purchases}',
							}
						},
						{
							xtype: 'datefield',
							reference: 'filter_days_to_purchases',
							label: `<b>${i18n.gettext('Date to')}</b>`,
							width: 150,
							dateFormat: 'd M',
							maxDate: new Date(),
							required: true,
							margin: '0 10',
							hidden: true,
							listeners: {
								change: 'changeDateToPurchases'
							},
							bind: {
								value: '{filter_day_to_purchases}',
							}
						},
						{
							xtype: 'combobox',
							margin: '0 20 0 20',
							autoSelect: true,
							forceSelection: true,
							editable: false,
							queryMode: 'local',
							label: `<b>${i18n.gettext('Period')}</b>`,
							width: 150,
							valueField: 'id',
							displayField: 'name',
							store: [
										{name: 'Last week', id: 1},
										{name: 'Last month', id: 2},
										{name: 'Last 30 days', id: 3},
										{name: 'Period', id: 4}
							],
							bind: {
								value: '{filter_period_purchases}',
							}
						}
					]
				},
				{
					xtype: 'cartesian',
					reference: 'purchases_chart',
					insetPadding: '20',
					height: 400,
					store: {
						type: 'purchases_chart',
					},
					legend: {
						type: 'sprite',
						docked: 'bottom',
						marker: {
							size: 8
						}
					},
					plugins: {
						chartitemevents: {
							moveEvents: true
						}
					},
					axes: [{
						type: 'numeric',
						position: 'left',
						shadow: 'true',
						grid: true,
						fields: ['place_1', 'place_2', 'place_3'],
						title: 'Purchase amount per day',
						renderer: 'onAxisLabelRender'
					}, {
						type: 'time',
						dateFormat: 'd\nM',
						position: 'bottom',
						grid: true,
						toDate: new Date('2021-03-30'),
						fields: 'date_c',
						title: 'Date',
					}],
					series: [{
						type: 'line',
						xField: 'date_c',
						yField: 'place_1',
						style: {
							lineWidth: 2
						},
						marker: {
							radius: 4
						},
						highlight: {
							fillStyle: '#000',
							radius: 5,
							lineWidth: 2,
							strokeStyle: '#fff'
						}
					},{
						type: 'line',
						xField: 'date_c',
						yField: 'place_2',
						style: {
							lineWidth: 2
						},
						marker: {
							radius: 4
						},
						highlight: {
							fillStyle: '#000',
							radius: 5,
							lineWidth: 2,
							strokeStyle: '#fff'
						}
					},{
						type: 'line',
						xField: 'date_c',
						yField: 'place_3',
						style: {
							lineWidth: 2
						},
						marker: {
							radius: 4
						},
						highlight: {
							fillStyle: '#000',
							radius: 5,
							lineWidth: 2,
							strokeStyle: '#fff'
						}
					}
					],
				},
			]
		}
	]
});