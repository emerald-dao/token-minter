// IMPORTS
import MetadataViews from "../../utility/MetadataViews.cdc"
pub fun main(): [CollectionDisplay] {
  let answer: [CollectionDisplay] = []

  // DISPLAYS

  return answer

}

pub struct CollectionDisplay {
  pub let contractName: String
  pub let name: String
  pub let description: String
  pub let image: MetadataViews.IPFSFile

  init(_contractName: String, _name: String, _description: String, _image: MetadataViews.IPFSFile) {
    self.contractName = _contractName
    self.name = _name 
    self.description = _description
    self.image = _image
  }
}