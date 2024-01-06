import { collectionInfo } from '$stores/ContractStore';
import { collectionImage } from '$stores/ContractStore';
import { collectionBannerImage } from '$stores/ContractStore';
import { collectionSocials } from '$stores/ContractStore';

let collectionOptions = [
  {
    header: 'Collection Name',
    name: 'name',
    type: 'text',
    placeholder: 'My Awesome Collection',
    helperText: '',
    required: true,
    store: collectionInfo,
  },
  {
    header: 'Description',
    name: 'description',
    type: 'text',
    helperText: 'Provide a description for your project',
    placeholder: 'This is a super awesome example NFT Collection.',
    required: true,
    store: collectionInfo,
  },
  {
    header: 'Payment Type',
    name: 'paymentType',
    type: 'radio',
    helperText:
      'Select if you want to sell in $FLOW or $FUSD',
    placeholder: '$FLOW',
    required: true,
    radioOptions: [{ value: "$FLOW", image: "/flow-logo.png" }, { value: "$FUSD", image: "/fusd-logo.png" }],
    store: collectionInfo,
  },
  {
    header: 'Price',
    name: 'payment',
    type: 'number',
    helperText:
      'Define the default price of your NFTs in $FLOW or $FUSD tokens (this will get overwritten for an individual NFT if you supply a `price` attribute in your CSV file in the next step). Input 0 if you want them to be free.',
    placeholder: '10.0',
    required: true,
    store: collectionInfo,
  },
  {
    header: 'Square Image',
    name: 'image',
    type: 'image',
    helperText: 'Provide a square (main) image for your project',
    required: true,
    store: collectionImage,
  },
  {
    header: 'Banner Image',
    name: 'bannerImage',
    type: 'image',
    helperText: 'Provide a banner image for your project',
    required: false,
    store: collectionBannerImage,
  },
  {
    header: 'Website',
    name: 'website',
    type: 'text',
    helperText: 'A link to your main website',
    placeholder: 'https://ecdao.org',
    required: false,
    store: collectionSocials,
  },
  {
    header: 'Discord',
    name: 'discord',
    type: 'text',
    helperText: 'A link to your Discord community',
    placeholder: 'https://discord.com/invite/emerald-city-906264258189332541',
    required: false,
    store: collectionSocials,
  },
  {
    header: 'Twitter',
    name: 'twitter',
    type: 'text',
    helperText: 'A link to your Twitter',
    placeholder: 'https://twitter.com/emerald_dao',
    required: false,
    store: collectionSocials,
  },
];

export default collectionOptions;
