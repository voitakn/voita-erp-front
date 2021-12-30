Ext.define('Erp.model.Supplier', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'title',  type: 'string'},
        {name: 'email',  type: 'string'},
        {name: 'country_id',  type: 'number'},
        {name: 'country_en',  type: 'string'},
        {name: 'country_origin',  type: 'string'},
        {name: 'address',  type: 'string'},
        {name: 'city',  type: 'string'},
        {name: 'postcode',  type: 'string'},
        {name: 'surname',  type: 'string'},
        {name: 'name',  type: 'string'},
        {name: 'phone',  type: 'string'},
        {name: 'invite',  type: 'boolean'},
        {name: 'country_row',  type: 'string',
            calculate(data){
                let txt = '';
                if(data.country_en.length > 0) {
                    txt = data.country_en;
                    if(data.city.length > 0) {
                        if(data.postcode.length > 0) {
                            txt = `${txt}, ${data.postcode},`;
                        }
                            txt = `${txt}, ${data.city}`;
                    }
                }
                return txt;
            }
        },
        {name: 'address_row_grid',  type: 'string',
            calculate(data){
                let txt = '';
                if(data.country_en) {
                    if(data.city.length > 0 && data.address.length > 0) {
                            txt = `${data.address}`;
                    }
                }
                return txt;
            }
        },
    
        {name: 'address_row',  type: 'string',
            calculate(data){
                let txt = '';
                if(data.country_en) {
                    if(data.city.length > 0) {
                        if(data.postcode.length > 0) {
                            txt = `${data.postcode}, `;
                            }
                        if(data.city.length > 0) {
                            txt = `${txt}${data.city}`;
                        }
                        if(data.address.length > 0) {
                            txt = `${txt}, ${data.address}`;
                        }
                    }
                }
                return txt;
            }
        },
    ],
    validators: {
        title: {type: 'length', min: 2},
        // email: {type: 'format', matcher: /^(([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})){0,24}$/, message: i18n.gettext('The e-mail should be like this: email@mail.com'),
        // }
    },
    
    proxy: {
        type: 'erp_api',
        api: {
            update: Api.com.supplier_save,
            create: Api.com.supplier_save
        }
    },
});
