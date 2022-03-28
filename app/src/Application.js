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
		this.initApp();
		this.removeSplash();
	},
	removeSplash() {
		Ext.getBody().removeCls('launching');
		const elem = document.getElementById('splash');
		elem.parentNode.removeChild(elem);
	},
	initApp() {
		Ext.Ajax.on('beforerequest', (conn, options, eOpts) => {
			//console.log('beforerequest', conn);
			const token = Ext.util.Cookies.get("GP_SSID");
			const cluster = Ext.util.Cookies.get("VT_ID");
			// For login from phone
			/*if(options.url === '/api/customer/login') {
				return true;
			}*/

			options.url = User.clusterApi(options.url, cluster);
			if(!token ||
				token === '' ) {
				document.location.href = Ext.mainCfg.authUrl;
				return false;
			}
			if(!options.headers) {
				options.headers = {};
			}
			options.headers['Authorization'] = `Bearer ${token}`;
			if(!options.url) {
				return false;
			}
			return true;
		});
	}
});
