const cds = require('@sap/cds');
const { UPDATE, SELECT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(function () {
    const { POHeaders, POItems } = this.entities;
    const CODE_REGEX = /^[A-Za-z]{2,3}[0-9]*$/;
    const CURR_REGEX = /^[A-Z]{3}$/;
    const VEN_REGEX = /^[A-Z]{3,10}$/
    const now = new Date();

    this.before(['CREATE','UPDATE'], POHeaders, async (req) => {
        // console.log(req.data);
        try {

            const { po_number, vendor, po_coco, po_org, po_curr_cuky, po_doc_date, po_delivery_date, po_payment_terms_vendor, po_payment_terms_vendor_date, po_approved_po_approvedby, po_approved_po_approvedat } = req.data;
            const tx = cds.tx(req);

            const requiredFields = await tx.run(SELECT.from(POHeaders).columns(['po_status','po_number']).where({ po_number: po_number }));
    
            console.log(req.event, requiredFields)
            if(req.event === 'UPDATE'){
                if(requiredFields[0].po_status === 'Approved' || requiredFields[0].po_status === 'Approved'){
                    req.error({
                        message: `${requiredFields[0].po_status} cannot be updated`
                    })
                    // return
                }
            }
            if(req.event === 'CREATE'){
                if (requiredFields[0].po_number === po_number) {
                    req.error({ status: 400, message: "The PO Number already exists" })
                }
            }

            if (vendor && !CODE_REGEX.test(vendor)) {
                req.error({
                    message: 'Vendor Code must start with 2 or 3 alphabets'
                });
            }

            if (po_coco && !CODE_REGEX.test(po_coco)) {
                req.error({
                    message: 'Company Code must start with 2 or 3 alphabets'
                });
            }

            if (po_org && !CODE_REGEX.test(po_org)) {
                req.error({
                    message: 'Purchasing Org must start with 2 or 3 alphabets'
                });
            }

            if (po_curr_cuky && !CURR_REGEX.test(po_curr_cuky)) {
                req.error({
                    message: 'Currency field should be of only three alpha characters'
                })
            }

            if (po_doc_date && new Date(po_doc_date) > now) {
                req.error({
                    message: 'Document Date cannot be in future.'
                })
            }

            if (po_delivery_date && new Date(po_delivery_date) < now) {
                req.error({
                    message: 'Document Date cannot be in past'
                })
            }

            if (po_payment_terms_vendor && !VEN_REGEX.test(po_payment_terms_vendor)) {
                req.error({
                    message: 'Must be greater than three characters'
                })
            }

            if (po_payment_terms_vendor_date && new Date(po_payment_terms_vendor_date) < now) {
                req.error({
                    message: 'Payment date cannot be in past'
                })
            }

            if(req.event === 'CREATE'){
                if (po_approved_po_approvedby || po_approved_po_approvedat) {
                    req.error({
                        status: 400,
                        message: 'Approval fields are system-controlled and cannot be set during creation'
                    });
                }
                req.data.po_status = 'draft';
                req.data.po_doc_date = new Date();
            }
        } catch (e) {
            console.log(e);
        }
    })

    this.on('Submit', async (req) => {
        try {

            // console.log(req.params);
            const { po_id } = req.params[0];
            // console.log(po_id)
            const tx = cds.tx(req);
            const recordFields = await tx.run((SELECT.from(POHeaders).columns(['po_status', 'po_total_value'])).where({ po_id: po_id }));
            // console.log(recordFields);
            if (recordFields[0].po_status === 'approved' || recordFields[0].po_status === 'submitted') {
                return req.error({ message: `Already ${recordFields[0].po_status}` })
            }
            if (recordFields[0].po_total_value <= 50000) {
                const result = await tx.run(UPDATE.entity(POHeaders).set({ po_status: 'approved' }).where({ po_id: po_id }));
                return result;
            } else {
                console.log("Notification sent to Approver");
                const result = await tx.run(UPDATE.entity(POHeaders).set({ po_status: 'submitted' }).where({ po_id: po_id }));
                return result;
            }
        } catch (e) {
            console.log(e);
        }
    })

    this.on('Approve', async (req) => {
        try {

            // console.log(req.params);
            const { po_id } = req.params[0];
            // console.log(po_id)
            const tx = cds.tx(req);
            const recordFields = await tx.run((SELECT.from(POHeaders).columns(['po_status', 'po_total_value'])).where({ po_id: po_id }));
            // console.log(recordFields);
            if (recordFields[0].po_status === 'approved') {
                return req.error({ message: `Already ${recordFields[0].po_status}` })
            }
            const result = await tx.run(UPDATE.entity(POHeaders).set({ po_status: 'approved' }).where({ po_id: po_id }));
            return result;
        } catch (e) {
            console.log(e);
        }
    })
})