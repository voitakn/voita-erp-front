Ext.define('Erp.view.expense.card.CardCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.expense_card_ctrl',
    bindings: {
        onCardId: '{cardId}',
        // loadInvoiceItems: '{show_expense}'
    },
    onCardId(onCardId) {
        const vm = this.getViewModel();
        vm.set('supplier', {});
        //console.log('onCardId', onCardId);
        if (onCardId.length < 36) {
            Ext.util.History.back();
            //console.log('load history');
        }
        if (onCardId && onCardId.length === 36) {
            this.loadInvoice(onCardId);
            //console.log('load expense');
        }
    },
    toBack(btn) {
        Ext.util.History.back();
    },
    loadInvoice(onCardId) {
        //console.log('loadInvoice', onCardId);
        const me = this;
        const vm = me.getViewModel();
        Ext.Ajax.request({
            url: Api.inv.expense_list,
            jsonData: {"id": onCardId},
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    if (result.data && result.data.length > 0) {
                        let expData = result.data[0];
                        expData.user_title = User.workersObj[expData.user_id] || "";
                        expData.user_data = User.workersObj[expData.user_id].params || {};
                        expData.place_title = User.placesObj[expData.place_id]?.title || "";
                        vm.set('show_expense', expData);
                    }
                }
            },
            failure(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });


    },
    // loadInvoiceItems(expense) {
    // 	const me = this;
    // 	const vm = me.getViewModel();
    // 	const store = vm.getStore('invoice_items_store');
    // 	if(store){
    // 		if(expense.id) {
    // 			store.load();
    // 		} else {
    // 			store.loadData([]);
    // 		}
    // 	}
    // },
    // onCloseInvoice(btn) {
    // 	const tooltip = this.lookup('buy_edit_paid');
    // 	tooltip.hide();
    // },
    // onEditPaid(btn){
    // 	const vm = this.getViewModel();
    // 	const tooltip = this.lookup('buy_edit_paid');
    // 	vm.set('paid_params', {	paid: true});
    // 	tooltip.setTarget(btn);
    // 	tooltip.show();
    // 	const form = tooltip.down('formpanel');
    // 	form.validate();
    // },
    // savePaidParams(btn) {
    // 	const me = this;
    // 	const vm = me.getViewModel();
    // 	const tooltip = this.lookup('buy_edit_paid');
    // 	const paid_params = vm.get('paid_params');
    // 	const expense = vm.get('show_expense');
    // 	const form = tooltip.down('formpanel');
    // 	const dateField = tooltip.down('datefield');
    // 	if(form.validate()) {
    // 		paid_params.paid_date = dateField.getFormattedValue('Y-m-d');
    // 		paid_params.paid = true;
    // 		paid_params.invoice_id = expense.id;
    // 		paid_params.period = expense.period;
    // 		expense.paid = true;
    // 		Ext.Ajax.request({
    // 			url: Api.inv.buy_paid_save,
    // 			method: 'POST',
    // 			jsonData: paid_params,
    // 			success: function(resp, opt) {
    // 				const result = Ext.JSON.decode(resp.responseText);
    // 				Notice.showToast(result);
    // 				if(result.success) {
    // 					if(result.data.paid_params) {
    // 						expense.paid_params = result.data.paid_params;
    // 						vm.set('show_expense', expense);
    // 					}
    // 					tooltip.hide();
    // 				}
    // 			},
    // 			failure:  function(resp, opt) {
    // 				let result = Ext.JSON.decode(resp.responseText);
    // 				Notice.showToast(result);
    // 			}
    // 		});
    //
    // 	} else {
    // 		Notice.showToast({code_err: 'all.not_required'});
    // 	}
    // }
});