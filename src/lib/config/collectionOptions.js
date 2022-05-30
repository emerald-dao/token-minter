let collectionOptions = [
  {
    name: 'Collection Name',
    type: 'text',
    bindValue: 'name',
    placeholder: 'Your Awesome Collection',
    // validation: [string(), required()],
    helperText: '',
  },
  {
    name: 'Price',
    type: 'number',
    bindValue: 'payment',
    helperText: 'Define the price of each NFT in Flow tokens',
  },
  {
    name: 'Max Supply',
    type: 'number',
    bindValue: 'maxSupply',
    helperText: 'Define the maximum of NFTs that can be minted in your collection',
  },
];

export default collectionOptions;
