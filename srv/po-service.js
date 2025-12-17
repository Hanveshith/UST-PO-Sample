const cds = require('@sap/cds');
const { SELECT, UPDATE } = cds.ql;

module.exports = cds.service.impl(function () {

  const { POHeaders } = this.entities;

  const CODE_REGEX = /^[A-Za-z]{2,3}[0-9]*$/;
  const CURR_REGEX = /^[A-Z]{3}$/;
  const VEN_REGEX = /^[A-Z]{3,10}$/;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* =====================================================
     HEADER VALIDATIONS (CREATE & UPDATE)
     ===================================================== */
  this.before(['CREATE', 'UPDATE'], POHeaders, async (req) => {

    const {
      po_number,
      vendor,
      po_coco,
      po_org,
      po_curr_cuky,
      po_doc_date,
      po_delivery_date,
      po_payment_terms_vendor,
      po_payment_terms_vendor_date,
      po_approved_po_approvedby,
      po_approved_po_approvedat
    } = req.data;

    const tx = cds.tx(req);

    /* -------------------------------
       CREATE-ONLY VALIDATIONS
       ------------------------------- */
    if (req.event === 'CREATE') {

      // approval fields must never be set manually
      if (po_approved_po_approvedby || po_approved_po_approvedat) {
        req.error(400, 'Approval fields are system controlled');
      }

      // duplicate PO number check (draft-safe)
      if (po_number) {
        const exists = await tx.run(
          SELECT.one.from(POHeaders).where({ po_number })
        );
        if (exists) {
          req.error(400, 'PO Number already exists');
        }
      }

      // system defaults
      req.data.po_status = 'draft';
      req.data.po_doc_date = new Date();
    }

    /* -------------------------------
       UPDATE-ONLY VALIDATIONS
       ------------------------------- */
    if (req.event === 'UPDATE') {

      const current = await tx.run(
        SELECT.one
          .from(POHeaders)
          .columns(['po_status'])
          .where({ po_id: req.data.po_id })
      );

      if (current && ['approved', 'submitted'].includes(
        current.po_status?.toLowerCase()
      )) {
        req.error(`${current.po_status} PO cannot be updated`);
      }
    }

    /* -------------------------------
       COMMON FIELD VALIDATIONS
       ------------------------------- */

    if (vendor && !CODE_REGEX.test(vendor)) {
      req.error('Vendor Code must start with 2–3 alphabets');
    }

    if (po_coco && !CODE_REGEX.test(po_coco)) {
      req.error('Company Code must start with 2–3 alphabets');
    }

    if (po_org && !CODE_REGEX.test(po_org)) {
      req.error('Purchasing Org must start with 2–3 alphabets');
    }

    if (po_curr_cuky && !CURR_REGEX.test(po_curr_cuky)) {
      req.error('Currency must be exactly 3 capital letters');
    }

    if (po_doc_date && new Date(po_doc_date) > today) {
      req.error('Document Date cannot be in the future');
    }

    if (po_delivery_date && new Date(po_delivery_date) < today) {
      req.error('Delivery Date cannot be in the past');
    }

    if (po_payment_terms_vendor && !VEN_REGEX.test(po_payment_terms_vendor)) {
      req.error('Payment Terms must be 3–10 uppercase letters');
    }

    if (
      req.event === 'CREATE' &&
      req.context?.event !== 'draftActivate' &&
      (po_approved_po_approvedby || po_approved_po_approvedat)
    ) {
      req.error(400, 'Approval fields are system controlled');
    }

  });

  /* =====================================================
     SUBMIT ACTION
     ===================================================== */
  this.on('Submit', async (req) => {

    const { po_id } = req.params[0];
    const tx = cds.tx(req);

    const po = await tx.run(
      SELECT.one
        .from(POHeaders)
        .columns(['po_status', 'po_total_value'])
        .where({ po_id })
    );

    if (!po) req.error('PO not found');

    if (['approved', 'submitted'].includes(po.po_status)) {
      req.error(`Already ${po.po_status}`);
    }

    const nextStatus =
      po.po_total_value <= 50000 ? 'approved' : 'submitted';

    return tx.run(
      UPDATE(POHeaders)
        .set({ po_status: nextStatus })
        .where({ po_id })
    );
  });

  /* =====================================================
     APPROVE ACTION
     ===================================================== */
  this.on('Approve', async (req) => {

    const { po_id } = req.params[0];
    const tx = cds.tx(req);

    const po = await tx.run(
      SELECT.one
        .from(POHeaders)
        .columns(['po_status'])
        .where({ po_id })
    );

    if (!po) req.error('PO not found');

    if (po.po_status === 'approved') {
      req.error('PO already approved');
    }

    return tx.run(
      UPDATE(POHeaders)
        .set({ po_status: 'approved' })
        .where({ po_id })
    );
  });

});
