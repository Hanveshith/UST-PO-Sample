const cds = require('@sap/cds');

module.exports = cds.service.impl( function () {
    const {Vendors, Materials} = this.entities;

    this.before(['CREATE'], Vendors, async (req) => {
        
    })
})