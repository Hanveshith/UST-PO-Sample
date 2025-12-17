using {po.ust as ust} from '../db/schema';

@path: '/po'
service POService{

  @Common.Label: 'Purchase Order Header'
  @(odata.draft.enabled: true)
  @restrict: [
    {grant : ['UPDATE'], to: 'Approver'},
    {grant : ['READ','WRITE'], to: 'Buyer'}
  ]
  entity POHeaders as
    projection on ust.poheader {
      *,
      to_poitem
    }
    actions {
      action Submit() returns 
        POHeaders
      ;
      action Approve() returns
        POHeaders
      ;
    };

  @Common.Label: 'Purchase Order Items'
  entity POItems   as projection on ust.poitem;
}
