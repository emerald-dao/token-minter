// Validation that runs once both files are dropped and independently validated
//
// If validation is succesful => return true
// If validation is not succesful => return an object with the error

// TODO: implement cross check validation
export const crossCheckValidation = (parsedCsv, imageFiles) => {
	const attributes = parsedCsv[0];
	const OK = 1, NOK = -1;
	let ipfs_keys = ['image'];
	if (attributes.includes('thumbnail')) ipfs_keys.push('thumbnail');
	let file_xcheck = imageFiles.reduce((a, f) => {
		a[f.name] = NOK;
		return a;
	}, {});

	//---- check for errors in metadata: metadata w/ no file (ghosts)
	let errs = parsedCsv.slice(1).reduce((a, nft) => {
		for (const k of ipfs_keys) {
			if (file_xcheck[nft[k]]) {
				file_xcheck[nft[k]] = OK;  // mark the file as referenced
			} else {
				let msg = nft[k] ? 'FILE NOT FOUND' : 'NO FILE REFERENCED';
				a.push(`WARNING: ${msg} for item: ${nft.name}.${k}`);
			}
		}
		return a;
	}, []);

	for (const fn in fileStats) {   // check for files w/ no metadata (orphans)
		if (fileStats[fn] < 0) {
			errs.push(`WARNING: Asset file not referenced by any NFT: ${k}`);
		}
	}

	if (errs.length === 0) {
		return true;
	} else {
		return {
			error: 'The images and the CSV do not match',
			errs: errs
		};
	}

};
