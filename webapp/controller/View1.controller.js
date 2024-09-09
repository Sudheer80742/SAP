sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/ui/model/Filter","sap/ui/model/FilterOperator"
], function (Controller, JSONModel,MessageToast,Filter,FilterOperator) {
    "use strict";
 
    return Controller.extend("project6.controller.View1", {
        onInit: function () {
            var oModel = new JSONModel("/model/Emp.json");
            this.getView().setModel(oModel);  
        },
        onSelectChange: function (oEvent) {
            this._sSelectedKey = oEvent.getSource().getSelectedKey();
            this._iSelectedIndex = oEvent.getSource().getSelectedIndex();
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            this.oSelectedItem = oData.Emp[this._iSelectedIndex];
        },
        async onAdd() {
            this.oDialog??=await this.loadFragment({
                name:"project6.fragments.add"
            });

            this.oDialog.open();
        },
 
        onAddItem: function () {
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            var sNewName = this.byId("inputName1").getValue();
            var sNewId = this.byId("inputId1").getValue();
            var sNewSal = this.byId("inputSal1").getValue();
            var oReInput=this.byId("inputName1");
            var oReId=this.byId("inputId1");
            var oReSal=this.byId("inputSal1");
            // Ensure name and ID are provided
            if (sNewName && sNewId) {
                var newEntry = {
                    name: sNewName,
                    id: sNewId,
                    salary:sNewSal
                };
                oData.Emp.push(newEntry);
                oModel.setData(oData);
                oReInput.setValue("")
                oReId.setValue("");
                oReSal.setValue("")
                this.byId("cls").close();
                MessageToast.show("Item added successfully.");
                
            } else {
                MessageToast.show("Please provide both name and ID.");
            }
        },
 
        onDelete: function () {
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            if (this._iSelectedIndex !== undefined && oData.Emp[this._iSelectedIndex]) {
                oData.Emp.splice(this._iSelectedIndex, 1);
                oModel.setData(oData);
                MessageToast.show("Item deleted successfully.");
            } else {
                MessageToast.show("Please select an item to delete.");
            }
        },
        async onModi(){
            this.oDai??=await this.loadFragment({
                name:"project6.fragments.modify"
            })
            this.oDai.open()
            this.getView().byId("inputName").setValue(this.oSelectedItem.name);
            this.getView().byId("inputId").setValue(this.oSelectedItem.id);
            this.getView().byId("inputSal").setValue(this.oSelectedItem.salary);
        },
        onModify: function () {
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            if (this._iSelectedIndex !== undefined && oData.Emp[this._iSelectedIndex]) {
                var sNewName = this.byId("inputName").getValue();
                var sNewId = this.byId("inputId").getValue();
                var sNewSal = this.byId("inputSal").getValue();
                var sReIn=this.byId("inputName");
                var sReId=this.byId("inputId");
                var oReSal=this.byId("inputSal");
                // Update the selected item's data
                if (sNewName && sNewId) {
                    oData.Emp[this._iSelectedIndex].name = sNewName;
                    oData.Emp[this._iSelectedIndex].id = sNewId;
                    oModel.setData(oData);
                    sReIn.setValue("");
                    sReId.setValue("");
                    oReSal.setValue("");
                    MessageToast.show("Item modified successfully.");
                } else {
                    MessageToast.show("Please provide both name and ID.");
                }
            } else {
                MessageToast.show("Please select an item to modify.");
            }
        },
        onClose(){
            this.byId("cls").close();
        },
        onClos(){
            this.byId("clo").close();
        }
        ,
        onNext:function(){
            var oRoute=this.getOwnerComponent().getRouter();
            oRoute.navTo("RouteView2");
        },
        async onTab(){
            this.oDail??=await this.loadFragment({
                name:"project6.fragments.table"
            });
            this.oDail.open();
        },
        onClotab(){
            this.byId("clos").close();
        },
       async onEditItem(oEvent) {
            this.oDia1??=await this.loadFragment({
                name:"project6.fragments.edit"
            })
            var oPressedItem = oEvent.getSource();
            var oContext = oPressedItem.getBindingContext();
            var oSelectedData = oContext.getObject();
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            this.iIndex1=oData.Emp.indexOf(oSelectedData);
            this.oDia1.open();
            this.byId("inputName3").setValue(oData.Emp[this.iIndex1].name)
            this.byId("inputId3").setValue(oData.Emp[this.iIndex1].id)
            this.byId("inputSal3").setValue(oData.Emp[this.iIndex1].salary)
        },
        onClose1(){
            this.byId("cl").close();
        },
        onEdit(){
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
                var sNewName = this.byId("inputName3").getValue();
                var sNewId = this.byId("inputId3").getValue();
                var sNewSal = this.byId("inputSal3").getValue();
                var sReIn=this.byId("inputName3");
                var sReId=this.byId("inputId3");
                var sReSal=this.byId("inputSal3");
                if (sNewName && sNewId) {
                    oData.Emp[this.iIndex1].name = sNewName;
                    oData.Emp[this.iIndex1].id = sNewId;
                    oData.Emp[this.iIndex1].salary = sNewSal;
                    oModel.setData(oData);
                    sReIn.setValue("");
                    sReId.setValue("");
                    sReSal.setValue("")
                    MessageToast.show("Item modified successfully.");
                } else {
                    MessageToast.show("Please provide both name and ID.");
                }
            
            
        }
        ,
        onDeleteItem: function (oEvent) {
            var oPressedItem = oEvent.getSource();
            var oContext = oPressedItem.getBindingContext();
            var oSelectedData = oContext.getObject();
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            var iIndex = oData.Emp.indexOf(oSelectedData);
            if (iIndex !== -1) {
                oData.Emp.splice(iIndex, 1);
                oModel.setData(oData);
                MessageToast.show("Item deleted successfully.");
            }
        },
        onSearchEmp(oEvent){
            const oArr=[];
            const sQuery=oEvent.getParameter("query")
            if(sQuery){
                oArr.push(new Filter("name",FilterOperator.Contains,sQuery));
            }
            var oList=this.byId("nameTable");
            var oBinding=oList.getBinding("items");
            oBinding.filter(oArr);
        },
    });
});