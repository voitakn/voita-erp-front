Ext.define('Erp.view.subscription.Processing', {
    extend: 'Ext.Container',
    xtype: 'subscription_processing',
    layout: 'center',
    items: [
        {
            xtype: 'container',
            html: `<div class="row justify-content-center">
              <div class="text-center mt-3">
                <p class="text-center bolder size-26">${i18n.gettext('We are awaiting payment information for your subscription.')}</p>
                <p class="text-center bolder size-26">${i18n.gettext('Please do not close this page.')}</p>
              </div>
              <div class="row justify-content-center mb-3">
                <div class="lds-dual-ring"></div>
              </div>
            </div>`
        }
    ]
});