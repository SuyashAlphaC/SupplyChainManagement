// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Test } from "forge-std/Test.sol";
import { ProductManager } from "../src/ProductManager.sol";
import { QualityControl } from "../src/QualityControl.sol";
import { RoleManager } from "../src/RoleManager.sol";
import { SupplyChainStorage } from "../src/SupplyChainStorage.sol";

contract SupplyChainTest is Test {
    ProductManager public productManager;
    QualityControl public qualityControl;
    RoleManager public roleManager;

    // Test addresses
    address admin = address(1);
    address manufacturer1 = address(2);
    address manufacturer2 = address(3);
    address distributor1 = address(4);
    address distributor2 = address(5);
    address retailer1 = address(6);
    address retailer2 = address(7);
    address customer = address(8);

    // Test events
    event ProductCreated(uint256 indexed productId, string name, address indexed manufacturer);
    event ProductTransferred(
        uint256 indexed productId, address indexed from, address indexed to, ProductManager.ProductStatus status
    );
    event QualityCheckPerformed(uint256 indexed productId, address indexed inspector, bool passed);

    function setUp() public {
        // Deploy contracts as admin
        vm.startPrank(admin);
        productManager = new ProductManager();
        qualityControl = new QualityControl(address(productManager));

        // Setup initial roles
        _setupRoles();
        vm.stopPrank();
    }

    function _setupRoles() internal {
        // Assign manufacturer roles
        productManager.assignRole(manufacturer1, productManager.MANUFACTURER_ROLE());
        productManager.assignRole(manufacturer2, productManager.MANUFACTURER_ROLE());

        // Assign distributor roles
        productManager.assignRole(distributor1, productManager.DISTRIBUTOR_ROLE());
        productManager.assignRole(distributor2, productManager.DISTRIBUTOR_ROLE());

        // Assign retailer roles
        productManager.assignRole(retailer1, productManager.RETAILER_ROLE());
        productManager.assignRole(retailer2, productManager.RETAILER_ROLE());

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
    }

    // Role Management Tests
    function testRoleAssignment() public view {
        assertTrue(productManager.isManufacturer(manufacturer1), "Manufacturer1 should have manufacturer role");
        assertTrue(productManager.isDistributor(distributor1), "Distributor1 should have distributor role");
        assertTrue(productManager.isRetailer(retailer1), "Retailer1 should have retailer role");
    }

    function testRoleRevocation() public {
        vm.startPrank(admin);
        productManager.revokeParticipantRole(manufacturer1, productManager.MANUFACTURER_ROLE());
        vm.stopPrank();

        assertFalse(productManager.isManufacturer(manufacturer1), "Manufacturer1 should not have manufacturer role");
    }

    // Product Creation Tests
    function testProductCreation() public {
        vm.startPrank(manufacturer1);

        uint256 productId = productManager.createProduct("Test Product", "Test Description", 1000, "Location A");

        (
            uint256 id,
            string memory name,
            string memory description,
            uint256 price,
            address manufacturer,
            address currentOwner,
            ProductManager.ProductStatus status,
            ,
            ,
        ) = productManager.getProduct(productId);

        assertEq(id, productId, "Product ID mismatch");
        assertEq(name, "Test Product", "Product name mismatch");
        assertEq(description, "Test Description", "Product description mismatch");
        assertEq(price, 1000, "Product price mismatch");
        assertEq(manufacturer, manufacturer1, "Manufacturer mismatch");
        assertEq(currentOwner, manufacturer1, "Current owner mismatch");
        assertEq(uint8(status), uint8(SupplyChainStorage.ProductStatus.Created), "Status mismatch");

        vm.stopPrank();
    }

    function test_RevertUnauthorizedProductCreation() public {
        vm.startPrank(distributor1);
        vm.expectRevert();
        productManager.createProduct("Test Product", "Test Description", 1000, "Location A");
        vm.stopPrank();
    }

    // Product Transfer Tests
    function testCompleteSupplyChainFlow() public {
        // Create product
        vm.startPrank(manufacturer1);
        uint256 productId = productManager.createProduct("Test Product", "Test Description", 1000, "Location A");

        // Manufacturer ships to distributor
        productManager.transferProduct(
            productId, distributor1, SupplyChainStorage.ProductStatus.ShippedByMfg, "Shipping to distributor"
        );
        vm.stopPrank();

        // Distributor receives the product
        vm.startPrank(distributor1);
        productManager.updateProductStatus(productId, SupplyChainStorage.ProductStatus.ReceivedByDist);

        // Distributor ships to retailer
        productManager.transferProduct(
            productId, retailer1, SupplyChainStorage.ProductStatus.ShippedByDist, "Shipping to retailer"
        );
        vm.stopPrank();

        // Retailer receives the product
        vm.startPrank(retailer1);
        productManager.updateProductStatus(productId, SupplyChainStorage.ProductStatus.ReceivedByRet);
        vm.stopPrank();

        // Verify final state
        (,,,,, address currentOwner, SupplyChainStorage.ProductStatus status,,,) = productManager.getProduct(productId);
        assertEq(currentOwner, retailer1, "Final owner should be retailer");
        assertEq(uint8(status), uint8(SupplyChainStorage.ProductStatus.ReceivedByRet), "Final status mismatch");
    }

    function test_RevertUnauthorizedTransfer() public {
        vm.startPrank(manufacturer1);
        uint256 productId = productManager.createProduct("Test Product", "Test Description", 1000, "Location A");
        vm.stopPrank();

        vm.startPrank(distributor2);
        vm.expectRevert();
        productManager.transferProduct(
            productId, retailer1, SupplyChainStorage.ProductStatus.ShippedByDist, "Unauthorized transfer"
        );
        vm.stopPrank();
    }

    // Quality Control Tests
    function testQualityControl() public {
        // Create product
        vm.startPrank(manufacturer1);
        uint256 productId = productManager.createProduct("Test Product", "Test Description", 1000, "Location A");
        vm.stopPrank();
        // Perform quality check
        vm.expectEmit(true, true, false, true);
        emit QualityCheckPerformed(productId, manufacturer1, true);
        vm.startPrank(manufacturer1);
        qualityControl.performQualityCheck(productId, true, "Quality check passed");
        vm.stopPrank();

        // Verify quality check
        QualityControl.QualityCheck[] memory checks = qualityControl.getQualityChecks(productId);
        assertEq(checks.length, 1, "Should have one quality check");
        assertEq(checks[0].inspector, manufacturer1, "Inspector mismatch");
        assertTrue(checks[0].passed, "Quality check should have passed");
    }

    function test_RevertUnauthorizedQualityCheck() public {
        vm.startPrank(manufacturer1);
        uint256 productId = productManager.createProduct("Test Product", "Test Description", 1000, "Location A");
        vm.stopPrank();

        vm.startPrank(customer);
        vm.expectRevert();
        qualityControl.performQualityCheck(productId, true, "Unauthorized quality check");
        vm.stopPrank();
    }

    // Participant Management Tests
    function testParticipantRegistration() public {
        vm.startPrank(admin);
        productManager.registerParticipant(
            manufacturer2, "Manufacturer 2", "Secondary Manufacturer", SupplyChainStorage.ParticipantType.Manufacturer
        );
        vm.stopPrank();

        (string memory name, string memory details, SupplyChainStorage.ParticipantType role, bool isActive,,) =
            productManager.getParticipant(manufacturer2);

        assertEq(name, "Manufacturer 2", "Name mismatch");
        assertEq(details, "Secondary Manufacturer", "Details mismatch");
        assertEq(uint8(role), uint8(SupplyChainStorage.ParticipantType.Manufacturer), "Role mismatch");
        assertTrue(isActive, "Participant should be active");
    }

    function test_RevertDuplicateParticipantRegistration() public {
        vm.startPrank(admin);
        vm.expectRevert();
        productManager.registerParticipant(
            manufacturer1,
            "Manufacturer 1 Duplicate",
            "Duplicate Entry",
            SupplyChainStorage.ParticipantType.Manufacturer
        );
        vm.stopPrank();
    }

    // Status Transition Tests
    function testValidStatusTransition() public {
        vm.startPrank(manufacturer1);
        uint256 productId = productManager.createProduct("Test Product", "Test Description", 1000, "Location A");

        productManager.transferProduct(
            productId, distributor1, SupplyChainStorage.ProductStatus.ShippedByMfg, "Valid transition"
        );
        vm.stopPrank();

        (,,,,, address currentOwner, SupplyChainStorage.ProductStatus status,,,) = productManager.getProduct(productId);
        assertEq(currentOwner, distributor1, "Owner should be distributor");
        assertEq(uint8(status), uint8(SupplyChainStorage.ProductStatus.ShippedByMfg), "Status should be ShippedByMfg");
    }

    function test_RevertInvalidStatusTransition() public {
        vm.startPrank(manufacturer1);
        uint256 productId = productManager.createProduct("Test Product", "Test Description", 1000, "Location A");

        vm.expectRevert();
        productManager.transferProduct(
            productId,
            distributor1,
            SupplyChainStorage.ProductStatus.Sold, // Invalid direct transition to Sold
            "Invalid transition"
        );
        vm.stopPrank();
    }

    // Emergency Functions Tests
    function testEmergencyPause() public {
        vm.startPrank(admin);
        productManager.pause();
        assertTrue(productManager.paused(), "Contract should be paused");

        vm.expectRevert();
        productManager.createProduct("Test Product", "Test Description", 1000, "Location A");

        productManager.unpause();
        assertFalse(productManager.paused(), "Contract should be unpaused");
        vm.stopPrank();
    }

    function test_RevertUnauthorizedPause() public {
        vm.startPrank(manufacturer1);
        vm.expectRevert();
        productManager.pause();
        vm.stopPrank();
    }
}
