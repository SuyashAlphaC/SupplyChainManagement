// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//////////////////
//IMPORTS     ////
//////////////////

import { RoleManager } from "./RoleManager.sol";
import { ProductManager } from "./ProductManager.sol";

contract QualityControl {
    ProductManager public productManager;

    struct QualityCheck {
        address inspector;
        bool passed;
        string notes;
        uint256 timestamp;
    }
    ///////////////////
    //MAPPINGS     ////
    ///////////////////

    // Mapping from productId to array of quality checks

    mapping(uint256 => QualityCheck[]) public qualityChecks;

    ///////////////////
    //EVENTS     //////
    ///////////////////

    event QualityCheckPerformed(uint256 indexed productId, address indexed inspector, bool passed);

    constructor(address _productManager) {
        require(_productManager != address(0), "Invalid ProductManager address");
        productManager = ProductManager(_productManager);
    }

    modifier onlyAuthorizedInspector(uint256 productId) {
        require(
            productManager.isManufacturer(msg.sender) || productManager.isDistributor(msg.sender)
                || productManager.isRetailer(msg.sender),
            "Not authorized to perform quality check"
        );
        _;
    }

    ////////////////////////////
    //EXTERNAL FUNCTIONS    ////
    ////////////////////////////

    function performQualityCheck(
        uint256 productId,
        bool passed,
        string memory notes
    )
        external
        onlyAuthorizedInspector(productId)
    {
        // Create and store quality check
        QualityCheck memory check =
            QualityCheck({ inspector: msg.sender, passed: passed, notes: notes, timestamp: block.timestamp });

        qualityChecks[productId].push(check);

        emit QualityCheckPerformed(productId, msg.sender, passed);
    }

    //////////////////////////////////
    //EXTERNAL VIEW FUNCTIONS     ////
    //////////////////////////////////

    function getQualityChecks(uint256 productId) external view returns (QualityCheck[] memory) {
        return qualityChecks[productId];
    }
}
