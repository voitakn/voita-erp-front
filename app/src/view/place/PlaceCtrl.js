Ext.define('Erp.view.place.PlaceCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.places_ctrl',
    /**
     * Загрузим дерево каталога после рендера
     */
    afterViewShow() {
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('places_store');
        store.load();
        me.setActiveMenu('places');
        const phonefiled = me.lookup('params_phone');
        phonefiled.setInputMask(User.data.country.params.phone_mask);
    },
    onViewHide() {
        this.onCancelNew();
    },
    goToByPoints(btn) {
        this.redirectTo('new_pos');
    },
    addNewPlace(btn) {
       //console.('addNewPlace');
        const me = this;
        const vm = this.getViewModel();
        const tooltip = this.lookup('point_create');
        const form = tooltip.down('formpanel');
        vm.set('newPlace', {});
        tooltip.setTarget(btn);
        tooltip.show();
        form.validate();
    },
    onSaveNew(btn) {
        const me = this;
        const vm = this.getViewModel();
        const newPlace = vm.get('newPlace');
        //const checkouts = vm.get('newCheckouts');
        const tooltip = this.lookup('point_create');
        const form = tooltip.down('formpanel');
        const store = vm.getStore('places_store');
        const storeCh = vm.getStore('checkout_store');

        const saveCheckoits = [];
        storeCh.each((row) => {
            saveCheckoits.push(row.data);
        });

        newPlace.params['checkouts'] = saveCheckoits;
       //console.('onSaveNew', newPlace);

        if(form.validate()) {
            Ext.Ajax.request({
                url: Api.com.place_create,
                jsonData: newPlace,
                method: "POST",
                success: function(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if(result.success) {
                        if(result.data && result.data.length > 0) {
                            store.add(result.data[0]);
                            me.onCancelNew();
                            User.updateUserSession();
                        }
                    }
                },
                failure:  function(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                }
            });
        }
    },
    onCancelNew(btn) {
       //console.('onCancelNew');
        const tooltip = this.lookup('point_create');
        tooltip.hide();
        const vm = this.getViewModel();
        const storeCh = vm.getStore('checkout_store');
        storeCh.loadData([]);
    },
    addCashRegister(btn) {
        const me = this;
        const vm = me.getViewModel();
        const new_casa_cnt = me.lookup('new_casa_cnt');
        const newCheckouts = vm.get('newCheckouts');
        const store = vm.getStore('checkout_store');
        //const storeCount = store.getCount();
        //store.add({id: `${i18n.gettext('Checkout')} ${Ext.Number.randomInt(0, 10)}`});
        const chId = (Ext.data.identifier.Uuid.create().generate()).split('-')[0];
        //store.getModifiedRecords();
       //console.('getModifiedRecords', store.getModifiedRecords());
        store.add({id: chId, name: ''});
        /*
        let cnt = 0;
        Ext.Object.each(newCheckouts, (key, value, myself) => {
            let vcs = key.split('_');
           //console.('key', key, vcs);
            let ncnt = Number(vcs[1])+1;
            if(ncnt > cnt) {
                cnt = ncnt;
            }
        });
        newCheckouts[`checkout_${cnt}`] = {name:`${i18n.gettext('Checkout')} ${cnt+1}`,id:`checkout_${cnt}`};
        vm.set('newCheckouts', newCheckouts);
        const bindVal = `{newCheckouts.checkout_${cnt}.name}`;
        new_casa_cnt.add({
            xtype: 'container',
            layout: {type: 'hbox', align: 'end'},
            items: [
                {
                    xtype: 'textfield',
                    required: true,
                    flex: 1,
                    label: i18n.gettext('Name'),
                    bind: {
                        value: bindVal
                    }
                },{
                    xtype: 'button',
                    margin: '0 0 0 10',
                    ui: 'alt decline',
                    text: i18n.gettext('Delete'),
                    handler: 'delCashRegister',
                    cashId: `checkout_${cnt}`
                }
            ]
        });
       //console.('cnt', cnt);
         */
    },
    delCashRegister(btn) {
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('checkout_store');
        const record = btn.up('checkoutNewText').getRecord();
        store.remove(record);
        /*const newCheckouts = vm.get('newCheckouts');

        const cnt = btn.up('container');
        cnt.destroy();
        delete newCheckouts[btn.cashId];
        vm.set('newCheckouts', newCheckouts);*/
    }
});
