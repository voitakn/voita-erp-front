Ext.define('Erp.view.company.CompanyCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.company_ctrl',
    bindings: {
        onBrowseImage: '{image}',
    },
    dropListen: false,
    onViewShow() {
        // console.log('onViewShow');
        const me = this;
        const vm = me.getViewModel();
        const userData = User.data;
        let customerConfigs = userData.customer.configs || {};
        let countryD = userData.country || {};
        const userModel = Ext.create('Erp.model.Company', {
            id: userData.customer.id,
            date_create: userData.customer.date_create,
            country_id: userData.country.id,
            title: userData.customer.title,
            full_title: userData.customer.configs.full_title || '',
            email: userData.customer.email,
            postcode: customerConfigs.postcode || '',
            city: customerConfigs.city || '',
            address: customerConfigs.address || '',
            phone: userData.customer.phone,
            currency: countryD.params.currency.name,
            country_en: userData.country.country_en,
            tax_name: countryD.params.tax_number.name,
            tax_number: customerConfigs.tax_number || '',
            logo: customerConfigs.logo,
            logo_id: customerConfigs.logo_id,
            lng: userData.customer.lng,
            configs: customerConfigs
        });
        vm.set('theCard', userModel);
        vm.set('all_configs', customerConfigs);
        me.setActiveMenu('company');
        me.logoImgLoad();
    },
    toBack(btn) {
        Ext.util.History.back();
    },
    onEditCard(btn) {
        const me = this;
        const vm = me.getViewModel();
        const editCard = me.lookup('company_edit');
        const phonefiled = me.lookup('company_phone');
        phonefiled.setInputMask(User.data.country.params.phone_mask);
        editCard.setTarget(btn);
        editCard.show();
    },
    onCancelEdit(btn) {
        const me = this;
        const vm = me.getViewModel();
        const editCard = me.lookup('company_edit');
        me.onViewShow();
        editCard.hide();
    },
    onSaveEdit(btn) {
        const me = this;
        const vm = me.getViewModel();
        const editCard = me.lookup('company_edit');
        const form = btn.up('formpanel');
        const theCard = vm.get('theCard');
        const configs = theCard.get('configs');
        configs.postcode = theCard.get('postcode');
        configs.city = theCard.get('city');
        configs.address = theCard.get('address');
        configs.postcode = theCard.get('postcode');
        configs.pos_mode = theCard.get('pos_mode');
        configs.tax_number = theCard.get('tax_number');
        configs.full_title = theCard.get('full_title');
        if (theCard.modified) {
            if (form.isValid()) {
                theCard.save({
                    callback(record, operation, success) {
                        if (success) {
                            editCard.hide();
                            User.updateUserSession(()=>{me.onViewShow()});
                        }
                    }
                });
            }
        } else {
            editCard.hide();
        }
    },
    onCancelLogo(btn) {
        const me = this;
        const vm = me.getViewModel();
        const editLogo = me.lookup('logo_edit');
        me.onClearLogo();
        editLogo.hide();
    },
    onClearLogo() {
        const me = this;
        let preview = me.lookup('canvas_preview');
        let fileForm = me.lookup('company_logo_form');
        preview.getSurface().removeAll();
        preview.setHeight(150);
        preview.setWidth(150);
        preview.getSurface().add([{
            type: 'circle',
            cx: 75,
            cy: 75,
            r: 75,
            fillStyle: '#eeeeee'
        },{
            type: 'text',
            x: 75,
            y: 90,
            text: 'No logo!',
            textAlign: 'center',
            fontSize: 30,
            fillStyle: '#3392CA'
        }]);
        preview.getSurface().renderFrame();
        fileForm.reset();
    },
    onSaveLogo(btn) {
        const me = this;
        const vm = me.getViewModel();
        const preview = me.lookup('canvas_preview');
        const theCard = vm.get('theCard');
        const canv = preview.el.dom.querySelector('canvas');
        const base64img = canv.toDataURL('image/webp', 0.9);
        const sprt =  preview.getSurface().getItems();
        let ifLogo = false;
        if(sprt.length > 0) {
            Ext.Array.each(sprt, (row)=>{
                if(row.type === 'image') {
                    ifLogo = true;
                }
            });
        }
        if(ifLogo) {
            Ext.Ajax.request({
                url: '/logos/upload',
                method: 'POST',
                jsonData: {
                    img: `${base64img}`,
                    user_id: User.data.user_id,
                    customer_id: User.data.customer.id,
                    active: true,
                    id: theCard.get('logo_id') || ''
                },
                success: function(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if(result.data && result.data.id && result.data.id.length === 36){
                        me.saveLogoLink(result.data.id);
                    }
                },
                failure: function (resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                }
            });
        }
    },
    saveLogoLink(logoId) {
        const me = this;
        const vm = me.getViewModel();
        const logoLink = `/logos/src/${logoId}`;
        const theCard = vm.get('theCard');
        vm.set('theCard.logo', logoLink);
        vm.set('theCard.logo_id', logoId);
        vm.set('theCard.data.configs.logo_id', logoId);
        vm.set('theCard.data.configs.logo', logoLink);
        theCard.save({
            callback(record, operation, success) {
                if (success) {
                    User.updateUserSession(()=>{
                        me.onViewShow();
                        me.onCancelLogo();
                    });
                }
            }
        });
    },
    onEditLogo(btn) {
        const me = this;
        const vm = me.getViewModel();
        const oldLogo = vm.get('all_configs.logo');
        const editLogo = me.lookup('logo_edit');
        const addFile = me.lookup('addFile');
        let preview = me.lookup('canvas_preview');
        if(oldLogo && oldLogo.length > 0) {
            const origLogo = me.lookup('company_logo_view');
            const origImg = origLogo.el.dom.querySelector('img');
            const ts = new Date().getTime();
            preview.getSurface().removeAll();
            preview.setHeight(origImg.height);
            preview.setWidth(origImg.width);
            preview.getSurface().add({
                type: 'image',
                src: `${oldLogo}?${ts}`,
                width: origImg.width,
                height: origImg.height,
                y: 0,
                x: 0
            });
            preview.getSurface().renderFrame();
        } else {
            me.onClearLogo();
        }
        if(!me.dropListen) {
            addFile.el.dom.addEventListener('drop', (e)=>{me.logoFileDrop(e)}, false);
            me.dropListen = true;
        }
        editLogo.setTarget(btn);
        editLogo.show();
    },
    logoFileDrop(e){
        const me = this;
        const form = me.lookup('company_logo_form');
        form.reset();
        e.preventDefault();
        e.stopPropagation();
        let dt = e.dataTransfer;
        let files = dt.files;
        if(files && files.length > 0) {
            me.renderLogoCanvas(files[0]);
        } else {
            me.onClearLogo();
        }
    },
    logoFileSelect(fld) {
        const files = fld.getFiles();
        if(files && files.length > 0) {
            this.renderLogoCanvas(files[0]);
        } else {
            this.onClearLogo();
        }
    },
    renderLogoCanvas(logoFile){
        const me = this;
        const reader = new FileReader();
        const image = new Image();
        const newWidth = 150;
        const preview = me.lookup('canvas_preview');
        reader.readAsDataURL(logoFile);
        preview.getSurface().removeAll();
        image.onload = () => {
            const oldWidth = image.width;
            const oldHeight = image.height;
            const newHeight = Math.floor(oldHeight / oldWidth * newWidth);
            preview.setHeight(newHeight);
            preview.setWidth(newWidth);
            preview.getSurface().add({
                type: 'image',
                x: 0,
                y: 0,
                src: image.src,
                width: newWidth,
                height: newHeight,
            });
            preview.getSurface().renderFrame();
        }
        reader.onloadend = () => {
            image.src = reader.result;
        }
    },
    logoImgLoad() {
        const me = this;
        const vm = me.getViewModel();
        const logoSrc = vm.get('all_configs.logo');
        const origLogo = me.lookup('company_logo_view');
        origLogo.setHtml('<div></div>');
        const ts = new Date().getTime();
        if(logoSrc && logoSrc.length > 0) {
            origLogo.setHtml(`<img src="${logoSrc}?${ts}"/>`);
        }
    },
});
