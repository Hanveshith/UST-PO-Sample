sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"ust/po/sample/list/vendor/listreportvendor/test/integration/pages/VendorsList",
	"ust/po/sample/list/vendor/listreportvendor/test/integration/pages/VendorsObjectPage"
], function (JourneyRunner, VendorsList, VendorsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('ust/po/sample/list/vendor/listreportvendor') + '/test/flp.html#app-preview',
        pages: {
			onTheVendorsList: VendorsList,
			onTheVendorsObjectPage: VendorsObjectPage
        },
        async: true
    });

    return runner;
});

