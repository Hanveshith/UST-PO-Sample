sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (BaseController, MessageToast, MessageBox) => {
    "use strict";

    return BaseController.extend("ust.po.sample.posample.controller.App",
        {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter
                    .getRoute("POItems")
                    .attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {

                const poId = oEvent.getParameter("arguments").po_id;

                const oView = this.getView();
                const oModel = this.getOwnerComponent().getModel("poModel");

                // 1️⃣ Try DRAFT first
                const sDraftPath = oModel.createKey("/POHeaders", {
                    po_id: poId,
                    IsActiveEntity: false
                });

                oView.bindElement({
                    path: sDraftPath,
                    model: "poModel",
                    parameters: {
                        expand: "to_poitem"
                    },
                    events: {
                        // 🔑 If draft NOT found → fallback to ACTIVE
                        dataRequested: function () { },
                        dataReceived: function (oEvent) {

                            if (oEvent.getParameter("data")) {
                                // ✅ Draft exists → keep binding
                                return;
                            }

                            // 2️⃣ Fallback to ACTIVE
                            const sActivePath = oModel.createKey("/POHeaders", {
                                po_id: poId,
                                IsActiveEntity: true
                            });

                            oView.bindElement({
                                path: sActivePath,
                                model: "poModel",
                                parameters: {
                                    expand: "to_poitem"
                                }
                            });
                        }
                    }
                });
            },
            onActivate: function () {

                const oView = this.getView();
                const oModel = this.getOwnerComponent().getModel("poModel");
                const oContext = oView.getBindingContext("poModel");

                if (!oContext) {
                    sap.m.MessageToast.show("No draft context found");
                    return;
                }

                const oObject = oContext.getObject();

                // 🔑 V2 adapter expects parameters, NOT a bound context
                oModel.callFunction("/POHeaders_draftActivate", {
                    method: "POST",
                    urlParameters: {
                        po_id: oObject.po_id,
                        IsActiveEntity: false
                    },
                    success: function () {
                        sap.m.MessageToast.show("PO Activated");
                    },
                    error: function (oError) {
                        const oOError = JSON.parse(oError.responseText);
                        const sMessage = oOError?.error?.message?.value;

                        console.log("message:", sMessage);
                        // console.error(oError);
                        sap.m.MessageToast.show("Activation failed");
                        sap.m.MessageToast.show(sMessage)
                    }
                });
            },
            onDelete: function () {

                const oView = this.getView();
                const oContext = oView.getBindingContext("poModel");

                if (!oContext) {
                    sap.m.MessageToast.show("No Purchase Order context");
                    return;
                }

                const oModel = this.getOwnerComponent().getModel("poModel");
                const sPath = oContext.getPath(); // 🔑 includes IsActiveEntity

                sap.m.MessageBox.confirm(
                    "Are you sure you want to delete this Purchase Order?",
                    {
                        actions: ["Delete", "Cancel"],
                        emphasizedAction: "Delete",
                        onClose: (sAction) => {
                            if (sAction === "Delete") {

                                oModel.remove(sPath, {
                                    success: () => {
                                        sap.m.MessageToast.show("Purchase Order deleted");

                                        // Navigate back to list
                                        this.getOwnerComponent()
                                            .getRouter()
                                            .navTo("POHeaders");
                                    },
                                    error: (oError) => {
                                        console.error(oError);
                                        sap.m.MessageToast.show("Delete failed");
                                    }
                                });
                            }
                        }
                    }
                );
            }


        });
});

