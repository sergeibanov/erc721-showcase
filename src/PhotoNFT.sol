// SPDX-License-Identifier: MIT

pragma solidity 0.8.20; 

import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "node_modules/@openzeppelin/contracts/access/Ownable.sol"; 
import "libraries/Counters.sol";

contract PhotoNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256[] public tokenArray;
    
    constructor (address initialOwner) ERC721("PhotoNFT", "PNFT") Ownable(initialOwner) {}

    function mintNFT(address to, string calldata _tokenURI) external onlyOwner {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(to, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        tokenArray.push(newTokenId);
    }
}