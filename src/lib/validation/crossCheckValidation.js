// Validation that runs once both files are dropped and independently validated
//
// If validation is succesful => return true
// If validation is not succesful => return an object with the error message AND an array of errors

export const crossCheckValidation = (parsedCsv, csvMetadata, imagesFiles) => {
  const attributes = parsedCsv[0];
  const OK = 1,
    NOK = -1;
  let ipfs_keys = ['image'];
  if (attributes.includes('thumbnail')) ipfs_keys.push('thumbnail');
  let file_xcheck = imagesFiles.reduce((a, f) => {
    a[f.name] = NOK;
    return a;
  }, {});

  //---- check for errors in metadata: metadata w/ no file (ghosts)
  let metadata = csvMetadata;
  let errs = [];
  for (const nft_name of Object.keys(metadata)) {
    let nft = metadata[nft_name];
    for (const required_ipfs_file of ipfs_keys) {
      if (file_xcheck[nft[required_ipfs_file]]) {
        file_xcheck[nft[required_ipfs_file]] = OK; // mark the file as referenced
      } else {
        let msg = nft[required_ipfs_file] ? 'FILE NOT FOUND' : 'NO FILE REFERENCED';
        errs.push(`WARNING: ${msg} for item: ${nft.name}.${required_ipfs_file}`);
      }
    }
  }

  for (const filename in file_xcheck) {
    // check for files w/ no metadata (orphans)
    if (file_xcheck[filename] < 0) {
      errs.push(`WARNING: Asset file not referenced by any NFT: ${filename}`);
    }
  }

  if (errs.length === 0) {
    return true;
  } else {
    console.log(errs);
    return {
      error: 'The images and the CSV do not match',
      errs: errs,
    };
  }
};
