sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend(
        "ust.po.sample.posample.controller.MaterialDetail",
        {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter
                    .getRoute("MaterialDetail")
                    .attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                const sMaterialId =
                    oEvent.getParameter("arguments").materialId;

                const oView = this.getView();
                const oModel = oView.getModel();

                console.log(oView, oModel);
                const sPath = oModel.createKey("/Materials", {
                    mm_id: sMaterialId
                });

                oView.bindElement({
                    path: sPath
                });
            }
        }
    );
});
