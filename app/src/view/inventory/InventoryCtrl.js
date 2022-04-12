Ext.define('Erp.view.inventory.InventoryCtrl', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.inventory_ctrl',
	bindings: {
		doSearch: '{filter_search}',
		reloadProduce: '{filter_place_id}',
		catalogSelect: '{catalog_selection}',
		changeCatalogId: '{filter_catalog_id}',
		changeInvent: '{not_invent}',
	},
	all_rendered: false,
	onViewRender() {
		const vm = this.getViewModel();
		// const placeField = this.lookup('inventory_place_combobox');
		// if(placeField) {
		// 	placeField.setStore(User.placesStore);
		// 	vm.set('filter_place_id', User.defStoreId);
		// }
	},
	onViewHide() {
		User.catalogStore.clearFilter();
	},
	onViewShow() {
		User.catalogStore.filter('serv', false);
		this.loadProdList();
	},
	loadProdList() {
		if(this.all_rendered) {
			this.getViewModel().getStore('select_produce_store').load();
		} else {
			this.all_rendered = true;
		}
	},
	doSearch: function(search){
		//console.log('doSearch', search);
		if(!search || search.length === 0 || search.length > 2){
			this.reloadProduce();
		}
	},
	reloadProduce: function(filter_place_id, filter_catalog_id){
		//console.log('reloadProduce filter_place_id -', filter_place_id, 'catalog_selection', filter_catalog_id);
		if(this.all_rendered) {
			this.getViewModel().getStore('select_produce_store').loadPage(1);
		} else {
			this.all_rendered = true;
		}
	},
	changeCatalogId(filter_catalog_id) {
		//console.log('changeCatalogId', filter_catalog_id);
		this.reloadProduce(filter_catalog_id);
	},
	changeInvent(not_invent) {
		//console.log('changeOnlyAvail', not_invent);
		this.reloadProduce(not_invent);
	},
	collapseCatalog: function(btn) {
		const me = this,
		view = me.lookup('inventory_tree');
		view.collapseAll();
	},
	expandCatalog: function(btn) {
		const me = this;
		const tree = me.lookup('inventory_tree');
		tree.expandAll();
	},
	onEditQuantity(grid, row) {
		const me = this;
		const vm = me.getViewModel();
	 	const record = row.record;
	 	const target = row.event.target;
		if(record && record.isModel) {
			const item_data = Ext.clone(record.getData());
			//console.log('onCheckQuantity item_data', item_data);
			vm.set('item_data', item_data);
			const tooltip = me.lookup('quantity_edit');
			tooltip.setTarget(target);
			tooltip.show();
		}
	},
	addQuantity(btn){
		const me = this;
		const vm = me.getViewModel();
		const tooltip = me.lookup('quantity_edit');
		const form = tooltip.down('formpanel');
		const item_data = vm.get('item_data');
		const produce_id = vm.get('item_data.id');
		if (item_data.amount_last === '') {
			item_data.amount_last = '0'
		}
		//console.log('addQuantity', item_data);
		if(form.validate()) {
			Ext.Ajax.request({
				url: Api.inv.invent_prod,
				jsonData: {
					produce_id: vm.get('item_data.id'),
					comment: vm.get('item_data.comment'),
					place_id: vm.get('filter_place_id'),
					invent: vm.get('item_data.amount_last'),
					amount: vm.get('item_data.amount'),
				},
				method: "POST",
				success: function(resp, opt) {
					let result = Ext.JSON.decode(resp.responseText);
					//console.log('addQuantity', result);
					Notice.showToast(result);
					if(result.data && result.success){
						me.reloadRow(result, produce_id);
						tooltip.hide();
					}
				},
			});
		}
	},
	onCheckQuantity(grid, row){
		const me = this;
		const vm = me.getViewModel();
		const record = row.record;
		const target = row.event.target;
		if(record && record.isModel) {
			const item_data = Ext.clone(record.getData());
			if (item_data.amount_last === '') {
				item_data.amount_last = '0'
			}
			if (item_data.price.place_id === null) {
				item_data.price.place_id = User.defStoreId
			}
			vm.set('item_data', item_data);
			const tooltip = me.lookup('quantity_check');
			tooltip.setTarget(target);
			tooltip.show();
		}
		//console.log('onCheckQuantity');
	},
	checkQuantity(btn){
		const me = this;
		const vm = me.getViewModel();
		const produce_id = vm.get('item_data.id');
			Ext.Ajax.request({
			url: Api.inv.invent_prod,
			jsonData: {
				produce_id: vm.get('item_data.id'),
				comment: 'invent',
				place_id: vm.get('filter_place_id'),
				invent: vm.get('item_data.amount_last'),
				amount: vm.get('item_data.amount_last'),
			},
			method: "POST",
			success: function(resp, opt) {
				let result = Ext.JSON.decode(resp.responseText);
				//console.log('checkQuantity', resp);
				Notice.showToast(result);
				if(result.data && result.success){
					me.reloadRow(result, produce_id);
					btn.up('quantity_check').hide();
				}
			},
		});
	},
	catalogSelect: function(catalog){
		if(catalog && catalog.isModel){
			this.getViewModel().set('filter_catalog_id', catalog.get('id'));
		} else {
			this.getViewModel().set('filter_catalog_id', null);
		}
	},
	reloadRow: function(result, id) {
		//console.log('reloadRow', result);
		const store = this.getViewModel().getStore('select_produce_store');
		let row = store.getById(id);
		if(row && row.isModel) {
			row.set('amount_last', result.data.amount_last);
			row.set('date_invent', result.data.date_invent);
			row.set('past_invent', result.data.past_invent);
			row.commit();
		}

	}
});
