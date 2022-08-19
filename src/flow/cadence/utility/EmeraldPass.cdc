import FungibleToken from "./FungibleToken.cdc"
import FUSD from "./FUSD.cdc"
import FlowToken from "./FlowToken.cdc"

pub contract EmeraldPass {

  access(self) var treasury: ECTreasury
  // Maps the type of a token to its pricing
  access(self) var pricing: {Type: Pricing}
  access(self) var time: {String: UFix64}

  pub let VaultPublicPath: PublicPath
  pub let VaultStoragePath: StoragePath

  pub event ChangedPricing(newPricing: {String: UFix64})
  pub event Purchased(subscriber: Address, time: String)
  pub event Donation(by: Address, to: Address, time: String)

  pub struct ECTreasury {
    pub let tokenTypeToVault: {Type: Capability<&{FungibleToken.Receiver}>}

    init() {
      let ecAccount: PublicAccount = getAccount(0x5643fd47a29770e7)
      self.tokenTypeToVault = {
        Type<@FUSD.Vault>(): ecAccount.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver),
        Type<@FlowToken.Vault>(): ecAccount.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
      }
    }
  }

  pub struct Pricing {
    // examples in $FUSD
    // "month" -> 10.0
    // "year" -> 100.0
    pub let timeToCost: {String: UFix64}

    init(_ timeToCost: {String: UFix64}) {
      for time in timeToCost.keys {
        assert(EmeraldPass.getTime().containsKey(time), message: "This is not a supported time.")
      }
      self.timeToCost = timeToCost
    }
  }

  pub resource interface VaultPublic {
    pub var endDate: UFix64
    pub fun addTime(time: String, payment: @FungibleToken.Vault)
    pub fun active(): Bool
  }

  pub resource Vault: VaultPublic {

    pub var endDate: UFix64

    pub fun addTime(time: String, payment: @FungibleToken.Vault) {
      pre {
        EmeraldPass.getPricing().containsKey(payment.getType()): "This is not a supported form of payment."
        EmeraldPass.getPrice(vaultType: payment.getType(), time: time) != nil: "Could not fetch a price for this payment type and time."
        EmeraldPass.getPrice(vaultType: payment.getType(), time: time) == payment.balance:
          "The cost is ".concat(EmeraldPass.getPrice(vaultType: payment.getType(), time: time)!.toString()).concat(" but you passed in ").concat(payment.balance.toString()).concat(".")
      }

      EmeraldPass.depositToECTreasury(vault: <- payment)

      let addedTime: UFix64 = EmeraldPass.getTime()[time]!

      // If you're already active, just add more time to the end date.
      // Otherwise, start the subscription now and set the end date.
      if self.active() {
        self.endDate = self.endDate + addedTime
      } else {
        self.endDate = getCurrentBlock().timestamp + addedTime
      }

      emit Purchased(subscriber: self.owner!.address, time: time)
    }

    pub fun active(): Bool {
      return getCurrentBlock().timestamp <= self.endDate
    }

    init() {
      // We take away 1.0 to make sure users can't execute "active" status
      // in the same transaction.
      self.endDate = getCurrentBlock().timestamp - 1.0
    }

  }

  pub resource Admin {

    pub fun changePricing(newPricing: {Type: Pricing}) {
      EmeraldPass.pricing = newPricing
    }

    pub fun changeTime(newTimes: {String: UFix64}) {
      EmeraldPass.time = newTimes
    }
  
  }

  // A public function because, well, ... um ... you can
  // always call this if you want! :D ;) <3
  pub fun depositToECTreasury(vault: @FungibleToken.Vault) {
    pre {
      self.getTreasury()[vault.getType()] != nil: "We have not set up this payment yet."
    }
    self.getTreasury()[vault.getType()]!.borrow()!.deposit(from: <- vault)
  }

  // A function you can call to donate subscription time to someone else
  pub fun donate(nicePerson: Address, to: Address, time: String, payment: @FungibleToken.Vault) {
    let userVault = getAccount(to).getCapability(EmeraldPass.VaultPublicPath)
                      .borrow<&Vault{VaultPublic}>()
                      ?? panic("Ths receiver has not set up a Vault for Emerald Pass yet.")
    userVault.addTime(time: time, payment: <- payment)

    emit Donation(by: nicePerson, to: to, time: time)
  }

  // Checks to see if a user is currently subscribed to Emerald Pass
  pub fun isActive(user: Address): Bool {
    return getAccount(user).getCapability(EmeraldPass.VaultPublicPath).borrow<&Vault{VaultPublic}>()?.active() == true
  }

  pub fun getPricing(): {Type: Pricing} {
    return self.pricing
  }

  pub fun getPrice(vaultType: Type, time: String): UFix64? {
    pre {
      self.getPricing()[vaultType] != nil: "This is not a supported form of payment."
    }
    return self.getPricing()[vaultType]!.timeToCost[time]
  }

  pub fun getTreasury(): {Type: Capability<&{FungibleToken.Receiver}>} {
    return self.treasury.tokenTypeToVault
  }

  pub fun getTime(): {String: UFix64} {
    return self.time
  }

  init() {
    self.treasury = ECTreasury()
    self.time = {
      "day": 86400.0,
      "week": 604800.0,
      "month": 2629743.0,
      "6months": 15778458.0,
      "year": 31556926.0
    }
    self.pricing = {
      Type<@FUSD.Vault>(): Pricing({
        "month": 100.0,
        "year": 1000.0
      })
    }

    self.VaultPublicPath = /public/EmeraldPassv2
    self.VaultStoragePath = /storage/EmeraldPassv2

    self.account.save(<- create Admin(), to: /storage/EmeraldPassAdmin)
  }
  
}