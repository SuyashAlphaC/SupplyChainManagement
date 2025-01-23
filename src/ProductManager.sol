// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//////////////////
//IMPORTS     ////
//////////////////

import { SupplyChainStorage } from "./SupplyChainStorage.sol";
import { RoleManager } from "./RoleManager.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ProductManager is SupplyChainStorage, RoleManager, Pausable, ReentrancyGuard {
    ////////////////////////////
    //PRIVATE VARIABLES     ////
    ////////////////////////////

    uint256 private _productIdCounter;

    ///////////////////
    //MAPPINGS     ////
    ///////////////////

    mapping(uint256 => Product) private products;
    mapping(address => Participant) private participants;

    ///////////////////
    //EVENTS     //////
    ///////////////////

    event ProductCreated(uint256 indexed productId, string name, address indexed manufacturer);
    event ProductTransferred(uint256 indexed productId, address indexed from, address indexed to, ProductStatus status);
    event ProductStatusUpdated(uint256 indexed productId, ProductStatus oldStatus, ProductStatus newStatus);
    event ParticipantRegistered(address indexed participantAddress, ParticipantType role, string name);

    constructor() {
        _productIdCounter = 1;
    }

    ////////////////////////////
    //EXTERNAL FUNCTIONS    ////
    ////////////////////////////

    function registerParticipant(
        address _participantAddress,
        string memory _name,
        string memory _details,
        ParticipantType _role
    )
        external
        onlyRole(ADMIN_ROLE)
    {
        require(_participantAddress != address(0), "Invalid address");
        require(bytes(_name).length > 0, "Name required");
        require(!participants[_participantAddress].isActive, "Already registered");

        Participant storage newParticipant = participants[_participantAddress];
        newParticipant.id = _participantAddress;
        newParticipant.name = _name;
        newParticipant.details = _details;
        newParticipant.role = _role;
        newParticipant.isActive = true;
        newParticipant.registeredAt = block.timestamp;

        if (_role == ParticipantType.Manufacturer) {
            grantRole(MANUFACTURER_ROLE, _participantAddress);
        } else if (_role == ParticipantType.Distributor) {
            grantRole(DISTRIBUTOR_ROLE, _participantAddress);
        } else if (_role == ParticipantType.Retailer) {
            grantRole(RETAILER_ROLE, _participantAddress);
        }

        emit ParticipantRegistered(_participantAddress, _role, _name);
    }

    function createProduct(
        string memory _name,
        string memory _description,
        uint256 _price,
        string memory _locationData
    )
        external
        onlyRole(MANUFACTURER_ROLE)
        returns (uint256)
    {
        require(bytes(_name).length > 0, "Name required");
        require(_price > 0, "Price required");

        uint256 productId = _productIdCounter++;
        Product storage newProduct = products[productId];

        newProduct.id = productId;
        newProduct.name = _name;
        newProduct.description = _description;
        newProduct.price = _price;
        newProduct.manufacturer = msg.sender;
        newProduct.currentOwner = msg.sender;
        newProduct.status = ProductStatus.Created;
        newProduct.locationData = _locationData;
        newProduct.createdAt = block.timestamp;
        newProduct.updatedAt = block.timestamp;

        participants[msg.sender].productsOwned.push(productId);

        _addToHistory(productId, address(0), msg.sender, ProductStatus.Created, "Product created");

        emit ProductCreated(productId, _name, msg.sender);
        return productId;
    }

    function transferProduct(
        uint256 _productId,
        address _to,
        ProductStatus _newStatus,
        string memory _notes
    )
        external
        nonReentrant
        whenNotPaused
    {
        require(_to != address(0), "Invalid recipient");
        require(products[_productId].currentOwner == msg.sender, "Not owner");
        require(participants[_to].isActive, "Recipient not active");

        Product storage product = products[_productId];
        ProductStatus oldStatus = product.status;

        require(_isValidStatusTransition(oldStatus, _newStatus), "Invalid status transition");

        product.currentOwner = _to;
        product.status = _newStatus;
        product.updatedAt = block.timestamp;

        _removeFromParticipantProducts(msg.sender, _productId);
        participants[_to].productsOwned.push(_productId);

        _addToHistory(_productId, msg.sender, _to, _newStatus, _notes);

        emit ProductTransferred(_productId, msg.sender, _to, _newStatus);
        emit ProductStatusUpdated(_productId, oldStatus, _newStatus);
    }

    function updateProductStatus(uint256 _productId, ProductStatus _newStatus) external nonReentrant whenNotPaused {
        require(products[_productId].currentOwner == msg.sender, "Not owner");
        Product storage product = products[_productId];
        ProductStatus oldStatus = product.status;
        product.status = _newStatus;
        emit ProductStatusUpdated(_productId, oldStatus, _newStatus);
    }

    /////////////////////////////
    //INTERNAL FUNCTIONS     ////
    /////////////////////////////

    function _addToHistory(
        uint256 _productId,
        address _from,
        address _to,
        ProductStatus _status,
        string memory _notes
    )
        internal
    {
        Product storage product = products[_productId];
        uint256 historyIndex = product.historyCount++;

        ProductHistory storage history = product.history[historyIndex];
        history.from = _from;
        history.to = _to;
        history.timestamp = block.timestamp;
        history.status = _status;
        history.notes = _notes;
    }

    function _removeFromParticipantProducts(address participant, uint256 productId) internal {
        uint256[] storage ownedProducts = participants[participant].productsOwned;
        for (uint256 i = 0; i < ownedProducts.length; i++) {
            if (ownedProducts[i] == productId) {
                if (i != ownedProducts.length - 1) {
                    ownedProducts[i] = ownedProducts[ownedProducts.length - 1];
                }
                ownedProducts.pop();
                break;
            }
        }
    }

    function _isValidStatusTransition(ProductStatus _current, ProductStatus _new) internal pure returns (bool) {
        if (_current == ProductStatus.Created) {
            return _new == ProductStatus.ShippedByMfg;
        }
        if (_current == ProductStatus.ShippedByMfg) {
            return _new == ProductStatus.ReceivedByDist;
        }
        if (_current == ProductStatus.ReceivedByDist) {
            return _new == ProductStatus.ShippedByDist;
        }
        if (_current == ProductStatus.ShippedByDist) {
            return _new == ProductStatus.ReceivedByRet;
        }
        if (_current == ProductStatus.ReceivedByRet) {
            return _new == ProductStatus.Sold;
        }
        return false;
    }
    //////////////////////////////////
    //EXTERNAL VIEW FUNCTIONS     ////
    //////////////////////////////////

    function getProduct(uint256 _productId)
        external
        view
        returns (
            uint256 id,
            string memory name,
            string memory description,
            uint256 price,
            address manufacturer,
            address currentOwner,
            ProductStatus status,
            string memory locationData,
            uint256 createdAt,
            uint256 updatedAt
        )
    {
        Product storage product = products[_productId];
        return (
            product.id,
            product.name,
            product.description,
            product.price,
            product.manufacturer,
            product.currentOwner,
            product.status,
            product.locationData,
            product.createdAt,
            product.updatedAt
        );
    }

    function getParticipant(address _participantAddress)
        external
        view
        returns (
            string memory name,
            string memory details,
            ParticipantType role,
            bool isActive,
            uint256[] memory productsOwned,
            uint256 registeredAt
        )
    {
        Participant storage participant = participants[_participantAddress];
        return (
            participant.name,
            participant.details,
            participant.role,
            participant.isActive,
            participant.productsOwned,
            participant.registeredAt
        );
    }

    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }
}
