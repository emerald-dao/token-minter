import { config } from '@onflow/fcl';
import { dappTitle } from '$lib/config/config';

const resolver = async () => {
	const nonce = '7f190deedcd3b0538b7cd0ebc1994ed40d9db16cc1a6fcc3e7a994240c14d86d'
	return {
		appIdentifier: "Touchstone",
		nonce
	}
}

// EMULATOR
export const network = 'emulator';
const accessNode = 'http://127.0.0.1:8888';
const discoveryWallet = 'http://localhost:8701/fcl/authn';

// TESTNET
// export const network = 'testnet';
// const accessNode = 'https://rest-testnet.onflow.org';
// const discoveryWallet = 'https://fcl-discovery.onflow.org/testnet/authn';

// MAINNET
// export const network = 'mainnet';
// const accessNode = 'https://rest-mainnet.onflow.org';
// const discoveryWallet = 'https://fcl-discovery.onflow.org/authn';

config()
  .put('app.detail.title', dappTitle)
  .put('app.detail.icon', 'https://i.imgur.com/KSL4gq0.png')
  .put("fcl.accountProof.resolver", resolver)
  .put('flow.network', network)
  .put('accessNode.api', accessNode)
  .put('discovery.wallet', discoveryWallet);