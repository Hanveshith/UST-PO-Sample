sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ust.po.sample.posample.controller.POData", {
        onInit() {
        },
                onCreate() {
    this.getOwnerComponent().getRouter().navTo("CreatePO");
},
        onPOHeaderPress: function (oEvent) {
            const oItem = oEvent.getSource();
            const oCtx = oItem.getBindingContext("poModel");

            const poId = oCtx.getProperty("po_id");

            this.getOwnerComponent()
                .getRouter()
                .navTo("POItems", {
                    po_id: poId
                });
        }

    });
});