import EmeraldPass from "../utility/EmeraldPass.cdc"

pub fun main(user: Address): Bool {
  return EmeraldPass.isActive(user: user)
}
 