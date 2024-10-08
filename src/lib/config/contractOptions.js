let contractOptions = [
  {
    name: 'Minting starts active',
    bindValue: 'startMinting'
  },
  {
    name: 'Lottery buying (user purchases unknown NFT)',
    bindValue: 'lotteryBuying'
  },
  {
    name: 'Royalty (primary sales)',
    bindValue: 'royalty',
    withDouble: true,
    firstPlaceholder: '0x5643fd47a29770e7',
    secondPlaceholder: '0.25'
  }
];

export default contractOptions;
