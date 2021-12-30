Ext.define('Erp.Application', {
	extend: 'Ext.app.Application',
	name: 'Erp',
	requires: [
		'Ext.Ajax',
		'Ext.tip.Manager',
		'Ext.Toast',
		'Ext.ux.ajax.SimManager',
		'Ext.grid.rowedit.Plugin',
		'Ext.grid.plugin.PagingToolbar',
		'Ext.field.InputMask',
		'Ext.data.validator.*',
		'Erp.*'
	],
	defaultToken: 'dashboard',
	quickTips: true,
	mainView: 'Erp.view.main.Main',
	launch() {
		Ext.Date.firstDayOfWeek = 1;
		this.iniApp();
		this.removeSplash();
	},
	removeSplash() {
		Ext.getBody().removeCls('launching');
		const elem = document.getElementById('splash');
		elem.parentNode.removeChild(elem);
	},
	iniApp() {
		Ext.Ajax.on('beforerequest', (conn, options, eOpts) => {
			// For login from phone
			if(options.url === '/api/customer/login') {
				return true;
			}

			options.url = User.clusterApi(options.url);
			const authKey = localStorage.getItem('authKey');
			const authExp = localStorage.getItem('authExp');
			if(!authKey ||
				authKey === '' ||
				(Math.floor((new Date()).getTime() / 1000) > Number(authExp))) {
				User.cleanAuth();

				if (Ext.platformTags.desktop) {
					document.location.href = 'auth/login.html';
				} else {
					document.location.href = '#login';
				}
				return false;
			}
			if(!options.headers) {
				options.headers = {};
			}
			options.headers['Authorization'] = `Bearer ${authKey}`;
			if(!options.url) {
				return false;
			}
			return true;
		});
	}
});
