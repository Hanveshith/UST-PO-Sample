using InvoiceService as service from '../../srv/inv-service';
annotate service.InvoiceHeaders with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : inv_header_invnumber,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_vendor,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_refpo,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_gr,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_date,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_postdate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'inv_header_cuky_cuky',
                Value : inv_header_cuky_cuky,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_totalamt_before,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_status,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_taxamt,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_total_amount,
            },
            {
                $Type : 'UI.DataField',
                Value : inv_header_reason_rejection,
            },
            {
                $Type : 'UI.DataField',
                Label : 'inv_header_aspect_postedat',
                Value : inv_header_aspect_postedat,
            },
            {
                $Type : 'UI.DataField',
                Label : 'inv_header_aspect_postedby',
                Value : inv_header_aspect_postedby,
            },
            {
                $Type : 'UI.DataField',
                Label : 'inv_header_aspect_verifiedat',
                Value : inv_header_aspect_verifiedat,
            },
            {
                $Type : 'UI.DataField',
                Label : 'inv_header_aspect_verifiedby',
                Value : inv_header_aspect_verifiedby,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : inv_header_invnumber,
        },
        {
            $Type : 'UI.DataField',
            Value : inv_header_vendor,
        },
        {
            $Type : 'UI.DataField',
            Value : inv_header_refpo,
        },
        {
            $Type : 'UI.DataField',
            Value : inv_header_gr,
        },
        {
            $Type : 'UI.DataField',
            Value : inv_header_date,
        },
    ],
);

