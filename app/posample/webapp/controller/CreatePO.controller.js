sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("ust.po.sample.posample.controller.CreatePO", {

        onInit: function () {
            const oModel = new sap.ui.model.json.JSONModel({
                po_number: "",
                po_vm_id: "",
                vendor: "",
                po_coco: "N/A",
                po_org: "N/A",
                po_curr_cuky: "USD",
                po_doc_date: null,
                po_delivery_date: null
            });
            this.getView().setModel(oModel, "poCreateModel");
        },

        onSave: function () {

            const oData = this.getView()
                .getModel("poCreateModel")
                .getData();

            const oODataModel = this
                .getOwnerComponent()
                .getModel("poModel");

            oODataModel.create("/POHeaders", {
                ...oData,
                IsActiveEntity: false   // draft
            }, {
                success: (oCreated) => {

                    MessageToast.show("Purchase Order created (Draft)");

                    // 🔑 Get created PO ID
                    const poId = oCreated.po_id;

                    // 🔑 Navigate to PO Object Page
                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("POItems", {
                            po_id: poId
                        });
                },
                error: function (oError) {
                    MessageToast.show("Creation failed");
                    console.error(oError);
                }
            });
        },

        onNavBack: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("POHeaders");
        }
    });
});
