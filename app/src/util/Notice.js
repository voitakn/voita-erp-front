Ext.define('Erp.util.Notice', {
    alternateClassName: ['Notice'],
    singleton: true,
    showToast(data) {
        const me = this;
        let html = i18n.gettext('Sorry, we have a technical problem at the moment, please try again later!');
        let code;
        const message_tpl = '<div class="{0} notice-msg"><span class="{1}"></span> <span class="msg-text">{2}</span></div>';
        let class_0 = '';
        let class_1 = '';
        let show_msg = false;

        if (data.code_err) {
            show_msg = true;
            code = data.code_err;
            class_0 = 'red';
            class_1 = 'x-fas fa-exclamation-triangle';
        }
        if (data.code_msg) {
            show_msg = true;
            code = data.code_msg;
            class_0 = 'green-dark';
            class_1 = 'x-fas fa-info-circle';
        }
        if (show_msg) {
            if (typeof code === 'string') {
                const cd = code.split('.');
                const sch = cd[0];
                const prc = cd[1];
                const txt = cd[2];
                if (me[sch]) {
                    if (me[sch][prc]) {
                        if (sch === 'all') {
                            html = me[sch][prc];
                        } else if (me[sch][prc][txt]) {
                            html = me[sch][prc][txt];
                        }
                    }
                }
            } else if (typeof code === 'object') {
                html = Ext.String.format('<b>{0}:</b><br/>', i18n.ngettext('Please, fix the errors below and try again'));
                Ext.Array.each(code, (str) => {
                    const cd = str.split('.');
                    const sch = cd[0];
                    const prc = cd[1];
                    if (me[sch]) {
                        if (me[sch][prc]) {
                            if (sch === 'all') {
                                html += Ext.String.format('<li>{0}</li>', me[sch][prc]);
                            } else if (me[sch][prc][txt]) {
                                html += Ext.String.format('<li>{0}</li>', me[sch][prc][txt]);
                            }
                        }
                    }
                });
            }
            const message = Ext.String.format(message_tpl, class_0, class_1, html);

            Ext.toast({
                message,
                alignment: 'b',
                timeout: 2500,
                modal: true,
                centered: true,
                closable: true
            });
        } else if (data.msg) {
            class_0 = 'red';
            class_1 = 'x-fas fa-exclamation-triangle';
            if(data.success === true) {
                class_0 = 'green-dark';
                class_1 = 'x-fas fa-info-circle';
            }
            let backMessage = Umsg.message[data.msg] || data.msg;
            const message = Ext.String.format(message_tpl, class_0, class_1, backMessage);

            Ext.toast({
                message,
                alignment: 'b',
                timeout: 2500,
                modal: true,
                centered: true,
                closable: true
            });
        }
    },
    all: {
        not_required: i18n.gettext('Sorry! You need to fill in all required fields.'),
        not_found: i18n.gettext('Data was not found.'),
        not_data: i18n.gettext('Data is not available.'),
        not_page: i18n.gettext('The page is not available'),
        not_request: i18n.gettext('Sorry! We cannot found request data!'),
        not_method_post: i18n.gettext('Sorry! The request method is not valid!'),
        user_no_check: i18n.gettext('There is no organization ID.'),
        user_no_login: i18n.gettext('Do authorization, please!'),
        error_sendmail: i18n.gettext('Sorry! The email not sent!'),
        failure_body_data: i18n.gettext('Sorry! Request data is not correct!'),
        not_plan_type: i18n.gettext('Sorry! Not found subscription type!'),
        role_is_cluster: i18n.gettext('Sorry! You cannot request this operation!'),
        user_no_roles: i18n.gettext('Sorry! You do not have access to this operation!'),
        no_subs_pos_start: i18n.gettext('Sorry! Your was not started!'),
        not_found_subscription: i18n.gettext('Sorry! The subscription type not found!'),
        renew_subscription: i18n.gettext('The subscription was renewed successfully!'),
        cancel_subscription: i18n.gettext('The subscription cancellation was started successfully!'),
    },
    adm: {
        customer_create: {
            error_1: i18n.gettext('Please, enter the user login!'),
            error_2: i18n.gettext('Please, enter the password!'),
            error_3: i18n.gettext('Please,confirm the password!'),
            error_4: i18n.gettext('You entered two different passwords. Please try again!'),
            error_5: i18n.gettext('Please, enter the country!'),
            error_6: i18n.gettext('Please, enter the organization!'),
            error_7: i18n.gettext('Please, enter the organization phone!'),
            error_8: i18n.gettext('Please, enter the currency!'),
            error_9: i18n.gettext('Please, specify the main place of business!'),
            error_10: i18n.gettext('Registration with your accounts failed!'),
            error_11: i18n.gettext('The creation of an organization account ended in an error!'),
            error_12: i18n.gettext('An error occurred in user activation!'),
            error_13: i18n.gettext('Administrative group was not found!'),
            error_14: i18n.gettext('No name for the main service catalog!'),
            error_15: i18n.gettext('No name for main products catalog!'),
            info: i18n.gettext('Organization was successfully created!')
        },
        customer_save: {
            error_1: i18n.gettext('Please, enter the country.'),
            error_2: i18n.gettext('Please, enter the organization.'),
            error_3: i18n.gettext('Please, enter the organization phone.'),
            error_4: i18n.gettext('Please, enter the organization e-mail.'),
            error_5: i18n.gettext('Organization was not found.'),
            error_6: i18n.gettext('Organization card was not obtained.'),
            info: i18n.gettext('Organization was not found.')
        },
        groles_delete: {
            error: i18n.gettext('The selected role was not found.'),
            info: i18n.gettext('Role was successfully deleted.')
        },
        groles_save: {
            error_1: i18n.gettext('Please, specify the module name.'),
            error_2: i18n.gettext('Please, specify the function name.'),
            error_3: i18n.gettext('A similar role already exists.'),
            error_4: i18n.gettext('The role data was not found.'),
            info: i18n.gettext('Role was successfully saved.')
        },
        group_delete: {
            error: i18n.gettext('The selected group was not found.'),
            info: i18n.gettext('Group was successfully deleted.')
        },
        group_roles_save: {
            error: i18n.gettext('Group was not found.'),
            info: i18n.gettext('Roles for the group were successfully updated.')
        },
        group_save: {
            error: i18n.gettext('Please, specify the group name.'),
            info: i18n.gettext('Group was successfully saved.')
        }
    },
    com: {
        catalog_tree_save: {
            error_1: i18n.gettext('Please,specify the name of catalogs section.'),
            error_2: i18n.gettext('Please,specify the parenting section.'),
            error_3: i18n.gettext('Something goes wrong in section saving.'),
            info: i18n.gettext('Catalog section was successfully saved.')
        },
        login: {
            error_1: i18n.gettext('Your e-mail address or password is not correct or is not registered.'),
            error_2: i18n.gettext('Your e-mail address or password is not correct or is not registered.'),
            error_3: i18n.gettext('Client ID was noy found.'),
            info: i18n.gettext('Welcome to Voita ERP.')
        },
        produce_save: {
            error_1: i18n.gettext('There is no name of product.'),
            error_2: i18n.gettext('There is no catalog section.'),
            error_3: i18n.gettext('There is no price.'),
            error_4: i18n.gettext('An error occurred while saving product.'),
            error_5: i18n.gettext('There is an error in creating product price.'),
            info: i18n.gettext('Product was successfully saved.')
        },
        place_save: {
            error_1: i18n.gettext('Please, specify the name of point of retail sale'),
            error_2: i18n.gettext('There is an error in saving point of retail sale '),
            info: i18n.gettext('Point of retail sale was successfully saved'),
        },
        worker_save: {
            error_1: i18n.gettext('Please,enter user login as e-mail'),
            error_2: i18n.gettext('Please,enter a user password of not less than 8 and not more than 16 characters'),
            error_3: i18n.gettext('Unable to create an account with specified email. Please, try another one.'),
            error_4: i18n.gettext('Failed to execute query.Please, try again'),
            info_1: i18n.gettext('Employee data has been successfully saved'),
            info_2: i18n.gettext('Employee was successfully created.'),
        },
        customer_save: {
            error_1: i18n.gettext('Saving is not possible.'),
            error_2: i18n.gettext('Specify the name of the organization.'),
            error_3: i18n.gettext('Composition not found.'),
            info: i18n.gettext('Company information was successfully saved'),
        },
        worker_place_save: {
            error_1: i18n.gettext('Employee is not specified'),
            info: i18n.gettext('Points of sale of employee were successfully changed.'),
        },
        worker_group_save: {
            error_1: i18n.gettext('Please, select an employee.'),
            info: i18n.gettext('Groups of employee were successfully changed.'),
        },
        retail_produce_list: {
            error_1: i18n.gettext('Point of retail sale is not specified'),
        },
        supplier_save: {
            error_1: i18n.gettext('Please enter the name of the organization.'),
            error_2: i18n.gettext('Please indicate the country of organization.'),
            info_1: i18n.gettext('Supplier was saved successfully.'),
            info_2: i18n.gettext('Supplier was added successfully.'),
        },
        login_change_passwd: {
            error_1: i18n.gettext('Password not changed. Old password not correct.'),
            error_2: i18n.gettext('Please check for form errors and retry'),
            info: i18n.gettext('Password was changed successfully.'),
        },
        login_params_save: {
            info_1: i18n.gettext('Information about user changed successfully.'),
        }
    },
    common: {
        add_period: {
            error_1: i18n.gettext('Period scheme was not found.'),
            error_2: i18n.gettext('Period storage was not found.'),
            error_3: i18n.gettext('An error occurred while adding the period.')
        }
    },
    inv: {
        sell_invoice_items: {
            error_1: i18n.gettext('There is no number of document.'),
            error_2: i18n.gettext('Period is not specified.')
        },
        sell_retail_create: {
            error_1: i18n.gettext('This type of payment is not supported.'),
            error_2: i18n.gettext('The document’s period was not selected.'),
            error_3: i18n.gettext('The period for document’s position was not selected.'),
            error_4: i18n.gettext('An error occurred while creating document .'),
            error_5: i18n.gettext('The period for inventory was not selected.'),
            error_6: i18n.gettext('Point of retail sale was not specified.'),
            error_7: i18n.gettext('To pay by credit card you need to specify the terminal check number.'),
            info: i18n.gettext('Document was successfully created.')
        },
        buy_list_month: {
            error_1: i18n.gettext('Please, select the point of retail sale.'),
            error_2: i18n.gettext('Please, select the period of purchase.'),
        },
        buy_list_supplier: {
            error_1: i18n.gettext('Please, select the point of retail sale.'),
            error_2: i18n.gettext('Please, select the period of purchase.'),
        },

        sell_list_date_user: {
            error_1: i18n.gettext('Please, select the point of retail sale.'),
        },
        buy_create: {
            error_1: i18n.gettext('Point of retail sale or storage was not specified.'),
            error_2: i18n.gettext('Date was not specified.'),
            error_3: i18n.gettext('Unable to get table for purchase number.'),
            error_4: i18n.gettext('Unable to get table for contents of purchase item.'),
            error_5: i18n.gettext('Unable to get table for inventory.'),
            error_6: i18n.gettext('An error occurred while creating new purchase.'),
            error_7: i18n.gettext('Unable to create product.'),
            error_8: i18n.gettext('We cannot find the product.'),
            info: i18n.gettext('New purchase was successfully created.')
        },
        buy_paid_save: {
            info: i18n.gettext('Payment information was successfully saved.'),
            error_1: i18n.gettext('There is no number of purchase.'),
            error_2: i18n.gettext('There is no period of document.'),
            error_3: i18n.gettext('There is no type of payment.'),
            error_4: i18n.gettext('There is no payment document number.'),
            error_5: i18n.gettext('There is no date of the payment document.'),
            error_6: i18n.gettext('Purchase payment was not specified.'),
            error_7: i18n.gettext('There is no purchase number.'),
        },
        sell_revert_list: {
            error_1: i18n.gettext('Please select period.'),
        },
        move_list_month: {
            error_1: i18n.gettext('Please select point of sale.'),
            error_2: i18n.gettext('Please choose period of the invoices.'),
        },
        move_create: {
            error_1: i18n.gettext('There is no number of document.'),
            error_2: i18n.gettext('Period is not specified.'),
            info: i18n.gettext('Documents successfully saved.')
        },
        move_dispatched: {
            error_1: i18n.gettext('Error.'),
            info: i18n.gettext('Status changed successfully!'),
        },
        move_accepted: {
            error_1: i18n.gettext('Error.'),
            info: i18n.gettext('Status changed successfully!'),
        },
        sell_pos_create_: {
            error_1: i18n.gettext('Sorry! Not found point of place.'),
            error_2: i18n.gettext('Sorry! Not found checkout session.'),
            error_3: i18n.gettext('Sorry! Not found period.'),
        },
        sell_revert_close: {
            error_1: i18n.gettext('You need to send request number.'),
            error_2: i18n.gettext('Opened request not found.'),
            error_3: i18n.gettext('Invoice for returning not found.'),
            info: i18n.gettext('The return request has been completed.'),
        },
        sell_revert: {
            error_1: i18n.gettext('You need to send invoice number.'),
            error_2: i18n.gettext('Invoice for reverting not found.'),
            error_3: i18n.gettext('Your invoice is still in reverting process.'),
            info: i18n.gettext('Invoice returning request was created.'),
        },
        cashopen_start: {
            error_1: i18n.gettext('The checkout was launched earlier, we cannot start it again.'),
            error_2: i18n.gettext('Sorry! We got an error before start your checkout.'),
            error_3: i18n.gettext('We got an error while saving.'),
            info: i18n.gettext('The checkout was successfully launched, now you can sell.'),
        },
        cashopen_status: {
            error_1: i18n.gettext('The POS session is not active.'),
        },
        cashopen_stop_: {
            error_1: i18n.gettext('Sorry! Not found the checkout session.'),
            info: i18n.gettext('Checkout session was finished.'),
        },
        cashopen_check_: {
            error_1: i18n.gettext('Sorry! Not found checkout session.'),
            info: i18n.gettext('The POS session is active.'),
        },
        expense_edit: {
            error_1: i18n.gettext('Unable to create product.'),
            info: i18n.gettext('New expense was successfully created.')
        },
    },
    price: {
        cols_save: {
            error_1: i18n.gettext('Price column name is not specified.'),
            error_2: i18n.gettext('There is no margin percent for purchase.'),
            error_3: i18n.gettext('An error occurred while creating a price option.'),
            info: i18n.gettext('Price option was successfully saved.')
        },
        plist_create: {
            error_1: i18n.gettext('There is no name for price column.'),
            error_2: i18n.gettext('There is no margin percent for purchase.'),
            error_3: i18n.gettext('Adding price is possible only for products and services.'),
            error_4: i18n.gettext('An error occurred while specifying the price period.'),
            info: i18n.gettext('Price was successfully saved.')
        },
        plist_save: {
            error_1: i18n.gettext('Column priority should be higher than 0.'),
            error_2: i18n.gettext('Adding price is possible only for products and services.'),
            error_3: i18n.gettext('An error occurred while specifying the price period.'),
            error_4: i18n.gettext('An error occurred while saving price.'),
            error_5: i18n.gettext('An error occurred while saving price.'),
            error_6: i18n.gettext('Price has not changed.'),
            info_1: i18n.gettext('Price has not changed.To save, please,specify another price.'),
            info_2: i18n.gettext('Price was successfully saved.')
        },
        produce_price_save: {
            error: i18n.gettext('Unable to save new product price.')
        },
        retail_save: {
            error_3: i18n.gettext('There is no price.It should be higher than 0.00!'),
            info: i18n.gettext('Price was successfully saved.')
        },
        retail_places_onoff: {
            error: i18n.gettext('An error occurred while changing price setting.'),
            info_1: i18n.gettext('Different product price for stores was switched on.'),
            info_2: i18n.gettext('Different product price for stores was switched off. Now only the basic price of the product is valid!')
        }
    },
    billing: {
        subs_pos_method: {
            error_1: i18n.gettext('Sorry! Payment method is not valid!')
        }
    }
});
