/*global QUnit*/

sap.ui.define([
	"com/brs/fleixblecolumnlayout/controller/FirstColumn.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FirstColumn Controller");

	QUnit.test("I should test the FirstColumn controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
