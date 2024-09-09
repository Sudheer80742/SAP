sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project6.controller.View2", {
        onInit: function () {
            var oModel = new JSONModel("/model/Emp.json");
            this.getView().setModel(oModel,"oData");
        },

        onDeleteSelected: function () {
            var oModel = this.getView().getModel("oData");
            var oData = oModel.getData();
            var oList = this.byId("itemList");
            var aItems = oList.getItems();
            var aIndicesToDelete = [];

            // Collect indices of selected items
            aItems.forEach(function (oItem, index) {
                var oCheckBox = oItem.getContent()[0].getItems()[0]; // CheckBox is the first item in VBox
                if (oCheckBox.getSelected()) {
                    aIndicesToDelete.push(index);
                }
            });

            // Remove selected items from the data
            for (var i = aIndicesToDelete.length - 1; i >= 0; i--) {
                oData.Emp.splice(aIndicesToDelete[i], 1);
            }

            // Update the model
            oModel.setData(oData);
            MessageToast.show("Selected items deleted successfully.");
        }
    });
});
