// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Script, console } from "forge-std/Script.sol";
import { ProductManager } from "../src/ProductManager.sol";
import { QualityControl } from "../src/QualityControl.sol";
import { RoleManager } from "../src/RoleManager.sol";
import { SupplyChainStorage } from "../src/SupplyChainStorage.sol";

contract SupplyChainDeploy is Script {
    // Contract instances
    ProductManager public productManager;
    QualityControl public qualityControl;
    RoleManager public roleManager;

    address public constant ADMIN = address(1);
    address public constant MANUFACTURER1 = address(2);
    address public constant MANUFACTURER2 = address(3);
    address public constant DISTRIBUTOR1 = address(4);
    address public constant DISTRIBUTOR2 = address(5);
    address public constant RETAILER1 = address(6);
    address public constant RETAILER2 = address(7);

    function setUp() public { }

    function run() public returns (ProductManager, QualityControl) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        productManager = new ProductManager();
        qualityControl = new QualityControl(address(productManager));

        _setupRoles();

        _registerParticipants();

        vm.stopBroadcast();

        _logDeployment();
        return (productManager, qualityControl);
    }

    function _setupRoles() internal {
        productManager.assignRole(MANUFACTURER1, productManager.MANUFACTURER_ROLE());
        productManager.assignRole(MANUFACTURER2, productManager.MANUFACTURER_ROLE());

        productManager.assignRole(DISTRIBUTOR1, productManager.DISTRIBUTOR_ROLE());
        productManager.assignRole(DISTRIBUTOR2, productManager.DISTRIBUTOR_ROLE());

        productManager.assignRole(RETAILER1, productManager.RETAILER_ROLE());
        productManager.assignRole(RETAILER2, productManager.RETAILER_ROLE());
    }

    function _registerParticipants() internal {
        // Register manufacturers
        productManager.registerParticipant(
            MANUFACTURER1,
            "Primary Manufacturer",
            "Large scale manufacturing facility",
            SupplyChainStorage.ParticipantType.Manufacturer
        );
        productManager.registerParticipant(
            MANUFACTURER2,
            "Secondary Manufacturer",
            "Specialized manufacturing unit",
            SupplyChainStorage.ParticipantType.Manufacturer
        );

        // Register distributors
        productManager.registerParticipant(
            DISTRIBUTOR1,
            "Main Distributor",
            "National distribution network",
            SupplyChainStorage.ParticipantType.Distributor
        );
        productManager.registerParticipant(
            DISTRIBUTOR2,
            "Regional Distributor",
            "Regional distribution center",
            SupplyChainStorage.ParticipantType.Distributor
        );

        // Register retailers
        productManager.registerParticipant(
            RETAILER1, "Premium Retailer", "High-end retail chain", SupplyChainStorage.ParticipantType.Retailer
        );
        productManager.registerParticipant(
            RETAILER2, "Standard Retailer", "Mass market retail outlets", SupplyChainStorage.ParticipantType.Retailer
        );
    }

    function _logDeployment() internal view {
        console.log("Supply Chain Management System Deployment");
        console.log("----------------------------------------");
        console.log("ProductManager deployed to:", address(productManager));
        console.log("QualityControl deployed to:", address(qualityControl));
        console.log("----------------------------------------");
        console.log("Initial participants setup completed:");
        console.log("- Manufacturers:", MANUFACTURER1, MANUFACTURER2);
        console.log("- Distributors:", DISTRIBUTOR1, DISTRIBUTOR2);
        console.log("- Retailers:", RETAILER1, RETAILER2);
    }
}
