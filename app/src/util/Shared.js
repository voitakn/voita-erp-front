Ext.define('Erp.util.Shared', {
	alternateClassName: ['Shared'],
	singleton: true,
	log: function(msg) {
		console.log(msg);
	},
	downscaleImage(dataUrl, newWidth, imageType, imageArguments) {
		"use strict";
		var image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;
		// Provide default values
		imageType = imageType || "image/png";
		imageArguments = imageArguments || 0.7;

		// Create a temporary image so that we can compute the height of the downscaled image.
		image = new Image();
		image.src = dataUrl;
		oldWidth = image.width;
		oldHeight = image.height;
		newHeight = Math.floor(oldHeight / oldWidth * newWidth)

		// Create a temporary canvas to draw the downscaled image on.
		canvas = document.createElement("canvas");
		canvas.width = newWidth;
		canvas.height = newHeight;

		// Draw the downscaled image on the canvas and return the new data URL.
		ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0, newWidth, newHeight);
		newDataUrl = canvas.toDataURL(imageType, imageArguments);
		return newDataUrl;
	}
});