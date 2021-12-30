const passTest = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\._])(?=.{8,})");
const testMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const erpCountry = document.querySelector('#erpCountry');
const erpCountryName = document.querySelector('#erpCountryName');
const erpCountryTextDiv = document.querySelector('#erpCountryTextDiv');
const registerForm = document.querySelector('#registerForm');
const erpEmail = document.querySelector('#erpEmail');
const erpPassField = document.querySelector('#erpPassField');
const erpPassFieldCheck = document.querySelector('#erpPassFieldCheck');
const erpBtnRegister = document.querySelector('#erpBtnRegister');
const acceptPrivatPolicy = document.querySelector('#acceptPrivatPolicy');
const erpYear = document.querySelector('#erp-year');
const modalRegisterTrue = new bootstrap.Modal(document.getElementById('modalRegisterTrue'), {
    keyboard: false
});
const modalRegisterFalse = new bootstrap.Modal(document.getElementById('modalRegisterFalse'), {
    keyboard: false
});
const modalPolicy = new bootstrap.Modal(document.getElementById('modalPolicy'), {
    keyboard: false
});

let country_search_id = 2;
const fieldsValid = {
    email: false,
    passwd: false,
    passwd2: false,
    country: false,
    policy: false
}
const fieldsData = {
    email: '',
    passwd: '',
    country_id: '',
    configs: {
        country_new: ''
    }
}

