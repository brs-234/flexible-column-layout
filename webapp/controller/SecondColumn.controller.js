sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/brs/fleixblecolumnlayout/model/formatter"
], (Controller,formatter) => {
    "use strict"
    return Controller.extend("com.brs.fleixblecolumnlayout.controller.SecondColumn", {
        onInit:function(){
            let oRouter = this.getOwnerComponent().getRouter();
            let oRoute = oRouter.getRoute('RouteSecondColumn');
            oRoute.attachPatternMatched(this.onPatternMatched, this);
        },

        onPatternMatched:function(oEvent){
            let oArgument = oEvent.getParameters().arguments;
            let sPath = decodeURIComponent(oArgument.param);
          

            this.getView().bindElement({
                path: sPath,
                parameters: { expand: 'Order_Details, Category, Supplier' }
            });
         
        },
        navigateToOrder:function(oEvent){
            let oBindingContext = oEvent.getParameters().listItem.getBindingContext();
            let sPath = oBindingContext.getPath();
            let oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(2);
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('RouteThirdColumn',{
                param: encodeURIComponent(this.getView().getElementBinding().getPath()),
                param2: encodeURIComponent(sPath),
                query: {layout: oNextUIState.layout}
            });
        },
        formatter: formatter
    });
});