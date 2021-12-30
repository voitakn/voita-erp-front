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

const showSuccess = () => {
    document.getElementById('erp-verify').classList.add('d-none');
    document.getElementById('erp-error').classList.add('d-none');
    document.getElementById('erp-success').classList.remove('d-none');
    setTimeout(goToLogin, 4000);
}
const showError = () => {
    document.getElementById('erp-verify').classList.add('d-none');
    document.getElementById('erp-success').classList.add('d-none');
    document.getElementById('erp-error').classList.remove('d-none');
    setTimeout(goToMain, 4000);
}
const goToLogin = () => {
    document.location.href = '/auth/login.html';
}
const goToMain = () => {
    document.location.href = 'https://voita.org/';
}

class VoitaTranslate {
    constructor() {
        this.gtx('title', i18n.gettext('Voita APP - Email verification page'));
        this.gtx('#erp-verify .text-1', i18n.gettext('The process of verifying your email is in progress.'));
        this.gtx('#erp-verify .text-2', i18n.gettext('After a few seconds, you will be automatically redirected to the login page!'));
        this.gtx('#erp-success .text-1', i18n.gettext('Excellent! Verification of your email was successful.'));
        this.gtx('#erp-success .text-2', i18n.gettext('Thank you for choosing us!'));
        this.gtx('#erp-success .text-3', i18n.gettext('Now you can sign in to our application!'));
        this.gtx('#erp-success .link-1', i18n.gettext('Sign In'));

        this.gtx('#erp-error .text-1', i18n.gettext('Sorry, there was an error while verifying your email.'));
        this.gtx('#erp-error .text-2', i18n.gettext('Perhaps your credentials are missing or verification has already passed earlier.'));
        this.gtx('#erp-error .text-3', i18n.gettext('You can go to the authorisation page or visit our website.'));
        this.gtx('#erp-error .link-1', i18n.gettext('Sign In'));
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
    const token = params.get('email_token');
    if(token && token.length > 0) {
        postData('/api/confirm/email', {email_token: token}).then((result) => {
            if(result.success === true) {
                setTimeout(showSuccess, 4000);
            } else {
                setTimeout(showError, 4000);
            }
        });
    } else {
        goToLogin();
    }

    setTimeout(()=>{
        new VoitaTranslate();
    }, 500);

}