// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Test } from "forge-std/Test.sol";
import { ProductManager } from "../../src/ProductManager.sol";
import { QualityControl } from "../../src/QualityControl.sol";
import { RoleManager } from "../../src/RoleManager.sol";
import { SupplyChainStorage } from "../../src/SupplyChainStorage.sol";

contract SupplyChainFuzzTest is Test {
    ProductManager public productManager;
    QualityControl public qualityControl;
    RoleManager public roleManager;

    // Test addresses
    address admin = address(1);
    address manufacturer1 = address(2);
    address distributor1 = address(4);
    address retailer1 = address(6);

    function setUp() public {
        // Deploy contracts as admin
        vm.startPrank(admin);
        productManager = new ProductManager();
        qualityControl = new QualityControl(address(productManager));

        // Setup initial roles
        productManager.assignRole(manufacturer1, productManager.MANUFACTURER_ROLE());
        productManager.assignRole(distributor1, productManager.DISTRIBUTOR_ROLE());
        productManager.assignRole(retailer1, productManager.RETAILER_ROLE());

        // Register participants
        productManager.registerParticipant(
            manufacturer1, "Manufacturer 1", "Primary Manufacturer", SupplyChainStorage.ParticipantType.Manufacturer
        );
        productManager.registerParticipant(
            distributor1, "Distributor 1", "Primary Distributor", SupplyChainStorage.ParticipantType.Distributor
        );
        productManager.registerParticipant(
            retailer1, "Retailer 1", "Primary Retailer", SupplyChainStorage.ParticipantType.Retailer
        );
        vm.stopPrank();
    }

    // Fuzz test for product creation with random prices
    function testFuzz_ProductCreation(uint256 price) public {
        // Bound price to reasonable values to avoid overflow
        price = bound(price, 1, 1_000_000_000 ether);

        vm.startPrank(manufacturer1);
        uint256 productId = productManager.createProduct("Fuzz Test Product", "Fuzz Description", price, "Location X");

        (
            uint256 id,
            ,
            ,
            uint256 retrievedPrice,
            address manufacturer,
            address currentOwner,
            ProductManager.ProductStatus status,
            ,
            ,
        ) = productManager.getProduct(productId);

        assertEq(id, productId, "Product ID mismatch");
        assertEq(retrievedPrice, price, "Product price mismatch");
        assertEq(manufacturer, manufacturer1, "Manufacturer mismatch");
        assertEq(currentOwner, manufacturer1, "Current owner mismatch");
        assertEq(uint8(status), uint8(SupplyChainStorage.ProductStatus.Created), "Status mismatch");
        vm.stopPrank();
    }

    // Fuzz test for product transfer with random addresses
    function testFuzz_ProductTransfer(address randomDistributor, address randomRetailer) public {
        // Ensure addresses are not zero and not existing participants
        vm.assume(
            randomDistributor != address(0) && randomRetailer != address(0) && randomDistributor != randomRetailer
                && randomDistributor != manufacturer1 && randomDistributor != distributor1 && randomDistributor != retailer1
                && randomRetailer != manufacturer1 && randomRetailer != distributor1 && randomRetailer != retailer1
        );

        // Setup new participants
        vm.startPrank(admin);
        productManager.assignRole(randomDistributor, productManager.DISTRIBUTOR_ROLE());
        productManager.assignRole(randomRetailer, productManager.RETAILER_ROLE());
        productManager.registerParticipant(
            randomDistributor, "Random Distributor", "Fuzz Test", SupplyChainStorage.ParticipantType.Distributor
        );
        productManager.registerParticipant(
            randomRetailer, "Random Retailer", "Fuzz Test", SupplyChainStorage.ParticipantType.Retailer
        );
        vm.stopPrank();

        // Create and transfer product
        vm.startPrank(manufacturer1);
        uint256 productId =
            productManager.createProduct("Fuzz Transfer Product", "Fuzz Description", 1000, "Location Y");
        productManager.transferProduct(
            productId, randomDistributor, SupplyChainStorage.ProductStatus.ShippedByMfg, "Fuzz transfer to distributor"
        );
        vm.stopPrank();

        vm.startPrank(randomDistributor);
        productManager.updateProductStatus(productId, SupplyChainStorage.ProductStatus.ReceivedByDist);

        productManager.transferProduct(
            productId, randomRetailer, SupplyChainStorage.ProductStatus.ShippedByDist, "Fuzz transfer to retailer"
        );
        vm.stopPrank();

        // Verify final state
        (,,,,, address currentOwner, ProductManager.ProductStatus status,,,) = productManager.getProduct(productId);
        assertEq(currentOwner, randomRetailer, "Final owner should be retailer");
        assertEq(uint8(status), uint8(SupplyChainStorage.ProductStatus.ShippedByDist), "Final status mismatch");
    }

    // Fuzz test for quality control with random product data
    function testFuzz_QualityControl(string calldata notes, bool passed) public {
        vm.startPrank(manufacturer1);
        uint256 productId = productManager.createProduct("Fuzz QC Product", "Fuzz Description", 1000, "Location Z");

        qualityControl.performQualityCheck(productId, passed, notes);
        vm.stopPrank();

        QualityControl.QualityCheck[] memory checks = qualityControl.getQualityChecks(productId);
        assertEq(checks.length, 1, "Should have one quality check");
        assertEq(checks[0].inspector, manufacturer1, "Inspector mismatch");
        assertEq(checks[0].passed, passed, "Quality check result mismatch");
        assertEq(checks[0].notes, notes, "Quality check notes mismatch");
    }

    // Fuzz test for participant registration with random data
    function testFuzz_ParticipantRegistration(
        address participant,
        string calldata name,
        string calldata details
    )
        public
    {
        // Ensure participant address is valid and not already registered
        vm.assume(
            participant != address(0) && participant != manufacturer1 && participant != distributor1
                && participant != retailer1
        );
        vm.assume(bytes(name).length > 0);

        vm.startPrank(admin);
        productManager.assignRole(participant, productManager.MANUFACTURER_ROLE());
        productManager.registerParticipant(participant, name, details, SupplyChainStorage.ParticipantType.Manufacturer);

        (
            string memory retrievedName,
            string memory retrievedDetails,
            SupplyChainStorage.ParticipantType role,
            bool isActive,
            ,
        ) = productManager.getParticipant(participant);

        assertEq(retrievedName, name, "Name mismatch");
        assertEq(retrievedDetails, details, "Details mismatch");
        assertEq(uint8(role), uint8(SupplyChainStorage.ParticipantType.Manufacturer), "Role mismatch");
        assertTrue(isActive, "Participant should be active");
        vm.stopPrank();
    }
}
