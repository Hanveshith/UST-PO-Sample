sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'ust.sample.po.listreportpoheader',
            componentId: 'POHeadersList',
            contextPath: '/POHeaders'
        },
        CustomPageDefinitions
    );
});