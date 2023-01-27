<!-- <script>
  import { purchaseRandomNFT } from "$flow/actions";

  import { NFTCard } from ".";

  export let metadatas;
  export let price;
  export let address;
  export let contractName;
  export let number;
  export let paymentType;

  let lotteryNumber = 0;
  let clear;
  $: {
    clearInterval(clear);
    clear = setInterval(incr, 1000);
  }

  const incr = () => {
    if (lotteryNumber < number - 1) {
      lotteryNumber++;
    } else {
      lotteryNumber = 0;
    }
  };
</script>

<NFTCard
  thumbnailURL={metadatas[lotteryNumber].thumbnail
    ? `https://nftstorage.link/ipfs/${metadatas[lotteryNumber].thumbnail.cid}/${metadatas[lotteryNumber].thumbnail.path}`
    : `https://nftstorage.link/ipfs/${metadatas[lotteryNumber].image.cid}/${metadatas[lotteryNumber].image.path}`}
  name={metadatas[lotteryNumber].name}
  description={metadatas[lotteryNumber].description}
  {price}
  {paymentType}
  buy={true}
  url={`/discover/${address}/${contractName}/${metadatas[lotteryNumber].metadataId}`}
  purchase={() => purchaseRandomNFT(price, contractName, address, paymentType)}
  withLink={false} /> -->
