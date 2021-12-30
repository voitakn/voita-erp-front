Ext.define('Erp.view.company.edit.LogoEdit', {
	extend: 'Erp.base.ToolTip',
	xtype: 'logo_edit',
	reference: 'logo_edit',
	autoSize: true,
	session: true,
	align: 'l-r',
	listeners: {
		onCancel: 'onCancelLogo'
	},
	title: i18n.gettext('Edit Logo'),
	items: [
		{
			xtype: 'container',
			height: 220,
			width: 220,
			style: 'border-radius:50%; border: 1px solid #5ba1ca; margin-left: auto; margin-right: auto;',
			layout: 'center',
			items: [
				{
					xtype: 'draw',
					reference: 'canvas_preview',
					id: 'canvas_preview',
					width: 150,
					height: 150,
					tooltip: i18n.gettext('Preview Company Logo'),
					sprites: []
				}
			]
		},
		{
			xtype: 'container',
			margin: '15 0 0 0',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [
				{
					xtype: 'button',
					ui: 'alt decline',
					text: i18n.gettext('Clear Logo'),
					handler: 'onClearLogo',
				}
			]
		}
		,
		{
			xtype: 'container',
			reference: 'addFile',
			margin: '15 0 0 0',
			padding: '40',
			maxWidth: 350,
			html: i18n.gettext('Drag and drop the image here. Supported formats: jpeg, png, bmp. Size up to 2mb'),
			flex: 1,
			style: 'border: 3px dotted #999;',
		},
		{
			xtype: 'formpanel',
			reference: 'company_logo_form',
			margin: '15 0 0 0',
			items: [
				{
					xtype: 'filefield',
					name: 'logos_file',
					reference: 'company_logo_field',
					cls: 'size-8',
					clearable: true,
					flex: 1,
					accept: 'image',
					listeners: {
						change: 'logoFileSelect'
					}
				}
			]
		},
	],
	buttonAlign: 'center',
	buttons: [{
		xtype: 'button',
		iconCls: 'x-fa fa-times red',
		margin: '0 10',
		text: i18n.gettext('Cancel'),
		handler: 'onCancelLogo'
	},{
		xtype: 'button',
		iconCls: 'fi-save green-dark',
		margin: '0 10',
		text: i18n.gettext('Save'),
		handler: 'onSaveLogo'
	}]
});
