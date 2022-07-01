import { config } from '@onflow/fcl';
import { dappTitle } from '../lib/config/config';

config()
  .put('app.detail.title', dappTitle)
  .put('app.detail.icon', 'https://fcl-discovery.onflow.org/images/blocto.png')
  .put('accessNode.api', 'https://rest-testnet.onflow.org')
  .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn')
