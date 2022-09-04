<script>
  import { purchaseRandomNFT } from "$flow/actions";

  import { NFTCard } from ".";

  export let metadatas;
  export let price;
  export let address;
  export let contractName;
  export let number;

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
  thumbnailURL={`https://nftstorage.link/ipfs/${metadatas[lotteryNumber].thumbnail.cid}/${metadatas[lotteryNumber].thumbnail.path}`}
  name={metadatas[lotteryNumber].name}
  description={metadatas[lotteryNumber].description}
  {price}
  buy={true}
  url={`/discover/${address}/${contractName}/${metadatas[lotteryNumber].metadataId}`}
  purchase={() => purchaseRandomNFT(price, contractName, address)}
  withLink={false} />
