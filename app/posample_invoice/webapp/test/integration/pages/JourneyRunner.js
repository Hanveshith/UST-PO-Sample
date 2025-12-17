sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"ust/po/sample/list/invoice/posampleinvoice/test/integration/pages/InvoiceHeadersList",
	"ust/po/sample/list/invoice/posampleinvoice/test/integration/pages/InvoiceHeadersObjectPage",
	"ust/po/sample/list/invoice/posampleinvoice/test/integration/pages/InvoiceItemsObjectPage"
], function (JourneyRunner, InvoiceHeadersList, InvoiceHeadersObjectPage, InvoiceItemsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('ust/po/sample/list/invoice/posampleinvoice') + '/test/flp.html#app-preview',
        pages: {
			onTheInvoiceHeadersList: InvoiceHeadersList,
			onTheInvoiceHeadersObjectPage: InvoiceHeadersObjectPage,
			onTheInvoiceItemsObjectPage: InvoiceItemsObjectPage
        },
        async: true
    });

    return runner;
});