async function erpFetch(url = '', method = 'GET', data = {}) {
    const response = await fetch(url);
    return await response.json();
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

function onErpSubmit(token){
    console.log('onErpSubmit', token);
    if(token && token.length > 0 && checkSubmit()) {
        sendErpForm(token);
    }
    return false;
}

const appParams = () => {
    const a = btoa(`${appv}-${fieldsData.email[3]}.${fieldsData.passwd[5]}%${fieldsData.country_id}`);
    return a;
}

const sendErpForm = (token) => {
    //event.preventDefault();
    //event.stopPropagation();
    fieldsData.configs.country_new = erpCountryName.value;
    fieldsData.recapcha_key = token;
    fieldsData.lng = i18n.getNavLocale();
    postData('/api/customer/create', fieldsData).then((result) => {
        if (result.success === true) {
            modalRegisterTrue.show();
            erpEmail.value = "";
            erpPassField.value = "";
            erpPassFieldCheck.value = "";
            fieldsData.email = "";
            fieldsData.passwd = "";
            fieldsValid.email = false;
            fieldsValid.passwd = false;
            fieldsValid.passwd2 = false;
            fieldsValid.policy = false;
            erpCountry.classList.remove('is-invalid');
            erpCountry.classList.remove('is-valid');
            erpEmail.classList.remove('is-invalid');
            erpEmail.classList.remove('is-valid');
            erpPassField.classList.remove('is-invalid');
            erpPassField.classList.remove('is-valid');
            erpPassFieldCheck.classList.remove('is-invalid');
            erpPassFieldCheck.classList.remove('is-valid');
            acceptPrivatPolicy.checked = false;
            registerForm.classList.remove('was-validated');
            setTimeout(() => {
                window.location.href = "/auth/login.html"
            }, 5000);
        } else {
            modalRegisterFalse.show();
        }
    });
}

const checkSubmit = () => {
    erpBtnRegister.disabled = true;
    if(fieldsValid.email && fieldsValid.passwd && fieldsValid.passwd2 && fieldsValid.country&& fieldsValid.policy) {
        erpBtnRegister.disabled = false;
        return true;
    }
    return false;
}

class VoitaTranslate {
    constructor() {
        this.gtx('title', i18n.gettext('Voita APP - Create new account'));
        this.gtx('.lets-do-account', i18n.gettext('Let`s create your account'));
        this.gtx('.div-register-country > label', i18n.gettext('Choose country *'));
        this.gtx('.div-register-country > .invalid-feedback', i18n.gettext('To register, choose a country from the list'));
        this.gtx('.div-register-country-name > label', i18n.gettext('Country name *'));
        this.gtx('.div-register-country-name > .invalid-feedback', i18n.gettext('Please enter your country name'));
        this.gtx('.div-register-email > label', i18n.gettext('Email address *'));
        this.gtx('.div-register-email > .invalid-feedback', i18n.gettext('Please enter a valid email address'));
        this.gtx('.div-register-pass > label', i18n.gettext('Create a password *'));
        this.gtx('.div-register-pass > .invalid-feedback', i18n.gettext('Password is not strong enough'));
        this.gtx('.div-register-pass2 > label', i18n.gettext('Repeat password *'));
        this.gtx('.div-register-pass2 > .invalid-feedback', i18n.gettext('Password and verification password are not the same'));
        this.gtx('.div-register-pass-rule', i18n.gettext('The password must have at least 8 characters of the Latin alphabet, and contain a lowercase, uppercase, number, and any of the following characters'));
        this.gtx('.div-register-agree', i18n.gettext('I agree to the'));
        this.gtx('.appruve-policy', i18n.gettext('privacy policy'));
        this.gtx('.div-register-submit', i18n.gettext('Sign Up for FREE'));
        this.gtx('.div-register-have-acc', i18n.gettext('Do you already have an account?'));
        this.gtx('.div-register-have-acc2', i18n.gettext('Go to'));
        this.gtx('.link-sing-in', i18n.gettext('Sign In'));
        this.gtx('.div-register-voita-app', i18n.gettext('Voita APP for POS selling and B2B'));
        this.gtx('.line-gray', i18n.gettext('Manage your purchases and supplies'));
        this.gtx('.line-green', i18n.gettext('Manage your POS and selling of products and services'));
        this.gtx('.line-orange', i18n.gettext('Manage your expenses and profits'));
        this.gtx('.line-blue', i18n.gettext('Manage your stock and movement of goods'));

        this.gtx('#modalRegisterTrue .modal-title', i18n.gettext('Successful registration'));
        this.gtx('#modalRegisterTrue .lng-line-1', i18n.gettext('Your account has been successfully created!'));
        this.gtx('#modalRegisterTrue .lng-line-2', i18n.gettext('We have sent you an email with a link to activate your account.'));
        this.gtx('#modalRegisterTrue .lng-line-3', i18n.gettext('Thank you for choosing our service!'));
        this.gtx('#modalRegisterTrue .lng-btn', i18n.gettext('Close'));

        this.gtx('#modalRegisterFalse .modal-title', i18n.gettext('Registration error'));
        this.gtx('#modalRegisterFalse .lng-line-1', i18n.gettext('An error occurred during registration!'));
        this.gtx('#modalRegisterFalse .lng-line-2', i18n.gettext('Please check all fields of the registration form and try again!'));
        this.gtx('#modalRegisterFalse .lng-btn', i18n.gettext('Close'));
    }
    gtx(selector, text) {
        const elem = document.querySelector(selector);
        if(elem) {
            elem.innerHTML = text;
        }
    }
}


window.onload = () => {
    const params = (new URL(document.location)).searchParams;
    const country_def = params.get('country_id');
    if(country_def && Number(country_def) > 0) {
        country_search_id = Number(country_def);
    }

    erpYear.innerHTML = new Date().getFullYear();

    checkSubmit();
    acceptPrivatPolicy.addEventListener('change', event => {
        fieldsValid.policy = event.target.checked;
        checkSubmit();
    });

    erpCountry.addEventListener('change', (event) => {
        const sele = event.target;
        fieldsValid.country = false;
        fieldsData.country_id = sele.value;
        erpCountryName.value = '';
        if (sele.value > 0) {
            fieldsValid.country = true;
            erpCountryName.value = sele.options[sele.selectedIndex].text;
            erpCountryTextDiv.classList.add('d-none');
        } else {
            fieldsValid.country = false;
            erpCountryTextDiv.classList.remove('d-none');
            erpCountryName.focus();
        }
        checkSubmit();
    });
    erpFetch('/api/com/countries').then((result) => {
        if (result && result.data && result.data.length > 0) {
            result.data.forEach((row, key) => {
                let country_orig = "";
                if (row.country_orig === "") {
                    let country_orig = ""
                } else {
                    country_orig = `(${row.country_orig})`
                }
                // if SPAIN
                if (Number(row.id) === country_search_id) {
                    erpCountry[key] = new Option(`${row.country_en} ${country_orig}`, row.id, true, true);
                    fieldsValid.country = true;
                    fieldsData.country_id = row.id;
                } else {
                    erpCountry[key] = new Option(`${row.country_en} ${country_orig}`, row.id, false, false);
                }
            });
        }
    });
    erpPassField.onkeyup = (event) => {
        fieldsValid.passwd = false;
        fieldsData.passwd = '';
        if (!passTest.test(event.target.value)) {
            event.target.classList.add('is-invalid');
            event.target.classList.remove('is-valid');
        } else {
            event.target.classList.remove('is-invalid');
            event.target.classList.add('is-valid');
            fieldsValid.passwd = true;
            fieldsData.passwd = event.target.value;
        }
        checkSubmit();
    }
    erpPassField.onblur = (event) => {
        fieldsValid.passwd2 = false;
        if (erpPassFieldCheck.value !== event.target.value) {
            erpPassFieldCheck.classList.add('is-invalid');
            erpPassFieldCheck.classList.remove('is-valid');
        } else {
            if (erpPassFieldCheck.value !== '') {
                erpPassFieldCheck.classList.add('is-valid');
                erpPassFieldCheck.classList.remove('is-invalid');
                fieldsValid.passwd2 = true;
            } else {
                erpPassFieldCheck.classList.remove('is-valid');
                erpPassFieldCheck.classList.remove('is-invalid');
            }
        }
        checkSubmit();
    }
    erpPassFieldCheck.onkeyup = (event) => {
        fieldsValid.passwd2 = false;
        if (erpPassField.value !== event.target.value) {
            event.target.classList.add('is-invalid');
            event.target.classList.remove('is-valid');
        } else {
            if (event.target.value !== '') {
                event.target.classList.add('is-valid');
                event.target.classList.remove('is-invalid');
                fieldsValid.passwd2 = true;
            } else {
                event.target.classList.remove('is-valid');
                event.target.classList.remove('is-invalid');
            }
        }
        checkSubmit();
    }
    erpEmail.onkeyup = (event) => {
        fieldsValid.email = false;
        fieldsData.email = '';
        if (!testMail.test(event.target.value)) {
            event.target.classList.add('is-invalid');
            event.target.classList.remove('is-valid');
        } else {
            event.target.classList.remove('is-invalid');
            event.target.classList.add('is-valid');
            fieldsValid.email = true;
            fieldsData.email = event.target.value;
        }
        checkSubmit();
    }
    erpCountryName.onkeyup = (event) => {
        fieldsValid.country = false;
        if (event.target.value.length > 1) {
            event.target.classList.remove('is-invalid');
            event.target.classList.add('is-valid');
            fieldsValid.country = true;
            fieldsData.configs.country_new = event.target.value;
        } else {
            event.target.classList.add('is-invalid');
            event.target.classList.remove('is-valid');
        }
        checkSubmit();
    }
    erpCountryName.onblur = (event) => {
        fieldsValid.country = false;
        if (event.target.value.length > 1) {
            event.target.classList.remove('is-invalid');
            event.target.classList.add('is-valid');
            fieldsValid.country = true;
            fieldsData.configs.country_new = event.target.value;
        } else {
            event.target.classList.add('is-invalid');
            event.target.classList.remove('is-valid');
        }
        checkSubmit();
    }

    document.querySelector('a.appruve-policy').addEventListener('click', event => {
        event.preventDefault();
        modalPolicy.show();
    });
    document.querySelector('a.appruve-policy').addEventListener('touchend', event => {
        event.preventDefault();
        modalPolicy.show();
    });

    setTimeout(()=>{
        new VoitaTranslate();
    }, 1000);
};