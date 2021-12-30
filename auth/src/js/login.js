const loginForm = document.querySelector('#loginForm');
const erpEmailField = document.querySelector('#erpEmailField');
const erpPassField = document.querySelector('#erpPassField');
const erpBtnLogin = document.querySelector('#erpBtnLogin');
const loginFormError = document.querySelector('#loginFormError');
const testMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldsValid = {
    login: false,
    passwd: false
}
const fieldsData = {
    login: '',
    passwd: ''
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

const checkSubmit = () => {
    erpBtnLogin.disabled = true;
    if(fieldsValid.login && fieldsValid.passwd) {
        erpBtnLogin.disabled = false;
        return true;
    }
    return false;
}

const showError = () => {
    document.getElementById('erp-error').classList.remove('d-none');
}

const goToApp = () => {
    document.location.href = 'https://test.voitaerp.com/';
}

function onErpCaptcha(token){
    console.log('onErpSubmit', token);
    if(token && token.length > 0 && checkSubmit()) {
        sendErpForm(token);
    }
}

//const sendErpForm = (token) => {
const sendErpForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    //fieldsData.recapcha_key = token;
    postData('/api/customer/login', fieldsData).then((result) => {
        if(result.success === true) {
            if(result.data) {
                localStorage.setItem('authKey', result.data["authKey"]);
                localStorage.setItem('authExp', result.data["authExp"]);
                localStorage.setItem('cluster_id', result.data["cluster_id"]);
                document.location.href = '/';
            }
        } else {
            loginFormError.classList.remove('d-none');
            setTimeout(()=>{
                loginFormError.classList.add('d-none');
            }, 4000);
        }
    });
}

class VoitaTranslate {
    constructor() {
        this.gtx('title', i18n.gettext('Voita APP - Sign In page'));
        this.gtx('#erpBtnLogin', i18n.gettext('Sign In'));
        this.gtx('#loginFormError > div', i18n.gettext('Sorry, we could not find your credentials, please try again.'));
        this.gtx('.div-login-email > label', i18n.gettext('Login (Email)'));
        this.gtx('.div-login-email > .invalid-feedback', i18n.gettext('Please enter your email'));
        this.gtx('.div-login-passwd > label', i18n.gettext('Password'));
        this.gtx('.div-login-passwd > .invalid-feedback', i18n.gettext('Please enter your password'));
        this.gtx('.if-not-accaunt > span', i18n.gettext('Don’t have a Voita account?'));
        this.gtx('.if-not-accaunt > a', i18n.gettext('Sign Up'));
        this.gtx('.if-not-accaunt > .a-to-password', i18n.gettext('Forgot your password?'));
    }
    gtx(selector, text) {
        const elem = document.querySelector(selector);
        if(elem) {
            elem.innerHTML = text;
        }
    }
}

window.onload = () => {
    loginForm.addEventListener('submit', sendErpForm);
    erpBtnLogin.addEventListener('touchend', sendErpForm);

    erpPassField.onkeyup = (event) => {
        fieldsValid.passwd = false;
        fieldsData.passwd = '';
        let passw = event.target.value;
        if(!passw || passw.length < 8) {
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

    erpEmailField.onkeyup = (event) => {
        fieldsValid.login = false;
        fieldsData.login = '';
        if (!testMail.test(event.target.value)) {
            event.target.classList.add('is-invalid');
            event.target.classList.remove('is-valid');
        } else {
            event.target.classList.remove('is-invalid');
            event.target.classList.add('is-valid');
            fieldsValid.login = true;
            fieldsData.login = event.target.value;
        }
        checkSubmit();
    }

    setTimeout(()=>{
        new VoitaTranslate();
    }, 100);
}
