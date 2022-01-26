Ext.define('Erp.view.expense.card.Info', {
    extend: 'Ext.grid.Grid',
    xtype: 'expense_card_info',
    reference: 'expense_card_info',
    autoSize: true,
    items: [
        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'label',
                    cls: 'title',
                    html: i18n.gettext('Expense card')
                },
                {
                    xtype: 'button',
                    margin: '0 15 0 20',
                    text: i18n.gettext('Back'),
                    iconCls: 'x-fa fa-arrow-left',
                    handler: 'toBack',
                },
                // {
                // 	xtype: 'container',
                // 	flex: 1
                // },
                // {
                // 	xtype: 'button',
                // 	text: i18n.gettext('Change payment'),
                // 	iconCls: 'fi-pencil green-dark',
                // 	handler: 'onEditPaid',
                // 	hidden: true,
                // 	disabled: true,
                // 	bind: {
                // 		disabled: '{!(show_expense.id && !show_expense.paid)}',
                // 		hidden: '{no_inv_buy_paid_save}'
                // 	}
                // }
            ]
        },
        {
            xtype: 'container',
            docked: 'top',
            cls: 'border-bottom',
            layout: {
                type: 'hbox',
            },
            defaults: {
                xtype: 'container',
                minWidth: 250,
                margin: '5 0',
                flex: 1,
                layout: {
                    type: 'vbox',
                    pack: 'start'
                },
                defaults: {
                    xtype: 'container',
                    margin: '3 0',
                    layout: {
                        type: 'hbox'
                    },
                    flex: 1,
                }
            },
            items: [
                {
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Document')}:`,
                                },
                                {
                                    xtype: 'label',
                                    cls: 'bolder blue',
                                    bind: {
                                        html: `{show_expense.doc_number}`,
                                    }
                                },
                            ]
                        }, {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Date')}:`,
                                },
                                {
                                    xtype: 'label',
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_expense.doc_date}`,
                                    }
                                }
                            ]
                        }, {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Created at')}:`,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_expense.date_create:date("Y-m-d H:i:s")}`,
                                    }
                                }
                            ]
                        }, {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Manager')}:`,
                                }, {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_expense.user_data.name} {show_expense.user_data.surname}`,
                                    }
                                }
                            ]
                        }, {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Point of sale')}:`,
                                }, {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_expense.place_title}`,
                                    }
                                }
                            ]
                        },
                        // {
                        // 	items: [
                        // 		{
                        // 			xtype: 'label',
                        // 			width: 130,
                        // 			html: `${i18n.gettext('Supplier')}:`,
                        // 		},{
                        // 			xtype: 'label',
                        // 			flex: 1,
                        // 			cls: 'bolder',
                        // 			bind: {
                        // 				html: `<a href="/#supplier/{show_expense.supplier_id}">{show_expense.params.supplier_title}</a>`,
                        // 			}
                        // 		}
                        // 	]
                        // },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Comment')}:`,
                                }, {
                                    xtype: 'label',
                                    flex: 1,
                                    bind: {
                                        html: `{show_expense.comment}`,
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    items: [
                        {
                            cls: 'text-right bolder',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Payment status')}:`,
                                    bind: {
                                        cls: `{show_expense.paid ? 'green-dark' : 'red'}`,
                                    }
                                },
                                {
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        html: `{expense_paid}`,
                                        cls: `{show_expense.paid ? 'green-dark' : 'red'}`,
                                    }
                                }
                            ]
                        },
                        {
                            cls: 'text-right bolder',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Enable VAT taxes')}:`,
                                    // bind: {
                                    // 	cls: `{show_expense.paid ? 'green-dark' : 'red'}`,
                                    // }
                                },
                                {
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        html: `{expense_tax}`,
                                        cls: `{!show_expense.paid ? 'green-dark' : 'red'}`,
                                    }
                                }
                            ]
                        },
                        // {
                        // 	cls: 'text-right bolder',
                        // 	items: [
                        // 		{
                        // 			xtype: 'label',
                        // 			flex: 1,
                        // 			html: `${i18n.gettext('Payment number')}:`,
                        // 			bind: {
                        // 				cls: `{show_expense.paid ? 'green-dark' : 'red'}`,
                        // 			}
                        // 		},
                        // 		// {
                        // 		// 	xtype: 'label',
                        // 		// 	width: 120,
                        // 		// 	bind: {
                        // 		// 		html: `{show_expense.paid_params.doc_number}`,
                        // 		// 		cls: `{show_expense.paid ? 'green-dark' : 'red'}`,
                        // 		// 	}
                        // 		// }
                        // 	]
                        // },
                        // {
                        // 	cls: 'text-right bolder',
                        // 	items: [
                        // 		{
                        // 			xtype: 'label',
                        // 			flex: 1,
                        // 			html: `${i18n.gettext('Payment date')}:`,
                        // 			bind: {
                        // 				cls: `{show_expense.paid ? 'green-dark' : 'red'}`,
                        // 			}
                        // 		},{
                        // 			xtype: 'label',
                        // 			width: 120,
                        // 			bind: {
                        // 				html: `{show_expense.paid_params.date}`,
                        // 				cls: `{show_expense.paid ? 'green-dark' : 'red'}`,
                        // 			}
                        // 		}
                        // 	]
                        // },
                        // {
                        // 	cls: 'text-right bolder',
                        // 	items: [
                        // 		{
                        // 			xtype: 'label',
                        // 			flex: 1,
                        // 			html: `${i18n.gettext('Quantity')}:`,
                        // 		},{
                        // 			xtype: 'label',
                        // 			width: 120,
                        // 			bind: {
                        // 				html: `{show_expense.amount_total} ${i18n.gettext('un.')}`,
                        // 			}
                        // 		}
                        // 	]
                        // },
                        {
                            cls: 'text-right bolder red',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Total taxes')}:`,
                                }, {
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        html: `{show_expense.tax_total:erpMoney}`,
                                    }
                                }
                            ]
                        },
                        {
                            cls: 'size-16 text-right bolder blue',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Total amount')}:`,
                                }, {
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-16 bolder text-right blue',
                                    bind: {
                                        html: `{show_expense.price_total:erpMoney}`,
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});