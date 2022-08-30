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
    header: 'Price',
    name: 'payment',
    type: 'number',
    helperText:
      'Define the default price of your NFTs in $FLOW tokens (this will get overwritten if you supply a `price` attribute in your CSV file in the next step)',
    placeholder: '10.0',
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
    placeholder: 'https://discord.gg/emeraldcity',
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
