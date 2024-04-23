
import './styles.css';
import React, { useState } from 'react';
const { Web3 } = require("web3");

function App () {
  const contractAddress = "0xBEeEf06ce6d29e0c2e4606e602fb11056908B96a";

  const contractAbi = [
    {"type":"constructor","inputs":[{"name":"initialOwner","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"approve","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"balanceOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getApproved","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"isApprovedForAll","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"operator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"mintNFT","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"_tokenURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"ownerOf","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setApprovalForAll","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"approved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokenArray","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"tokenURI","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"BatchMetadataUpdate","inputs":[{"name":"_fromTokenId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"_toTokenId","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"MetadataUpdate","inputs":[{"name":"_tokenId","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC721IncorrectOwner","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InsufficientApproval","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC721InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOperator","inputs":[{"name":"operator","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721NonexistentToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}
  ]


  const[web3, setWeb3] = useState('');
  const[contract, setContract] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({method: 'eth_requestAccounts'});

        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
        setContract(contractInstance);

      } catch (error) {
        console.log("Error while connecting to wallet: "+ error.message);
      }

    } else {
      console.log("Please install web3 wallet")
    }
  }

  const [tokenIdOwnerOf, setTokenIdOwnerOf] = useState('');
  const [ownerOf, setOwnerOf] = useState('');

  const ownerOfFunction = async () => {
    try {
      if (window.ethereum && contract) {
        const accounts = await web3.eth.getAccounts();
        const ownerOf = await contract.methods.ownerOf(tokenIdOwnerOf).call({from: accounts[0]});
        setOwnerOf(ownerOf);
        console.log("Owner is: "+ ownerOf);
      }
    } catch (error) {
      console.log('Error while getting owner: '+ error.message);
    }
  }

  const [ownerBalanceOf, setOwnerBalanceOf] = useState('');
  const [balanceOf, setBalanceOf] = useState('');

  const balanceOfFunction = async () => {
    try {
      if (window.ethereum && contract) {
        const accounts = await web3.eth.getAccounts();
        const _balance = await contract.methods.balanceOf(ownerBalanceOf).call({from: accounts[0]});
        setBalanceOf(_balance.toString());
        console.log("Balance is: "+ _balance);
      }
    } catch (error) {
      console.log("Error while getting balanceOf: "+ error.message);
    }
  }

  const [name, setName] = useState('');
  const nameFunction = async () => {
    try {
      if (window.ethereum && contract) {
        const accounts = await web3.eth.getAccounts();
        const name = await contract.methods.name().call({from: accounts[0]});
        setName(name);
        console.log("Name is: "+name);
      }
    } catch (error) {
      console.log("Error while getting name: "+ error.message);
    }
  }
 
  const[recepientMintNFT, setRecepientMintNFT] = useState('');
  const[tokenURIMintNFT, setTokenURIMintNFT] = useState('');

  const mintNFTFunction = async() => {
    try {
      if (window.ethereum && contract) {
        const accounts1 = await web3.eth.getAccounts();
        const data = contract.methods.mintNFT(recepientMintNFT, tokenURIMintNFT).encodeABI();
        const gasPrice = await web3.eth.getGasPrice(); // Optional: Get current gas price
        const estimatedGasLimit = await contract.methods.mintNFT(recepientMintNFT, tokenURIMintNFT).estimateGas({from: accounts1[0]});

        const transactionParameters = {
          to: contractAddress,
          from: accounts1[0],
          data: data,
          gasPrice: gasPrice,
          gas: estimatedGasLimit.toString()
        }
        console.log("Minting...");
        const txHash = await web3.eth.sendTransaction(transactionParameters);
        console.log('NFT minted successfully');
      }

    } catch (error) {
      console.log("Error while minting NFT: "+ error.message);
    }
  }

  return (
    <div className='appStyle'>
      <div>
        <button className='buttonStyle' onClick={connectWallet}>Connect Wallet</button>
      </div>

      <div>
        <p>0x55CDf2a6b6f95C3d4A39be8d8B55edDe67278b1F</p> 
        <p>ipfs://QmQ2znXqaU9qYQYnMbSoC7ZTudahaMAYFi1Q6TF7d1r2Vk</p> 
      </div>

      <div>
        <button className='buttonStyle' onClick={nameFunction}>Name</button>
        <p>Name: {name} </p>
      </div>


      <div>
        <input className='inputStyle' placeholder='Token ID' value={tokenIdOwnerOf} onChange={e => {setTokenIdOwnerOf(e.target.value)}}/>
        <button className='buttonStyle' onClick={ownerOfFunction}>Owner Of</button>
        <p>Owner:{ownerOf} </p>
      </div>

      <div>
        <input className='inputStyle' placeholder='Owner address ' value={ownerBalanceOf} onChange={e => {setOwnerBalanceOf(e.target.value)}}/>
        <button className='buttonStyle' onClick={balanceOfFunction}>Balance Of</button>
        <p>Balance: {balanceOf} </p>
      </div>

      
      <div>
        <input className='inputStyle' placeholder='Recepient' value={recepientMintNFT} onChange={e => {setRecepientMintNFT(e.target.value)}}/>
        <input className='inputStyle' placeholder='Token URI' value={tokenURIMintNFT} onChange={e => {setTokenURIMintNFT(e.target.value)}}/>
        <button className='buttonStyle' onClick={mintNFTFunction}>Mint NFT</button>
      </div>
    </div>
  )

}

export default App;

