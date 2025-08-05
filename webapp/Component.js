sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/brs/fleixblecolumnlayout/model/models",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/f/library",
    "sap/ui/model/json/JSONModel",
], (UIComponent, models,  FlexibleColumnLayoutSemanticHelper, library, JSONModel) => {
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


            let oModel = new JSONModel({bInitial:true, sInitialPath:"", sTablePath:""});
            oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
            this.setModel(oModel,"state")

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