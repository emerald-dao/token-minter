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
    name: 'Description',
    type: 'text',
    bindValue: 'description',
    helperText: 'Provide a description for your project',
  },
  {
    name: 'Image',
    type: 'file',
    bindValue: 'imageHash',
    helperText: 'Provide an image for your project',
  },
];

export default collectionOptions;
