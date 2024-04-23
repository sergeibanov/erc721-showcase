// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {PhotoNFT} from "../src/PhotoNFT.sol";

contract DeplotPhotoNFT is Script {

    function run () external returns (PhotoNFT) {
        vm.startBroadcast();
        PhotoNFT photoNFT = new PhotoNFT(msg.sender);
        vm.stopBroadcast();
        return photoNFT;
    }
    
}