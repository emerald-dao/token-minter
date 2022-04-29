import ExampleNFT from 0xe37a242dfff69bbc
transaction() {
  prepare(signer: AuthAccount) {
    let metadata: {UInt64: ExampleNFT.Metadata} = {}
    var i: UInt64 = 0
    while i < 1000 {
      metadata[i] = ExampleNFT.Metadata(
        name: "Jacob",
        description: "",
        image: "",
        favNum: 0
      )
      i = i + 1
    }
    let admin: &ExampleNFT.Administrator = signer.borrow<&ExampleNFT.Administrator>(from: ExampleNFT.AdministratorStoragePath)!
    admin.addMetadata(metadata: metadata)
  }
}