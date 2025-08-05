sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
], (BaseController, JSONModel) => {
  "use strict";

  return BaseController.extend("com.brs.fleixblecolumnlayout.controller.App", {
      onInit() {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRouteMatched(this.onRouterMatched, this);
        let data = new JSONModel({layout: "OneColumn"});
        this.getOwnerComponent().setModel(data,'ui');

   

        this.oFCL = this.getView().byId("fcl");

        
        
      },

      onRouterMatched:function(oEvent){
        let query = oEvent.getParameters().arguments["?query"];
        let sLayout = query != undefined ? query.layout : null;
        if(!sLayout) {
          let oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(0);
          sLayout = oNextUIState.layout
        }

        if(sLayout){
          this.getOwnerComponent().getModel('ui').setProperty('/layout',sLayout)
        }

        let oActionButtonsInfo = this.getOwnerComponent().getHelper().getCurrentUIState().actionButtonsInfo;
        this.getOwnerComponent().getModel("ui").setProperty("/actionButtonsInfo", oActionButtonsInfo);
        
      }
  });
});