Ext.define('Erp.util.Api', () => {
    const api = '/api/';
    const com = `${api}com/`;
    const items = `${api}items/`;
    const adm = `${api}adm/`;
    const inv = `${api}inv/`;
    const price = `${api}price/`;
    const report = `${api}report/`;
    const billing = `${api}billing/`;
    const b2b = `${api}b2b/`;
    const markets = `${api}markets/`;
    return {
        alternateClassName: ['Api'],
        singleton: true,
        user: {
            data: `${api}user/data`,
            reload: `${api}user/reload`,
            logout: `${api}/user/logout`,
        },
        adm: {
            groles_list: `${adm}groles_list`,
            groles_save: `${adm}groles_save`,
            groles_groups: `${adm}groles_groups`,
            group_list: `${adm}group_list`,
            group_save: `${adm}group_save`,
            group_delete: `${adm}group_delete`,
            group_roles_save: `${adm}group_roles_save`,
            group_roles_list: `${adm}group_roles_list`,
            groles_delete: `${adm}groles_delete`,
            countries: `${adm}countries`,
            country_save: `${adm}country_save`,
            customer_list: `${adm}customer_list`,
            customer_create: `${adm}customer_create`,
            customer_card: `${adm}customer_card`,
            customer_save: `${adm}customer_save`,
            scheme_list: `${adm}scheme_list`
        },
        billing: {
            tariff_list: `${billing}tariff_list`,
            subscription_check: `${billing}subscription_check`,
            create_card: `${billing}create_card`,
            create_sepa: `${billing}create_sepa`,
            subs_invoices: `${billing}subs_invoices`,
            subs_pos_cancel: `${billing}subs_pos_cancel`,
            subs_pos_renew: `${billing}subs_pos_renew`,
            subs_pos_cancel_strict: `${billing}subs_pos_cancel_strict`,
            subs_pos_method: `${billing}subs_pos_method`
        },
        com: {
            country_list: `${com}country_list`,
            countries: `${com}countries`,
            customer_install: `${com}customer_install`,
            customer_install_save: `${com}customer_install_save`,
            customer_save: `${com}customer_save`,
            place_create: `${com}place_create`,
            place_save: `${com}place_save`,
            place_list_all: `${com}place_list_all`,
            worker_list: `${com}worker_list`,
            worker_save: `${com}worker_save`,
            worker_card: `${com}worker_card`,
            worker_place_save: `${com}worker_place_save`,
            worker_group_list: `${com}worker_group_list`,
            worker_group_save: `${com}worker_group_save`,
            supplier_list: `${com}supplier_list`,
            supplier_save: `${com}supplier_save`,
            login_change_passwd: `${com}login_change_passwd`,
            login_params_save: `${com}login_params_save`,
        },
        items: {
            catalog_tree: `${items}catalog_tree`,
            catalog_tree_save: `${items}catalog_tree_save`,
            produce_card: `${items}produce_card`,
            produce_list: `${items}produce_list`,
            produce_save: `${items}produce_save`,
            purchase_produce_list: `${items}purchase_produce_list`,
            retail_produce_barcode: `${items}retail_produce_barcode`,
            retail_produce_list: `${items}retail_produce_list`,
        },
        price: {
            cols_list: `${price}cols_list`,
            cols_defs: `${price}cols_defs`,
            cols_save: `${price}cols_save`,
            produce_purchase: `${price}produce_purchase`,
            produce_cols: `${price}produce_cols`,
            produce_cols_save: `${price}produce_cols_save`,
            produce_history: `${price}produce_history`,
            last_prices: `${price}last_prices`,
            plist_produce: `${price}plist_produce`,
            plist_create: `${price}plist_create`,
            plist_save: `${price}plist_save`,
            get_retail: `${price}get_retail`,
            purchase_save: `${price}purchase_save`,
            retail_save: `${price}retail_save`,
            retail_by_places: `${price}retail_by_places`,
            retail_places_onoff: `${price}retail_places_onoff`,
        },
        inv: {
            create_pos_sell: `${inv}create-pos-sell`,
            expense_list: `${inv}expense_list`,
            expense_edit: `${inv}expense_edit`,
            sell_retail_create: `${inv}sell_retail_create`,
            sell_list_date_user: `${inv}sell_list_date_user`,
            sell_invoice_items: `${inv}sell_invoice_items`,
            sell_card_by_id: `${inv}sell_card_by_id`,
            sell_revert: `${inv}sell_revert`,
            sell_revert_list: `${inv}sell_revert_list`,
            sell_revert_close: `${inv}sell_revert_close`,
            buy_create: `${inv}buy_create`,
            buy_list_month: `${inv}buy_list_month`,
            buy_invoice_items: `${inv}buy_invoice_items`,
            buy_paid_save: `${inv}buy_paid_save`,
            buy_list_supplier: `${inv}buy_list_supplier`,
            invent_by_place: `${inv}invent_by_place`,
            invent_prod: `${inv}invent_prod`,
            move_create: `${inv}move_create`,
            move_list_month: `${inv}move_list_month`,
            move_invoice_items: `${inv}move_invoice_items`,
            move_dispatched: `${inv}move_dispatched`,
            move_accepted: `${inv}move_accepted`,
            cashopen_list: `${inv}cashopen_list`,
            cashopen_start: `${inv}cashopen_start`,
            cashopen_status: `${inv}cashopen_status`,
            cashopen_stop: `${inv}cashopen_stop`,
            cashopen_list_stop: `${inv}cashopen_list_stop`,
        },
        report: {
            main_stat: `${report}main_stat`,
            charts_stat: `${report}charts_stat`,
            desk_main_stat: `${report}desk_main_stat`,
            desk_places_stat: `${report}desk_places_stat`,
        },
        b2b: {
            partners_list: `${b2b}partners_list`,
            partners_incoming: `${b2b}partners_incoming`,
            partners_outgoing: `${b2b}partners_outgoing`,
            partner_create: `${b2b}partner_create`,
            partner_invite: `${b2b}partner_invite`,
            partner_accept: `${b2b}partner_accept`,
            partner_save: `${b2b}partner_save`,
            partner_remove: `${b2b}partner_remove`,
            partners_search: `${b2b}partners_search`,
            partner_connect: `${b2b}partner_connect`,
        },
        markets: {
            catalog_tree: `${markets}catalog_tree`,
        }
    };
});
