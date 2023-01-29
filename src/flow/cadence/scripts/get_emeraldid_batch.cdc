import EmeraldIdentity from "../../utility/EmeraldIdentity.cdc"
import EmeraldIdentityDapper from "../../utility/EmeraldIdentityDapper.cdc"
import EmeraldIdentityLilico from "../../utility/EmeraldIdentityLilico.cdc"

pub fun main(addresses: [Address]): {Address: String} {
  let answer: {Address: String} = {}
  for account in addresses {
    if let bloctoId = EmeraldIdentity.getDiscordFromAccount(account: account) {
      answer[account] = bloctoId
    } else if let dapperId = EmeraldIdentityDapper.getDiscordFromAccount(account: account) {
      answer[account] = dapperId
    } else if let lilicoId = EmeraldIdentityLilico.getDiscordFromAccount(account: account) {
      answer[account] = lilicoId
    }
  }
  return answer
}