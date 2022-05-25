let contractOptions = [
  {
    name: 'Reduce deployment costs',
    bindValue: 'reduceDeployment',
    type: 'simple',
  },
  {
    name: 'Multimint',
    bindValue: 'multimint',
    type: 'withNumber',
  },
  {
    name: 'Minting limit per wallet',
    bindValue: 'minting-limit',
    type: 'withNumber',
  },
  {
    name: 'Mintic specific ids',
    bindValue: 'mint-specific-ids',
    type: 'simple',
  },
  {
    name: 'Require access token',
    bindValue: 'require-access-token',
    type: 'simple',
  },
  {
    name: 'Only the owner can mint',
    bindValue: 'only-owner',
    type: 'simple',
  },
  {
    name: 'Enumerable',
    bindValue: 'enumerable',
    type: 'simple',
  },
  {
    name: 'Minting starts active',
    bindValue: 'start-active',
    type: 'simple',
  },
  {
    name: 'Approval proxy',
    bindValue: 'proxy',
    type: 'simple',
  },
  {
    name: 'Set toke URIs individually',
    bindValue: 'set-token-uris',
    type: 'simple',
  },
];

export default contractOptions;
