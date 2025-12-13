sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ust.po.sample.posample.controller.Default", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        toMasterData : function(){
            console.log("1. Clicked")
            this.oRouter.navTo("MasterData");
        },
        toPoData : function(){
            console.log("2. Clicked");
            this.oRouter.navTo("POData");
        },
        toGRData : function(){
            console.log("3. Clicked");
            this.oRouter.navTo("GRData");
        },
        toINVData : function(){
            console.log("4. Clicked");
            this.oRouter.navTo("INVData");
        },
        toAuditLogs : function(){
            console.log("5. Clicked");
            this.oRouter.navTo("AuditLogs");
        },
    });
});