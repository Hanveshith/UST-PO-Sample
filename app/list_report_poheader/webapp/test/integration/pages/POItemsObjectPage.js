sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ust.sample.po.listreportpoheader',
            componentId: 'POItemsObjectPage',
            contextPath: '/POHeaders/to_poitem'
        },
        CustomPageDefinitions
    );
});