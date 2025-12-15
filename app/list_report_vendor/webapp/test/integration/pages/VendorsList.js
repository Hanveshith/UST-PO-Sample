sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'ust.po.sample.list.vendor.listreportvendor',
            componentId: 'VendorsList',
            contextPath: '/Vendors'
        },
        CustomPageDefinitions
    );
});