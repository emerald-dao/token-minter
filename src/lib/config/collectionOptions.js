let collectionOptions = [
  {
    name: 'Collection Name',
    type: 'text',
    bindValue: 'name',
    placeholder: 'My Awesome Collection',
    // validation: [string(), required()],
    helperText: '',
  },
  {
    name: 'Price',
    type: 'number',
    bindValue: 'payment',
    helperText: 'Define the price of each NFT in Flow tokens',
    placeholder: '10.0'
  },
  {
    name: 'Description',
    type: 'text',
    bindValue: 'description',
    helperText: 'Provide a description for your project',
    placeholder: 'This is a super awesome example NFT Collection.'
  },
  {
    name: 'Image',
    type: 'file',
    bindValue: 'image',
    helperText: 'Provide an image for your project',
  },
];

export default collectionOptions;
