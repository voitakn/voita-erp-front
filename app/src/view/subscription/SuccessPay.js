Ext.define('Erp.view.subscription.SuccessPay', {
    extend: 'Ext.Container',
    xtype: 'subscription_success',
    layout: 'center',
    items: [
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'container',
                    html: `
            <div class="row justify-content-center">
              <div class="text-center mt-3">
                <p class="text-center bolder green-dark size-26">${i18n.gettext('Excellent!')}</p>
                <p class="text-center bolder green-dark size-26">${i18n.gettext('Your subscription has been successfully activated.')}</p>
                <p class="text-center bolder green-dark size-26">${i18n.gettext('We will be happy to help you grow your business!')}</p>
                <p class="text-center bolder green-dark size-26">${i18n.gettext('Thank you for choosing our service!')}</p>
                <br/><br/>
                <p class="text-center size-20">${i18n.gettext('You will be returned to subscriptions page in 15 seconds!')}</p>
                <br/><br/>
              </div>
            </div>`
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: i18n.gettext('Go to subscriptions page'),
                            ui: 'alt confirm',
                            handler: 'reloadLocation'
                        }
                    ]
                }
            ]
        }
    ]
});