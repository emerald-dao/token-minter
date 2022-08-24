import { config } from '@onflow/fcl';
import { dappTitle } from '../lib/config/config';

config()
  .put('app.detail.title', dappTitle)
  .put('app.detail.icon', 'https://i.imgur.com/KSL4gq0.png')
  .put('accessNode.api', 'https://rest-testnet.onflow.org')
  .put('discovery.wallet', "https://fcl-discovery.onflow.org/testnet/authn")
  // .put('accessNode.api', 'http://localhost:8888')
  // .put('discovery.wallet', 'http://localhost:8701/fcl/authn')
