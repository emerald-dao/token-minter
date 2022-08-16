let collectionOptions = [
  {
    name: 'Collection Name *',
    type: 'text',
    bindValue: 'name',
    placeholder: 'My Awesome Collection',
    helperText: '',
  },
  {
    name: 'Price *',
    type: 'number',
    bindValue: 'payment',
    helperText: 'Define the default price of your NFTs in $FLOW tokens (this will get overwritten if you supply a `price` attribute in your CSV file in the next step)',
    placeholder: '10.0',
  },
  {
    name: 'Description *',
    type: 'text',
    bindValue: 'description',
    helperText: 'Provide a description for your project',
    placeholder: 'This is a super awesome example NFT Collection.',
  },
  {
    name: 'Square Image *',
    type: 'file',
    bindValue: 'image',
    helperText: 'Provide a square (main) image for your project',
  },
  {
    name: 'Banner Image',
    type: 'file',
    bindValue: 'bannerImage',
    helperText: 'Provide a banner image for your project',
  },
  {
    name: 'Website',
    type: 'text',
    bindValue: 'website',
    helperText: 'A link to your main website',
    placeholder: 'https://ecdao.org',
  },
  {
    name: 'Discord',
    type: 'text',
    bindValue: 'discord',
    helperText: 'A link to your Discord community',
    placeholder: 'https://discord.gg/emeraldcity',
  },
  {
    name: 'Twitter',
    type: 'text',
    bindValue: 'twitter',
    helperText: 'A link to your Twitter',
    placeholder: 'https://twitter.com/emerald_dao',
  },
];

export default collectionOptions;
