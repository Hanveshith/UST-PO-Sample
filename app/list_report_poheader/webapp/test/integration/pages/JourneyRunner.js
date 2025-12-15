sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"ust/po/sample/list/poheader/listreportpoheader/test/integration/pages/POHeadersList",
	"ust/po/sample/list/poheader/listreportpoheader/test/integration/pages/POHeadersObjectPage",
	"ust/po/sample/list/poheader/listreportpoheader/test/integration/pages/POItemsObjectPage"
], function (JourneyRunner, POHeadersList, POHeadersObjectPage, POItemsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('ust/po/sample/list/poheader/listreportpoheader') + '/test/flp.html#app-preview',
        pages: {
			onThePOHeadersList: POHeadersList,
			onThePOHeadersObjectPage: POHeadersObjectPage,
			onThePOItemsObjectPage: POItemsObjectPage
        },
        async: true
    });

    return runner;
});

