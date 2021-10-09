const PUBLIC_KEY = '0x42B1E06B363fCc4cAE15b763Ee3Cb2499327098C';
const PRIVATE_KEY = '7ad05fc2dfa372cfe46383ca27deadb7c6785c07b7e1843477e55fb81636b896'
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3('wss://eth-ropsten.alchemyapi.io/v2/2E_h9C4Y4VXzwa9fnsN_OSEoW89PTyZU')
const contract = require("./build/contracts/MyNFT.json");
const contractAddress = "0xBC229615F4BB8BCE15644e8Ec5e90304A62002f0"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmfHyU41ESnZN1mf5MuZkioSTHDoXpfM4d1EcpjwZWVaDg")
