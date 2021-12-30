Ext.define('Erp.view.subscription.SubscriptionCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.subscription_ctrl',
    bindings: {
        onSubscriptionId: '{subsData.id}'
    },
    onViewShow() {
        if(User.checkAdmin())  {
            this.setActiveMenu('subscription');
        } else {
            Ext.util.History.back();
        }
    },
    onViewRender() {
        const me = this;
        //me.loadMainTariff();
        me.subsPosCheck();
    },
    subsPosCheck(doReload) {
        const me = this;
        const vm = this.getViewModel();
        Ext.Ajax.request({
            url: Api.billing.subscription_check,
            method: "POST",
            jsonData: {
                plan_type: 'pos_full'
            },
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success && result.data) {
                   //console.(Api.billing.subscription_check, result);
                    if(result.data.status > 0) {
                        vm.set('subsData', result.data);
                        me.resolveStatus(result.data, 'subsData');
                        if(result.data.status === 10 && doReload) {
                            me.renderSuccessPayment();
                        } else {
                            me.renderSubsData();
                        }
                    } else if(doReload) {
                        me.checkFirstPayment();
                    } else {
                        me.loadMainTariff();
                    }
                } else {
                    if(doReload) {
                        me.checkFirstPayment();
                    } else {
                        me.loadMainTariff();
                    }
                }
            },
            failure(resp, opt) {
                if(doReload) {
                    me.checkFirstPayment();
                }
            },
        });
    },
    renderSubsData() {
        const me = this;
        const vm = this.getViewModel();
        vm.set('subscription_form0_hide', true);
        vm.set('pos_payment_process_hide', true);
        vm.set('pos_payment_success_hide', true);
        vm.set('pos_payment_subsdata_hide', false);
    },
    onSubscriptionId(subsId) {
       //console.('onSubscriptionId', subsId);
        const me = this;
        const vm = this.getViewModel();
        if(subsId && subsId.length === 36) {
            const store = vm.getStore('invoice_list_store');
            store.load();
        }
    },
    resolveStatus(data, valName) {
        const me = this;
        const vm = me.getViewModel();
        const stText = `${valName}.status_text`;
        const stCls = `${valName}.status_cls`;
        vm.set(`${valName}.hide_renew`, true);
        vm.set(`${valName}.hide_cancel`, true);
        vm.set(`${valName}.hide_change_method`, true);
        if(data.cancel_start && data.cancel_start === true) {
            vm.set(stText, i18n.gettext('Cancellation started'));
            vm.set(stCls, 'bolder size-15 red');
            vm.set(`${valName}.hide_renew`, false);
            return;
        }
        switch (Number(data.status)) {
            case 1:
                vm.set(stText, i18n.gettext('Incomplete'));
                vm.set(stCls, 'bolder size-15 orange');
                vm.set(`${valName}.hide_change_method`, false);
                break;
            case 2:
                vm.set(stText, i18n.gettext('Incomplete expired'));
                vm.set(stCls, 'bolder size-15 orange');
                break;
            case 3:
                vm.set(stText, i18n.gettext('Past due'));
                vm.set(stCls, 'bolder size-15 orange');
                break;
            case 4:
                vm.set(stText, i18n.gettext('Unpaid'));
                vm.set(stCls, 'bolder size-15 red');
                break;
            case 10:
                vm.set(stText, i18n.gettext('Active'));
                vm.set(stCls, 'bolder size-15 green-dark');
                vm.set(`${valName}.hide_cancel`, false);
                break;
        }

    },
    renderSuccessPayment() {
        const me = this;
        const vm = this.getViewModel();
        vm.set('subscription_form0_hide', true);
        vm.set('pos_payment_process_hide', true);
        vm.set('pos_payment_subsdata_hide', true);
        vm.set('pos_payment_success_hide', false);
        User.updateUserSession();
        setTimeout(()=>{
            me.reloadLocation();
        }, 15000);
    },
    reloadLocation() {
        setTimeout(()=>{
            location.reload();
        }, 50);
    },
    loadMainTariff() {
        const me = this;
        const vm = this.getViewModel();
        Ext.Ajax.request({
            url: Api.billing.tariff_list,
            method: "GET",
            success(resp, opt) {
               //console.('Api.billing.tariff_list', resp, opt);
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success && result.data && result.data.length > 0) {
                    vm.set('tariff_pos', result.data[0]);
                }
                me.posPaymentMethods(); //pos_payment_method_btn
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    startCancelPosSubs(btn) {
        const me = this;
        Ext.Ajax.request({
            url: Api.billing.subs_pos_cancel,
            method: "POST",
            success(resp, opt) {
               //console.('Api.billing.subs_pos_cancel', resp, opt);
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success && result.data && result.data.length > 0) {
                    User.updateUserSession();
                    setTimeout(()=>{
                        me.reloadLocation();
                    }, 5000);
                }
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
    },
    startRenewPosSubs(btn) {
        Ext.Ajax.request({
            url: Api.billing.subs_pos_renew,
            method: "POST",
            success(resp, opt) {
               //console.('Api.billing.subs_pos_renew', resp, opt);
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success && result.data && result.data.length > 0) {

                }
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
    },
    posPaymentMethods() {
        const me = this;
        const vm = this.getViewModel();
        const btnCnt = me.lookup('pos_payment_method_btn');
        const payGates = vm.get('tariff_pos.configs.pay_gate') || {};
       //console.('payGates', payGates);
        Ext.Object.each(payGates, (key, value, myself)=>{
            btnCnt.add({
                xtype: 'button',
                margin: '0 15 0 0',
                text: key,
                gate: key,
                out_prod_id: value.prod_id,
                out_price_id: value.price_id,
                handler: 'ChoosePaymenMethod'
            });
        });

        vm.set('pos_payment_process_hide', true);
        vm.set('pos_payment_success_hide', true);
        vm.set('pos_payment_subsdata_hide', true);

        vm.set('subscription_form0_hide', false);
    },
    ChoosePaymenMethod(btn) {
       //console.('ChoosePaymenMethod', btn.gate);
        const me = this;
        const vm = this.getViewModel();
        //me.lookup('tariff_pos').hide();
        vm.set('pos_payment_data.price_id', btn.out_price_id);
        vm.set('pos_payment_data.gate', btn.gate);
        if(btn.gate === 'Bank card') {
            me.createPaymentCard();
        }
        if(btn.gate === 'SEPA Direct') {
            me.createPaymentSepa();
        }
    },
    startPayElement(typeEl) {
        const me = this;
        const vm = this.getViewModel();
        vm.set('pos_payment_method_hide', true);
        switch (typeEl) {
            case 'card':
                me.startElementCard();
                break;
            case 'sepa':
                me.startElementSepa();
                break;
        }
    },
    /*
    Gate payment CARD
     */
    createPaymentCard() {
        const me = this;
        const vm = this.getViewModel();
        const payData = vm.get('pos_payment_data');
        const custForm = me.lookup('pos_payment_method');
        if(custForm.validate()) {
            Ext.Ajax.request({
                url: Api.billing.create_card,
                method: "POST",
                jsonData: payData,
                success(resp, opt) {
                   //console.('Api.billing.create_card', resp, opt);
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if (result.success && result.data) {
                        vm.set('clientSession', result.data);
                        me.startPayElement('card');
                    }
                },
                failure(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });
        }
    },
    startElementCard() {
        const me = this;
        const vm = this.getViewModel();
        vm.set('pos_payment_sepa_hide', true);
        vm.set('pos_payment_card_hide', false);
        let elements = stripe.elements();
        me.cardS = elements.create('card', {
            style: {
                base: {
                    iconColor: '#000',
                    color: '#005E95',
                    fontWeight: '500',
                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                    fontSize: '16px',
                    lineHeight: '35px',
                    fontSmoothing: 'antialiased',
                    ':-webkit-autofill': {
                        color: '#fce883',
                    },
                    '::placeholder': {
                        color: '#3392CA',
                    },
                },
                invalid: {
                    iconColor: '#EA3800',
                    color: '#EA3800',
                },
            },
        });

        me.cardS.mount('#subscription-element-card');
        me.cardS.on('change', function (event) {
            me.displayCardError(event);
        });
    },
    startSubscribeCard(btn) {
       //console.('startSubscribeCard', btn);
        const me = this;
        const vm = this.getViewModel();
        const fullName = vm.get('pos_payment_data.customer_name');
        const clientSecret = vm.get('clientSession.clientSecret');
        // Create payment method and confirm payment intent.
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: me.cardS,
                billing_details: {
                    name: fullName,
                },
            }
        }).then((result) => {
            if(result.error) {
                me.displayCardError(result);
            } else {
                // Successful subscription payment
               //console.('stripe.confirmCardPayment', result);
                me.cardPaymentProcess();
            }
        });
    },
    displayCardError(event) {
        const me = this;
        const vm = this.getViewModel();
        if (event.error) {
            vm.set('element_card_error', event.error.message);
        } else {
            vm.set('element_card_error', '');
        }
    },
    /*
    Gate payment SEPA
     */
    createPaymentSepa() {
        const me = this;
        const vm = this.getViewModel();
        const payData = vm.get('pos_payment_data');
        const custForm = me.lookup('pos_payment_method');
        if(custForm.validate()) {
            Ext.Ajax.request({
                url: Api.billing.create_sepa,
                method: "POST",
                jsonData: payData,
                success(resp, opt) {
                   //console.('Api.billing.create_sepa', resp, opt);
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if (result.success && result.data) {
                        vm.set('clientSession', result.data);
                        me.startPayElement('sepa');
                    }
                },
                failure(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });
        }
    },
    startElementSepa() {
        const me = this;
        const vm = this.getViewModel();
        vm.set('pos_payment_card_hide', true);
        vm.set('pos_payment_sepa_hide', false);
        let elements = stripe.elements();
        me.sepaS = elements.create('iban', {
            supportedCountries: ['SEPA'],
            placeholderCountry: User.data.country.params.code2 || 'ES',
            style: {
                base: {
                    iconColor: '#000',
                    color: '#005E95',
                    fontWeight: '500',
                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                    fontSize: '16px',
                    lineHeight: '35px',
                    fontSmoothing: 'antialiased',
                    ':-webkit-autofill': {
                        color: '#fce883',
                    },
                    '::placeholder': {
                        color: '#3392CA',
                    },
                },
                invalid: {
                    iconColor: '#EA3800',
                    color: '#EA3800',
                },
            },
        });

        me.sepaS.mount('#subscription-element-sepa');
        me.sepaS.on('change', function (event) {
            me.displaySepaError(event);
        });
    },
    startSubscribeSepa(btn) {
       //console.('startSubscribeSepa', btn);
        const me = this;
        const vm = this.getViewModel();
        const name = vm.get('pos_payment_data.customer_name');
        const email = vm.get('pos_payment_data.customer_email');
        const clientSecret = vm.get('clientSession.clientSecret');
        // Create payment method and confirm payment intent.
        stripe.confirmSepaDebitSetup(clientSecret, {
            payment_method: {
                sepa_debit: me.sepaS,
                billing_details: {
                    name: name,
                    email: email
                },
            }
        }).then((result) => {
            if(result.error) {
                me.displaySepaError(result);
            } else {
                // Successful subscription payment
               //console.('stripe.startSubscribeSepa', result);
                me.cardPaymentProcess();
            }
        });
    },
    displaySepaError(event) {
        const me = this;
        const vm = this.getViewModel();
        if (event.error) {
            vm.set('element_card_error', event.error.message);
        } else {
            vm.set('element_card_error', '');
        }
    },
    cardPaymentProcess() {
        const me = this;
        const vm = this.getViewModel();
        vm.set('subscription_form0_hide', true);
        vm.set('subsData_container_card', true);
        vm.set('pos_payment_process_hide', false);
        me.checkFirstPayment();
    },
    checkFirstPayment() {
        const me = this;
        const vm = this.getViewModel();
        setTimeout(()=>{
            me.subsPosCheck();
        }, 5000);
    },
    startPayment(btn) {
        const me = this;
        const vm = this.getViewModel();
        const tariff_pos = vm.get('tariff_pos');
        const custForm = me.lookup('pos_payment_method');
        const payData = {
            tariff_id: tariff_pos.id,
            price: vm.get('tariff_pos.price'),
            quantity: vm.get('tariff_count_pos'),
            price_total: vm.get('tariff_total_price'),
            customer_name: User.fullName(),
            customer_email: User.data.customer.email,
        }
        vm.set('pos_payment_method_hide', false);
        vm.set('pos_payment_start_hide', true);
        vm.set('pos_payment_data', payData);
        custForm.validate();
    },
    /*changePaymentPosSubs(btn) {
        const me = this;
        const vm = this.getViewModel();
        const btnCnt = me.lookup('subsData_pos_method_btns');
        vm.set('subsData_pos_methods_hide', false);
        vm.set('subsData.hide_change_method', true);

        const payGates = vm.get('subsData.configs.pay_gate') || {};
       //console.('changePaymentPosSubs', payGates);
        Ext.Object.each(payGates, (key, value, myself)=>{
            btnCnt.add({
                xtype: 'button',
                margin: '0 15 0 0',
                text: key,
                gate: key,
                handler: 'chooseSubsMethod'
            });
        });
    },
    chooseSubsMethod(btn) {
       //console.('chooseSubsMethod', btn.gate);
        const me = this;
        const vm = this.getViewModel();
        //me.lookup('tariff_pos').hide();
        vm.set('pos_payment_data.price_id', btn.out_price_id);
        vm.set('pos_payment_data.gate', btn.gate);
        if(btn.gate === 'Bank card') {
            me.updatePaymentStripe('card', btn.gate);
        }
        if(btn.gate === 'SEPA Direct') {
            me.updatePaymentStripe('sepa_debit', btn.gate);
        }
    },
    updatePaymentStripe(payType, gate) {
        const me = this;
        const vm = this.getViewModel();
        const id = vm.get('subsData.id');
        Ext.Ajax.request({
            url: Api.billing.subs_pos_method,
            method: "POST",
            jsonData: {
                payType,
                gate,
                id
            },
            success(resp, opt) {
               //console.('Api.billing.update_paytype', resp, opt);
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success && result.data) {
                    vm.set('clientSession', result.data);
                    me.elementFormSubsData(payType);
                }
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    elementFormSubsData(payType) {
        const me = this;
        if(payType === 'card') {
            me.elementFormSubsDataCard();
        }
    },
    elementFormSubsDataCard() {
        const me = this;
        const vm = this.getViewModel();
        vm.set('subsData_pos_methods_hide', true);
        vm.set('subsData_card_hide', false);
        let elements = stripe.elements();
        me.cardU = elements.create('card', {
            style: {
                base: {
                    iconColor: '#000',
                    color: '#005E95',
                    fontWeight: '500',
                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                    fontSize: '16px',
                    lineHeight: '35px',
                    fontSmoothing: 'antialiased',
                    ':-webkit-autofill': {
                        color: '#fce883',
                    },
                    '::placeholder': {
                        color: '#3392CA',
                    },
                },
                invalid: {
                    iconColor: '#EA3800',
                    color: '#EA3800',
                },
            },
        });

        me.cardU.mount('#subsData-element-card');
        me.cardU.on('change', function (event) {
            me.displaySubsCardError(event);
        });
    },
    displaySubsCardError(event) {
        const me = this;
        const vm = me.getViewModel();
        if (event.error) {
            vm.set('subsData_card_error', event.error.message);
        } else {
            vm.set('subsData_card_error', '');
        }
    },
    sendUpdateStripeCard(btn) {
        const me = this;
        const vm = me.getViewModel();
       //console.('sendUpdateStripeCard', btn);
        const fullName = vm.get('subsData.customer_name');
        const clientSecret = vm.get('clientSession.clientSecret');
        // Create payment method and confirm payment intent.
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: me.cardU,
                billing_details: {
                    name: fullName,
                },
            }
        }).then((result) => {
            if(result.error) {
                me.displaySubsCardError(result);
            } else {
                // Successful subscription payment
               //console.('stripe.confirmCardPayment', result);
                me.cardPaymentProcess();
            }
        });
    }*/
});
