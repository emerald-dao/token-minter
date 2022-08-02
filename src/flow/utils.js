import { get } from 'svelte/store';
import { addresses } from './stores';
import * as fcl from '@onflow/fcl';

export const resolveAddressObject = async (lookup) => {
  let answer = {
    resolvedNames: {
      find: "",
      fn: ""
    },
    address: ""
  };
  let rootLookup = lookup.split('.')[0];
  try {
    if (rootLookup.length === 18 && rootLookup.substring(0, 2) === '0x') {
      answer.address = lookup;
      answer.resolvedNames.find = await fcl.query({
        cadence: `
        import FIND from ${get(addresses).FIND}
        pub fun main(address: Address): String? {
            let name = FIND.reverseLookup(address)
            return name?.concat(".find")
        }
        `,
        args: (arg, t) => [
          arg(lookup, t.Address)
        ]
      });

      answer.resolvedNames.fn = await fcl.query({
        cadence: `
        import Domains from ${get(addresses).FN}
      
        pub fun main(address: Address): String? {
    
          let account = getAccount(address)
          let collectionCap = account.getCapability<&{Domains.CollectionPublic}>(Domains.CollectionPublicPath) 
      
          if collectionCap.check() != true {
            return nil
          }
      
          var flownsName = ""
          let collection = collectionCap.borrow()!
          let ids = collection.getIDs()
          
          for id in ids {
            let domain = collection.borrowDomain(id: id)!
            let isDefault = domain.getText(key: "isDefault")
            flownsName = domain.getDomainName()
            if isDefault == "true" {
              break
            }
          }
      
          return flownsName
        }
        `,
        args: (arg, t) => [
          arg(lookup, t.Address)
        ]
      });
    } else if (lookup.includes('.find')) {
      answer.resolvedNames.find = lookup;
      answer.address = await fcl.query({
        cadence: `
        import FIND from ${get(addresses).FIND}
  
        pub fun main(name: String): Address?  {
          return FIND.lookupAddress(name)
        }
        `,
        args: (arg, t) => [
          arg(rootLookup, t.String)
        ]
      })
    } else if (lookup.includes('.fn')) {
      answer.resolvedNames.fn = lookup;
      answer.address = await fcl.query({
        cadence: `
        import Flowns from ${get(addresses).FN}
        import Domains from ${get(addresses).FN}
        pub fun main(name: String): Address? {
          
          let prefix = "0x"
          let rootHash = Flowns.hash(node: "", lable: "fn")
          let nameHash = prefix.concat(Flowns.hash(node: rootHash, lable: name))
          let address = Domains.getRecords(nameHash)
        
          return address
        }
        `,
        args: (arg, t) => [
          arg(rootLookup, t.String)
        ]
      })
    }
    return answer;
  } catch (e) {
    console.log(e);
    return lookup;
  }
}