import FLOAT from "./src/flow/cadence/utility/FLOAT.cdc"

pub fun main(): Bool {

  let eventCap = getAccount(0x8f9e8e0dc951c5b9).getCapability<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>(FLOAT.FLOATEventsPublicPath)
  return eventCap.borrow() != nil
}