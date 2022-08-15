import FlowToken from "./FlowToken.cdc"
import FungibleToken from "./FungibleToken.cdc"

pub contract EmeraldPass {

  access(self) let ECFlowTokenTreasury: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
  access(self) var pricing: Pricing

  pub let VaultPublicPath: PublicPath
  pub let VaultStoragePath: StoragePath

  pub event ChangedPricing(newPricing: {String: UFix64})
  pub event Purchased(subscriber: Address, time: String)
  pub event Donation(by: Address, to: Address, time: String)

  pub struct Pricing {
    // examples
    // "month" -> 10.0
    // "year" -> 100.0
    pub let timeToCost: {String: UFix64}
    // Stores info about times in human readable format -> unix timestamps
    pub let times: {String: UFix64}

    init(_ timeToCost: {String: UFix64}) {
      self.times = {
        "day": 86400.0,
        "week": 604800.0,
        "month": 2629743.0,
        "year": 31556926.0
      }
      for time in timeToCost.keys {
        assert(self.times.containsKey(time), message: "This is not a supported time.")
      }
      self.timeToCost = timeToCost
    }
  }

  pub resource interface VaultPublic {
    pub var endDate: UFix64
    pub fun addTime(time: String, payment: @FlowToken.Vault)
    pub fun active(): Bool
  }

  pub resource Vault: VaultPublic {

    pub var endDate: UFix64

    pub fun addTime(time: String, payment: @FlowToken.Vault) {
      pre {
        EmeraldPass.getPrice(time: time) != nil: "This is not a valid time period."
        EmeraldPass.getPrice(time: time) == payment.balance:
          "The cost is ".concat(EmeraldPass.getPrice(time: time)!.toString()).concat(" but you passed in ").concat(payment.balance.toString()).concat(".")
      }

      EmeraldPass.depositToECTreasury(vault: <- payment)

      let addedTime = EmeraldPass.getPricing().times[time]!

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
      self.endDate = getCurrentBlock().timestamp
    }

  }

  pub resource Admin {

    pub fun changePricing(_ timeToCost: {String: UFix64}) {
      EmeraldPass.pricing = Pricing(timeToCost)
      emit ChangedPricing(newPricing: timeToCost)
    }
  
  }


  // A public function because, well, ... um ... you can
  // always call this if you want! :D ;) <3
  pub fun depositToECTreasury(vault: @FlowToken.Vault) {
    self.ECFlowTokenTreasury.borrow()!.deposit(from: <- vault)
  }

  // A function you can call to donate subscription time to someone else
  pub fun donate(nicePerson: Address, to: Address, time: String, payment: @FlowToken.Vault) {
    let userVault = getAccount(to).getCapability(EmeraldPass.VaultPublicPath)
                      .borrow<&Vault{VaultPublic}>()
                      ?? panic("Ths receiver has not set up a Vault for Emerald Pass yet.")
    userVault.addTime(time: time, payment: <- payment)

    emit Donation(by: nicePerson, to: to, time: time)
  }

  // Checks to see if a user is currently subscribed to Emerald Pass
  pub fun isActive(user: Address): Bool {
    if let userVault = getAccount(user).getCapability(EmeraldPass.VaultPublicPath).borrow<&Vault{VaultPublic}>() {
      return userVault.active()
    }
    return false
  }

  pub fun getPricing(): Pricing {
    return self.pricing
  }

  pub fun getPrice(time: String): UFix64? {
    return self.getPricing().timeToCost[time]
  }

  init() {
    self.ECFlowTokenTreasury = getAccount(0x5643fd47a29770e7).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
    self.pricing = Pricing({})

    self.VaultPublicPath = /public/EmeraldPass
    self.VaultStoragePath = /storage/EmeraldPass

    self.account.save(<- create Admin(), to: /storage/EmeraldPassAdmin)
  }
  
}