sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/brs/fleixblecolumnlayout/model/models",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/f/library"
], (UIComponent, models,  FlexibleColumnLayoutSemanticHelper, library) => {
    "use strict";
    
    var LayoutType = library.LayoutType;
    return UIComponent.extend("com.brs.fleixblecolumnlayout.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            console.log(library);
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        },

        getHelper:function(){
            let oFCL = this.getRootControl().byId('fcl');
            let oParams = new URLSearchParams(window.location.search);
            let oSettings = {
                defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
                defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
                maxColumnsCount: oParams.get("max")
            }

            return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
        }
    });
});