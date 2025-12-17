sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"ust/sample/po/listreportpoheader/test/integration/pages/POHeadersList",
	"ust/sample/po/listreportpoheader/test/integration/pages/POHeadersObjectPage",
	"ust/sample/po/listreportpoheader/test/integration/pages/POItemsObjectPage"
], function (JourneyRunner, POHeadersList, POHeadersObjectPage, POItemsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('ust/sample/po/listreportpoheader') + '/test/flp.html#app-preview',
        pages: {
			onThePOHeadersList: POHeadersList,
			onThePOHeadersObjectPage: POHeadersObjectPage,
			onThePOItemsObjectPage: POItemsObjectPage
        },
        async: true
    });

    return runner;
});

