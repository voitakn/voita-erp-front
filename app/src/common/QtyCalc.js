Ext.define('Erp.common.QtyCalc', {
    extend: 'Ext.field.Container',
    xtype: 'qtycalc',
    requires: [
        'Erp.util.Nominal'
    ],
    layout: {
        type: 'hbox',
        pack: 'center',
    },
    items: [
        {
            xtype: 'container',
            width: 300,
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'center',
            },
            items: [
                {
                    xtype: 'fieldset',
                    width: 300,
                    cls: 'button-group',
                    layout: {
                        type: 'hbox',
                        pack: 'left',
                        wrap: true
                    },
                    defaults: {
                        xtype: 'button',
                        margin: '5 5 5 5',
                        cls: 'bold',
                        width: 55,
                        height: 45,
                        handler: 'ctrlClickBtn',
                    },
                    items: [
                        {nominal: '-', width: 45, iconCls: 'x-fa fa-minus cyan', margin: '5 0 5 5'},
                        {
                            xtype: 'textfield',
                            width: 85,
                            margin: '5 0 5 0',
                            cls: 'border blue font-weight-bold',
                            bind: {value: '{quantity_calc:toFloat3}'},
                            textAlign: 'center',
                            readOnly: true
                        },
                        {nominal: '+', width: 45, iconCls: 'x-fa fa-plus cyan', margin: '5 5 5 0',},
                        {nominal: 'del', width: 65, text: 'Del'},
                        {nominal: '1', text: '1'},
                        {nominal: '2', text: '2'},
                        {nominal: '3', text: '3'},
                        {nominal: '<', text: '<'},
                        {nominal: '4', text: '4'},
                        {nominal: '5', text: '5'},
                        {nominal: '6', text: '6'},
                        {
                            nominal: '.',
                            reference: 'qtycalc_comma_btn',
                            text: ',',
                            cls: 'bold comma_btn',
                            enableToggle: true
                        },
                        {nominal: '7', text: '7'},
                        {nominal: '8', text: '8'},
                        {nominal: '9', text: '9'},
                        {nominal: '0', text: '0'}
                    ]
                },
            ]
        },
    ],
    bind: {
        value: '{quantity_calc}',
    },
    viewModel: {
        data: {
            quantity_fill: null
        }
    },
    controller: {
        alias: 'controller.qtycalc_ctrl',
        bindings: {
            renderFromParent: '{quantity_calc}'
        },
        ctrlResQuantity() {
            const me = this;
            const view = me.getView();
            const vm = me.getViewModel();
            //vm.set('quantity_calc', 1.00);
            me.ctrlQuantityCalcChange(1);
            vm.set('quantity_fill', null);
            view.query('button[cls~=comma_btn]')[0].setPressed(false);
        },
        renderFromParent(quantity_calc) {
            const me = this;
            const view = me.getView();
            view.setValue(quantity_calc);
            if(quantity_calc === 1) {
                me.ctrlResQuantity();
            }
        },
        ctrlQuantityCalcChange(quantity_calc) {
            const me = this;
            const vm = me.getViewModel();
            const parentVm = vm.getParent();
            const parField = vm.get('parent_field');
            if(parentVm) {
                if(parField) {
                    parentVm.set(parField, quantity_calc);
                }
            }
        },
        ctrlClickBtn(btn) {
            const me = this;
            const view = me.getView();
            const vm = me.getViewModel();
            const commaBtn = view.query('button[cls~=comma_btn]')[0];
            const comma = commaBtn.getPressed();
            let quantity = vm.get('quantity_calc');
            const quantityNew = vm.get('quantity_fill');
            const quantityStr = `${quantity}`;
            if(btn.nominal === 'del') {
                me.ctrlResQuantity();
                return;
            }

            if(btn.nominal === '-') {
                quantity--;
                if (quantity <= 0) {
                    quantity = 1;
                }
                vm.set('quantity_fill', null);
                commaBtn.setPressed(false);
            }
            else if(btn.nominal === '+') {
                quantity++;
                vm.set('quantity_fill', null);
                commaBtn.setPressed(false);
            }
            else if(btn.nominal === '<') {
                if (quantityStr.length > 1) {
                    quantity = quantityStr.slice(0, -1);
                } else {
                    quantity = 1;
                    commaBtn.setPressed(false);
                    vm.set('quantity_fill', null);
                }
            } else if(btn.nominal !== '.') {
                let comaSpl = quantityStr.split('.');
                if(comma) {
                    if(comaSpl[1] && comaSpl[1].length < 3) {
                        quantity = `${comaSpl[0]}.${comaSpl[1]}${btn.nominal}`;
                        if(comaSpl[1].length === 2) {
                            commaBtn.setPressed(false);
                        }
                    } else {
                        quantity = `${comaSpl[0]}.${btn.nominal}`;
                    }
                } else {
                    if (comaSpl[1] && comaSpl[1].length > 0) {
                        quantity = `${comaSpl[0]}${btn.nominal}.${comaSpl[1]}`;
                    } else {
                        if(quantityNew && quantityNew.length > 0) {
                            quantity = `${comaSpl[0]}${btn.nominal}`;
                        } else {
                            quantity = `${btn.nominal}`;
                        }
                    }
                }
                vm.set('quantity_fill', quantity);
            }
            me.ctrlQuantityCalcChange(quantity);
        }
    }
})