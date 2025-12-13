sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ust.po.sample.posample.controller.MasterData", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        materialToPoItem: function (oEvent) {
            const oCtx = oEvent.getSource().getBindingContext();
            const sMaterialId = oCtx.getProperty("mm_id");
            console.log(sMaterialId);
            this.oRouter.navTo("MaterialDetail", {
                materialId: sMaterialId
            });
        }

    });
});