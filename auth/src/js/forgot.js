const recoveryForm = document.querySelector('#recoveryForm');
const recoverySuccess = document.querySelector('#recoverySuccess');
const erpEmailRecoveryField = document.querySelector('#erpEmailRecoveryField');
const erpBtnRecovery = document.querySelector('#erpBtnRecovery');
const recoveryFormError = document.querySelector('#recoveryFormError');
const testMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldsValid = {
	email: false,
}
const fieldsData = {
	email: ''
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
	erpBtnRecovery.disabled = true;
	if(fieldsValid.email) {
		erpBtnRecovery.disabled = false;
		return true;
	}
	return false;
}
const sendErpRecoveryForm = (event) => {
	event.preventDefault();
	event.stopPropagation();
	fieldsData.lng = i18n.getNavLocale();
	postData('/api/recover/passwd', fieldsData).then((result) => {
		if(result.success === true) {
			recoveryForm.classList.add('d-none');
			document.querySelector('.info').classList.add('d-none');
			recoverySuccess.classList.remove('d-none');
			setTimeout(()=>{
				goToLogin();
			}, 5000);
		} else {
			recoveryFormError.classList.remove('d-none');
			setTimeout(()=>{
				recoveryFormError.classList.add('d-none');
			}, 4000);
		}
	});
}
const goToLogin = () => {
	document.location.href = '/auth/login.html';
}
class VoitaTranslate {
	constructor() {
		this.gtx('title', i18n.gettext('Voita APP - Recovery password page'));
		this.gtx('.info', i18n.gettext('Enter your email address to recover your password'));
		this.gtx('#recoveryFormError > div', i18n.gettext('Sorry, we could not find your credentials, please try again'));
		this.gtx('.div-recovery-email > label', i18n.gettext('Enter your email'));
		this.gtx('.div-recovery-email > .invalid-feedback', i18n.gettext('Please enter valid email'));
		this.gtx('button#erpBtnRecovery', i18n.gettext('Recovery Password'));
		this.gtx('#recoverySuccess .div', i18n.gettext('We have sent a letter to your email with instructions to reset your password. Please check your email.'));
	}
	gtx(selector, text) {
		const elem = document.querySelector(selector);
		if(elem) {
			elem.innerHTML = text;
		}
	}
}
window.onload = () => {
	recoveryForm.addEventListener('submit', sendErpRecoveryForm);
	erpBtnRecovery.addEventListener('touchend', sendErpRecoveryForm);
	erpEmailRecoveryField.onkeyup = (event) => {
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
	
	setTimeout(()=>{
		new VoitaTranslate();
	}, 1000);
}
