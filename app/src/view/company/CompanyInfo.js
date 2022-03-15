Ext.define('Erp.view.company.CompanyInfo', {
	extend: 'Ext.Container',
	xtype: 'company_info',
	reference: 'company_info',
	autoSize: true,
	session: true,
	items: [
		{
			xtype: 'container',
			docked: 'top',
			layout: {
				type: 'vbox',
			},
			defaults: {
				xtype: 'container',
				minWidth: 250,
				margin: '5 0',
				flex: 1,
				defaults: {
					xtype: 'container',
					margin: '5 0',
					layout: {
						type: 'hbox'
					},
					flex: 1,
					defaults: {
                        xtype: 'label',
                        margin: '0 15 0 0',
                    }
				}
			},
			items: [
				{
					items: [
						{
							items: [
                                {
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Company name')}:`,
                                },
                                {
                                    flex: 1,
                                    bind: {
                                        html: '{theCard.title}',
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Company full name')}:`,
                                },
                                {
                                    flex: 1,
                                    bind: {
                                        html: '{theCard.full_title}',
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Country')}:`,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    bind: {
                                        html: `{theCard.country_en}`,
                                    }
                                }
                            ]
                        },
						{
							items: [
                                {
                                    xtype: 'label',
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Postcode')}:`,
                                },
								{
									xtype: 'label',
									flex: 1,
									bind: {
										html: `{theCard.postcode}`,
									}
								}
							]
						},
						{
							items: [
                                {
                                    xtype: 'label',
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('City')}:`,
                                },
								{
									xtype: 'label',
									flex: 1,
									bind: {
										html: `{theCard.city}`,
									}
								}
							]
						},
						{
							items: [
                                {
                                    xtype: 'label',
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Address')}:`,
                                },
								{
									xtype: 'label',
									flex: 1,
									bind: {
										html: `{theCard.address}`,
									}
								},
							]
						},
						{
							items: [
                                {
                                    xtype: 'label',
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Phone')}:`,
                                },
								{
									xtype: 'label',
									flex: 1,
									cell: {
										encodeHtml: false,
										align: 'right'
									},
									bind: {
										html: `{theCard.phone}`,
									}
								},
							]
						},
						{
							items: [
                                {
                                    xtype: 'label',
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('E-mail')}:`,
                                },
								{
									xtype: 'label',
									flex: 1,
									bind: {
										html: `{theCard.email}`,
									}
								},
							]
						},
						{
							items: [
                                {
                                    xtype: 'label',
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Tax number')}:`,
                                },
								{
									xtype: 'label',
									flex: 1,
									bind: {
										html: '{theCard.tax_number}'
									}
								}
							]
						},{
							items: [
                                {
                                    xtype: 'label',
                                    minWidth: 150,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Currency')}:`,
                                },
								{
									xtype: 'label',
									flex: 1,
									cell: {
										encodeHtml: false,
										align: 'right'
									},
									bind: {
										html: `{theCard.currency}`,
									}
								},
							]
						}
					]
				},
			]
		},
	]
})