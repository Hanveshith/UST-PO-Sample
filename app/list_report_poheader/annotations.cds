using POService as service from '../../srv/po-service';

annotate service.POHeaders with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: po_number,
            },
            {
                $Type: 'UI.DataField',
                Value: po_vm_id,
                Label: 'Vendor'
            },
            {
                $Type: 'UI.DataField',
                Value: vendor,
            },
            {
                $Type: 'UI.DataField',
                Value: po_coco,
            },
            {
                $Type: 'UI.DataField',
                Value: po_org,
            },
            {
                $Type: 'UI.DataField',
                Label: 'po_curr_cuky',
                Value: po_curr_cuky,
            },
            {
                $Type: 'UI.DataField',
                Value: po_doc_date,
            },
            {
                $Type: 'UI.DataField',
                Value: po_delivery_date,
            },
            {
                $Type: 'UI.DataField',
                Label: 'po_payment_terms_vendor',
                Value: po_payment_terms_vendor,
            },
            {
                $Type: 'UI.DataField',
                Label: 'po_payment_terms_vendor_date',
                Value: po_payment_terms_vendor_date,
            },
            {
                $Type: 'UI.DataField',
                Value: po_total_value,
            },
            {
                $Type: 'UI.DataField',
                Value: po_status,
            },
            {
                $Type: 'UI.DataField',
                Value: po_remarks,
            },
            {
                $Type: 'UI.DataField',
                Label: 'po_approved_po_approvedby',
                Value: po_approved_po_approvedby,
            },
            {
                $Type: 'UI.DataField',
                Label: 'po_approved_po_approvedat',
                Value: po_approved_po_approvedat,
            },
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
    },
    // {
    //     $Type: 'UI.ReferenceFacet',
    //     Label: 'Items',
    //     Target: 'to_poitem/@UI.LineItem'
    // }
     ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Value: po_number,
        },
        {
            $Type: 'UI.DataField',
            Value: vendor,
        },

        {
            $Type: 'UI.DataField',
            Value: po_coco,
        },
        {
            $Type: 'UI.DataField',
            Value: po_org,
        },
        {
            $Type: 'UI.DataField',
            Label: 'po_curr_cuky',
            Value: po_curr_cuky,
        },
    ],
);

// annotate service.POItems with @(
//     UI.LineItem: [
//     {
//         $Type : 'UI.DataField',
//         Value : po_lineitem_number,
//         Label : 'Item ID',
//     },
//     {
//         $Type : 'UI.DataField',
//         Value : po_item_materials,
//         Label : 'Material Code',
//     },
//     {
//         $Type : 'UI.DataField',
//         Value : po_item_materialsdesc,
//         Label : 'Material Description',
//     },
//     {
//         $Type : 'UI.DataField',
//         Value : po_item_quan,
//         Label : 'Quantity',
//     },
//     {
//         $Type : 'UI.DataField',
//         Value : po_item_status,
//         Label : 'Status',
//     }
// ],

// UI.FieldGroup #POItems : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_id,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_lineitem_number,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_material_id,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_materials,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_materialsdesc,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_quan_order_quan,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_received_quan,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_open_quan,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_netprice,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_netprice_value,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_netprice_value2,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : po_item_discount,
//             },
//         ],
//     },

//     UI.Facets : [
//         {
//             $Type : 'UI.ReferenceFacet',
//             Label : 'Items',
//             Target : '@UI.FieldGroup#POItems',
//         }
//     ],
// );


