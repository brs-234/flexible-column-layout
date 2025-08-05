sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.brs.fleixblecolumnlayout.controller.FirstColumn", {
        onInit() {
            this.bInital = true;
            this.sInitialPath = "";

            let oRouter = this.getOwnerComponent().getRouter();
            let oRoute  = oRouter.getRoute('RouteFirstColumn');
            oRoute.attachPatternMatched(this.onPatternMatched, this);

        },
        onPatternMatched: function(oEvent){
            let oArguments = oEvent.getParameters().arguments;
            if(oArguments['?query'] && oArguments['?query'].param){
                this.sInitialPath = decodeURIComponent(oArguments['?query'].param);
            }
        },
        // Setting First Product as default on inital load
        onDataReceived: function(oEvent){
            // let oFristItem = oEvent.getParameters().data.results[0]; // If selection mode = None

            let flexApp = this.getView().getParent().getParent();
            let stateModel = this.getOwnerComponent().getModel('state');

            const {bInitial, sInitialPath, sTablePath} = stateModel.getData();

            let oList = this.getView().byId('list');
            let oTable = flexApp.getCurrentMidColumnPage().byId('ordersTable');

            let aItems = oList.getItems();
            let oFirstItem = null;
            let oFirstItemOfDeatils = null;
            let sPath = '';
            if (aItems.length > 0 && bInitial){
                let fApp = this.getView().getParent().getParent();
                let detailPage = fApp.getCurrentBeginColumnPage();
                
                if(sInitialPath){
                    let aFliteredItems = aItems.filter((oItem) => oItem.getBindingContext().getPath() == sInitialPath)
                    if(aFliteredItems.length > 0){
                        oFirstItem = aFliteredItems[0];
                        sPath = sInitialPath;
                    }else{
                        oFirstItem = aItems[0];
                        sPath = oFirstItem.getBindingContext().getPath();
                    }
                }else{
                    oFirstItem = aItems[0];
                    sPath = oFirstItem.getBindingContext().getPath();
                }
                
                oList.setSelectedItem(oFirstItem);
                this.getView().bindElement({
                    path: sPath,
                    parameters: { expand: 'Order_Details, Category, Supplier' }
                });
                stateModel.bInitial = false;


                let oItems = oTable.getItems();
                if(oItems.length > 0){
                    let uiModelData = this.getOwnerComponent().getModel('ui').getData();
                    if(sTablePath && uiModelData.layout == 'ThreeColumnsMidExpanded'){

                        let aFliteredItems = oItems.filter((oItem) => oItem.getBindingContext().getPath() == sTablePath);
                        if(aFliteredItems.length > 0){
                            oFirstItemOfDeatils = aFliteredItems[0];
                            sPath = sTablePath;
                        }else{
                            oFirstItemOfDeatils = oItems[0];
                            sPath = oFirstItemOfDeatils.getBindingContext().getPath()
    
                        }
                    }else{
                        oFirstItemOfDeatils = oItems[0];
                        sPath = oFirstItemOfDeatils.getBindingContext().getPath();
                    }
                    this.getView().bindElement({
                        path:sPath
                    })
                    oTable.setSelectedItem(oFirstItemOfDeatils);
                }
                
              
         
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