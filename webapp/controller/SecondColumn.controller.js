sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/brs/fleixblecolumnlayout/model/formatter"
], (Controller,formatter) => {
    "use strict"
    return Controller.extend("com.brs.fleixblecolumnlayout.controller.SecondColumn", {
        onInit:function(){
            

            let oRouter = this.getOwnerComponent().getRouter();
            let oRoute = oRouter.getRoute('RouteSecondColumn');
            let otRoute = oRouter.getRoute('RouteThirdColumn');
            oRoute.attachPatternMatched(this.onPatternMatched, this);
            otRoute.attachPatternMatched(this.onPatternMatched, this);
        },

        onPatternMatched:function(oEvent){
            let stateModel = this.getOwnerComponent().getModel('state');
            let oArgument = oEvent.getParameters().arguments;
            let sPath = decodeURIComponent(oArgument.param);
          
            if(oArgument && oArgument.param){
                this.sInitialPath = decodeURIComponent(oArgument.param);
                stateModel.setProperty('/sInitialPath',this.sInitialPath);
            }

            if(oArgument && oArgument.param2){
                stateModel.setProperty('/sTablePath', decodeURIComponent(oArgument.param2))
            }

            this.getView().bindElement({
                path: sPath,
                parameters: { expand: 'Order_Details, Category, Supplier' }
            });
         
        },
        handleFullScreen:function(oEvent){
            let sNextLayout = this.getOwnerComponent().getModel('ui').getProperty("/actionButtonsInfo/midColumn/fullScreen");
            this.getOwnerComponent().getRouter().navTo("RouteSecondColumn",{
                param: encodeURIComponent(this.getView().getElementBinding().getPath),
                query: {layout: sNextLayout}
            })
        },
        handleExitFullScreen:function(oEvent){

        },
        handleClose: function(oEvent){

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