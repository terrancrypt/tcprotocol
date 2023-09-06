// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {MockWBTC} from "../test/mocks/MockWBTC.sol";
import {MockWETH} from "../test/mocks/MockWETH.sol";

contract DeployMockToken is Script {
    function run() public returns (MockWBTC, MockWETH) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        MockWBTC mockWBTC = new MockWBTC();
        MockWETH mockWETH = new MockWETH();
        vm.stopBroadcast();
        return (mockWBTC, mockWETH);
    }
}
