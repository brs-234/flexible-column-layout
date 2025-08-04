sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.brs.fleixblecolumnlayout.controller.FirstColumn", {
        onInit() {
            // this.bInital = true;
            // this.sInitialPath = "";

            // let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // let oRoute  = oRouter.getRoute('RouteMaster');
            // oRoute.attachPatternMatched(this.onPatternMatched, this);

        },
        onPatternMatched: function(oEvent){
            // let oArguments = oEvent.getParameters().arguments;
            // if(oArguments['?query'] && oArguments['?query'].param){
            //     this.sInitialPath = decodeURIComponent(oArguments['?query'].param);
            // }
        },
        // Setting First Product as default on inital load
        onDataReceived: function(oEvent){
            // let oFristItem = oEvent.getParameters().data.results[0]; // If selection mode = None
            let oList = this.getView().byId('list');
            let aItems = oList.getItems();
            let oFirstItem = null;
            let sPath = '';
            if (aItems.length > 0 && this.bInital){
                let spiltApp = this.getView().getParent().getParent();
                let detailPage = spiltApp.getDetailPages()[0];
                
                if(this.sInitialPath){
                    let aFliteredItems = aItems.filter((oItem) => oItem.getBindingContext().getPath() == this.sInitialPath)
                    if(aFliteredItems.length > 0){
                        oFirstItem = aFliteredItems[0];
                        sPath = this.sInitialPath;
                    }else{
                        oFirstItem = aItems[0];
                        sPath = oFirstItem.getBindingContext().getPath();
                    }
                }else{
                    oFirstItem = aItems[0];
                    sPath = oFirstItem.getBindingContext().getPath();
                }
                
                
                oList.setSelectedItem(oFirstItem);
                detailPage.bindElement(sPath);
                this.bInital = false;
            }   
        },
        onRefreshList: function(){
            let oListBinding = this.getView().byId('list').getBinding('items');
            oListBinding.refresh();
        },
        onNavigation: function(oEvent){
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            let oBindingContext = oEvent.getParameters().listItem.getBindingContext();
            let oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1);
            // let oBject = oBindingContext.getObject();
            let sPath = oBindingContext.getPath();
            oRouter.navTo('RouteSecondColumn',{
                param:encodeURIComponent(sPath),
                query: {layout: oNextUIState.layout}
            })
        }
    });
});