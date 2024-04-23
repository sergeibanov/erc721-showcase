const { Web3 } = require("web3"); // "{ }" FOR HAVING LATEST VERSION

require('dotenv-safe').config({
    allowEmptyValues: false,
    example: '.env.example',
  });

const fs = require('fs');
const {abi, bytecode } = JSON.parse(fs.readFileSync("out/PhotoNFT.sol/PhotoNFT.json"));

async function main () {
    const alchemyUrl = process.env.ALCHEMY_SEPOLIA_NETWORK + process.env.ALCHEMY_API_KEY;
    const web3 = new Web3(alchemyUrl);

    const signer = web3.eth.accounts.privateKeyToAccount(
        '0x' + process.env.WALLET_PRIVATE_KEY,
    );
    web3.eth.accounts.wallet.add(signer);
    
    const initialOwner = signer.address;

    // Using the signing account to deploy the contract
    const contract = new web3.eth.Contract(abi);
    contract.options.data = bytecode.object;
    const deployTx = contract.deploy({
        arguments: [initialOwner],
    });
    
    const deployedContract = await 
        deployTx.send({
            from: signer.address,
            gas: await deployTx.estimateGas(),
        })
        .once (
            "transactionHash", (txhash) => {
                console.log(`Mining deployment transaction ...`);
            });
    
    // The contract is now deployed on chain!
    console.log(`Contract deployed at ${deployedContract.options.address}`);
}
main();