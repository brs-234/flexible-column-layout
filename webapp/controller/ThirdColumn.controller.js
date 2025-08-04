sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/brs/fleixblecolumnlayout/model/formatter"
], (Controller,formatter) => {
        "use strict"
        return Controller.extend("com.brs.fleixblecolumnlayout.controller.ThirdColumn", {
            
            onInit:function(){
                let oRouter = this.getOwnerComponent().getRouter();
                let oRoute = oRouter.getRoute('RouteThirdColumn');
                oRoute.attachPatternMatched(this.onPatternMatched, this);
            },
            onPatternMatched: function(oEvent){
                let oArgument = oEvent.getParameters().arguments;
                let sPath = decodeURIComponent(oArgument.param2);
                // this.getView().bindElement({
                //     path:sPath,
                //     parameters: {expand:'Supplier'}
                // });
    
                this.getView().bindElement({
                    path: sPath,
                    parameters: { expand: 'Order_Details, Category, Supplier' }
                });
             
            }    

        });

})
