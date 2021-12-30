Ext.define('Erp.view.employee.EmployeeCtrl', {
	//extend: 'Ext.app.ViewController',
	extend: 'Erp.view.base.BaseCtrl',
	alias: 'controller.employee_ctrl',
	bindings: {
		onCardId: '{cardId}',
	},
	onViewShow() {
		const me = this;
		const phonefield = me.lookup('employee_edit_phone');
		phonefield.setInputMask(User.data.country.params.phone_mask);
		me.setActiveMenu('workers');
	},
	onCompanyMenuClick(btn, event) {
		this.redirectTo(btn.getValue());
	},
	onCardId(onCardId) {
		//console.log('onCardId', onCardId);
		if (onCardId.length < 36) {
			Ext.util.History.back();
			//console.log('load history');
		}
		if (onCardId && onCardId.length === 36) {
			this.loadEmployee(onCardId);
		}
	},
	toBack(btn) {
		Ext.util.History.back();
	},
	loadEmployee(onCardId) {
		const vm = this.getViewModel();
		Ext.Ajax.request({
			url: Api.com.worker_card,
			jsonData: {
				id: onCardId
			},
			method: "POST",
			success: function(resp, opt) {
				let result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
				if(result.data && result.data.length > 0){
					const fullCard = result.data[0];
					const userModel = Ext.create('Erp.model.Employee', {
						name: fullCard.params.name,
						surname: fullCard.params.surname,
						phone: fullCard.params.phone,
						login: fullCard.login,
						id: fullCard.id,
						date_create: fullCard.date_create,
						active: fullCard.active,
						params: fullCard.params
					});
					vm.set('theCard', userModel);
					vm.set('fullCard', fullCard);
					vm.getStore('places_store').loadData(fullCard.places);
					vm.getStore('worker_groups_store').loadData(fullCard.groups);
				}
			},
			failure: function (resp, opt) {
				let result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
				
			}
		});
	},
	onEditCard(btn) {
		const me = this;
		const vm = me.getViewModel();
		const editCard = me.lookup('employee_edit');
		const theCard = vm.get('theCard');
		theCard.beginEdit();
		//console.log('theCard beginEdit', theCard);
		editCard.setTarget(btn);
		editCard.show();
		
	},
	onCancelEdit(btn) {
		const me = this;
		const vm = me.getViewModel();
		const editCard = me.lookup('employee_edit');
		const theCard = vm.get('theCard');
		theCard.cancelEdit();
		//console.log('theCard cancelEdit', theCard);
		editCard.hide();
	},
	onSaveEdit(btn) {
		const me = this;
		const vm = me.getViewModel();
		const editCard = me.lookup('employee_edit');
		const formpanel = btn.up('formpanel');
		const theCard = vm.get('theCard');
		theCard.data.params.name = theCard.data.name;
		theCard.data.params.surname = theCard.data.surname;
		theCard.data.params.phone = theCard.data.phone;
		if (theCard.modified) {
			if (formpanel.isValid()) {
				theCard.save({
					callback(record, operation, success) {
						//console.log('onSave', success, record);
						if (success) {
							editCard.hide();
						}
					}
				});
			}
		} else {
			editCard.hide();
		}
	},
	onSelectPlaces(field, records, tooltip) {
		const vm = this.getViewModel();
		const places = records.map(rec => rec.get('id')) || [];
		Ext.Ajax.request({
			url: Api.com.worker_place_save,
			jsonData: {
				id: vm.get('theCard.id'),
				places
			},
			method: "POST",
			success: function(resp, opt) {
				let result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
				if(result.data && result.success){
					vm.set('fullCard.places', result.data);
					vm.getStore('places_store').loadData(result.data);
					tooltip.hide();
				}
			},
		});
	},
	onSelectGroups(field, records, tooltip) {
		const vm = this.getViewModel();
		const items = records.map(rec => rec.get('id')) || [];
		Ext.Ajax.request({
			url: Api.com.worker_group_save,
			jsonData: {
				id: vm.get('theCard.id'),
				items
			},
			method: "POST",
			success: function(resp, opt) {
				let result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
				if(result.data && result.success){
					vm.set('fullCard.groups', result.data);
					vm.getStore('worker_groups_store').loadData(result.data);
					tooltip.hide();
				}
			},
		});
	},
});