Ext.define('Erp.view.point.PointCtrl', {
	extend: 'Erp.view.base.BaseCtrl',
	alias: 'controller.point_ctrl',
	requires: [
		'Ext.field.trigger.Menu'
	],
	bindings: {
		onCardId: '{cardId}',
	},
	onViewShow() {
		const me = this;
		const phonefield = me.lookup('point_phone');
		//console.log('afterViewShow', phonefield);
		phonefield.setInputMask(User.data.country.params.phone_mask);
		me.setActiveMenu('places');
	},
	onCardId(onCardId) {
		const vm = this.getViewModel();
		//console.log('onCardId', onCardId);
		if (onCardId.length < 36) {
			Ext.util.History.back();
			//console.log('load history');
		}
		if (onCardId && onCardId.length === 36) {
			this.loadPoint(onCardId);
		}
	},
	toBack(btn) {
		Ext.util.History.back();
	},
	loadPoint(onCardId) {
		const me = this;
		const vm = this.getViewModel();
		Ext.Ajax.request({
			url: Api.com.place_list_all,
			jsonData: {
				id: onCardId
			},
			method: "POST",
			success: function(resp, opt) {
				let result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
				if(result.data && result.data.length > 0){
					me.renderPoint(result.data[0]);
				}
			},
			failure: function (resp, opt) {
				let result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
			}
		});
	},
	renderPoint(fullCard) {
		const me = this;
		const vm = me.getViewModel();
		const chStore = vm.getStore('checkout_store');
		const pointModel = Ext.create('Erp.model.Point', {
			id: fullCard.id,
			title: fullCard.title,
			params: fullCard.params,
			main: fullCard.main,
			phone: fullCard.params.phone,
			city: fullCard.params.city,
			postcode: fullCard.params.postcode,
			address: fullCard.params.address,
			director: fullCard.params.director
		});
		vm.set('theCard', pointModel);
		vm.set('fullCard', fullCard);
		if(fullCard.params.checkouts) {
			chStore.loadData(fullCard.params.checkouts);
		} else {
			chStore.loadData([]);
		}
	},
	editCheckout(btn) {
		const me = this;
		const vm = me.getViewModel();
		const tooltip = me.lookup('point_checkout_edit');
		const record = btn.up('checkoutitem').getRecord();
		vm.set('editCheck', record.data);
		tooltip.setTarget(btn);
		tooltip.show();
	},
	onCancelCheckout(btn) {
		const me = this;
		const vm = me.getViewModel();
		vm.set('editCheck', null);
		btn.up('point_checkout_edit').hide();
	},
	onSaveCheckout(btn) {
		const me = this;
		const vm = me.getViewModel();
		const tooltip = me.lookup('point_checkout_edit');
		const form = tooltip.down('formpanel');
		const data = vm.get('editCheck');
		const chStore = vm.getStore('checkout_store');
		if(form.validate()) {
			if(data.id) {
				const record = chStore.getById(data.id);
				record.set('name', data.name);
			} else {
				data.id = (Ext.data.identifier.Uuid.create().generate()).split('-')[0];
				chStore.add(data);
			}
			me.saveCheckouts();
			vm.set('editCheck', null);
			btn.up('point_checkout_edit').hide();
		}
	},
	addNewCheckout(btn) {
		const me = this;
		const vm = me.getViewModel();
		const tooltip = me.lookup('point_checkout_edit');
		vm.set('editCheck', {name: ''});
		tooltip.setTarget(btn);
		tooltip.show();
		tooltip.down('textfield').focus();
		tooltip.down('formpanel').validate();
	},
	deleteCheckout(btn) {
		const me = this;
		const vm = me.getViewModel();
		const record = btn.up('checkoutitem').getRecord();
		const store = vm.getStore('checkout_store');
		store.remove(record);
		//console.log('deleteCheckout', record);
		me.saveCheckouts();
	},
	saveCheckouts() {
		const me = this;
		const vm = me.getViewModel();
		const theCard = vm.get('theCard');
		const params = theCard.get('params');
		const store = vm.getStore('checkout_store');
		const saveCheckoits = [];
		store.each((row) => {
			saveCheckoits.push(row.data);
		});
		if(params) {
			params.checkouts = saveCheckoits;
		}
		theCard.set('params', params);
		theCard.save({
			callback(record, operation, success) {
				//console.log('saveCheckouts', success, record);
				if (success) {
					vm.set('theCard', theCard);
					vm.set('fullCard', theCard.getData());
					store.loadData(saveCheckoits);
				}
			}
		});
	},
	onEditCard(btn) {
		const me = this;
		const vm = me.getViewModel();
		const editCard = me.lookup('point_edit');
		const theCard = vm.get('theCard');
		theCard.beginEdit();
		editCard.setTarget(btn);
		editCard.show();
	},
	onCancelEdit(btn) {
		const me = this;
		const vm = me.getViewModel();
		const editCard = me.lookup('point_edit');
		const theCard = vm.get('theCard');
		theCard.cancelEdit();
		//console.log('theCard cancelEdit', theCard);
		editCard.hide();
	},
	onSaveEdit(btn) {
		const me = this;
		const vm = me.getViewModel();
		const editCard = me.lookup('point_edit');
		const form = editCard.down('formpanel');
		const theCard = vm.get('theCard');
		theCard.data.params.phone = theCard.data.phone;
		theCard.data.params.postcode = theCard.data.postcode;
		theCard.data.params.city = theCard.data.city;
		theCard.data.params.address = theCard.data.address;
		theCard.data.params.director = theCard.data.director;
		//console.log('theCard onSaveEdit', theCard);
		if (theCard.modified) {
			if (form.validate()) {
				theCard.save({
					callback(record, operation, success) {
						//console.log('onSave', success, record);
						if (success) {
							vm.set('theCard', theCard);
							editCard.hide();
						}
					}
				});
			}
		} else {
			editCard.hide();
		}
	}
});