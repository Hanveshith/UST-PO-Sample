sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ust.po.sample.list.invoice.posampleinvoice',
            componentId: 'InvoiceHeadersObjectPage',
            contextPath: '/InvoiceHeaders'
        },
        CustomPageDefinitions
    );
});