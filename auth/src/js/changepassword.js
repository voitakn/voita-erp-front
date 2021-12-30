async function postData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return await response.json();
}
const params = (new URL(document.location)).searchParams;
const token = params.get('token_passwd');
const changeForm = document.querySelector('#changeForm');
const erpNewPasswordField = document.querySelector('#erpNewPasswordField');
const erpRetypeNewPasswordField = document.querySelector('#erpRetypeNewPasswordField');
const erpBtnChange = document.querySelector('#erpBtnChange');
const changeFormError = document.querySelector('#changeFormError');
const changeSuccess = document.querySelector('#changeSuccess');
const changeErrorToken = document.querySelector('#changeErrorToken');
const erpError = document.querySelector('#erp-error');
const testPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\._])(?=.{8,})/;
const fieldsValid = {
	newPassword: '',
	newRetypePassword: ''
}
const fieldsData = {
	token_passwd: token,
	new_passwd: ''
}
const checkSubmit = () => {
	erpBtnChange.disabled = true;
	if(fieldsValid.newPassword === fieldsValid.newRetypePassword) {
		erpBtnChange.disabled = false;
		return true;
	}
	return false;
}
const goToLogin = () => {
	document.location.href = '/auth/login.html';
}
const showSuccess = () => {
	changeForm.classList.add('d-none');
	changeSuccess.classList.remove('d-none');
	setTimeout(goToLogin, 4000);
}
const errorToken = () => {
	changeForm.classList.add('d-none');
	changeErrorToken.classList.remove('d-none');
	setTimeout(goToLogin, 4000);
}
class VoitaTranslate {
	constructor() {
		this.gtx('title', i18n.gettext('Voita APP - Change password page'));
		this.gtx('.invalid-feedback', i18n.gettext('Please enter a valid password'));
		this.gtx('#erp-error', i18n.gettext('The passwords entered are different'));
	}
	gtx(selector, text) {
		const elem = document.querySelector(selector);
		if(elem) {
			elem.innerHTML = text;
		}
	}
}
const sendErpChangeForm = (event) => {
	event.preventDefault();
	event.stopPropagation();
	postData('/api/recover/new_passwd', fieldsData).then((result) => {
		if(result.success === true) {
			document.querySelector('.info').classList.add('d-none');
			showSuccess();
		} else {
			errorToken();
		}
	});
}
window.onload = () => {
	if (token && token.length > 0) {
		postData('/api/recover/token_check', {token_passwd: token}).then((result) => {
			if (result.success === true) {
				changeForm.classList.remove('d-none');
				document.querySelector('.email').classList.remove('d-none');
				let recoveryLogin = document.querySelector('.login');
				recoveryLogin.innerHTML = result.data.login;
				changeForm.addEventListener('submit', sendErpChangeForm);
				erpBtnChange.addEventListener('touchend', sendErpChangeForm);
				erpNewPasswordField.onkeyup = (event) => {
					fieldsValid.newPassword = '';
					fieldsData.new_passwd = '';
					if (!testPassword.test(event.target.value)) {
						event.target.classList.add('is-invalid');
						event.target.classList.remove('is-valid');
					} else {
						event.target.classList.remove('is-invalid');
						event.target.classList.add('is-valid');
						fieldsValid.newPassword = event.target.value;
						fieldsData.new_passwd = event.target.value;
						if (!(fieldsValid.newRetypePassword === fieldsValid.newPassword)) {
							erpError.classList.remove('d-none');
						} else {
							erpError.classList.add('d-none');
						}
					}
					checkSubmit();
				}
				erpRetypeNewPasswordField.onkeyup = (event) => {
					fieldsValid.newRetypePassword = '';
					if (!testPassword.test(event.target.value)) {
						event.target.classList.add('is-invalid');
						event.target.classList.remove('is-valid');
					} else {
						fieldsValid.newRetypePassword = event.target.value;
						if (!(fieldsValid.newRetypePassword === fieldsValid.newPassword)) {
							erpError.classList.remove('d-none');
						} else {
							event.target.classList.remove('is-invalid');
							event.target.classList.add('is-valid');
							erpError.classList.add('d-none');
						}
					}
					checkSubmit();
				}
			} else {
				errorToken();
			}
		});
	}   else {
		goToLogin();
	}
	setTimeout(() => {
		new VoitaTranslate();
	}, 500);
}