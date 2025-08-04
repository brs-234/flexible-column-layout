/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/brs/fleixblecolumnlayout/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
