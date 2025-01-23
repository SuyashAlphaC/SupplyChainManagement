// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChainStorage {
    enum ProductStatus {
        Created,
        ShippedByMfg,
        ReceivedByDist,
        ShippedByDist,
        ReceivedByRet,
        Sold
    }

    enum ParticipantType {
        Manufacturer,
        Distributor,
        Retailer
    }

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        address manufacturer;
        address currentOwner;
        ProductStatus status;
        string locationData;
        mapping(uint256 => ProductHistory) history;
        uint256 historyCount;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct ProductHistory {
        address from;
        address to;
        uint256 timestamp;
        ProductStatus status;
        string notes;
    }

    struct Participant {
        address id;
        string name;
        string details;
        ParticipantType role;
        bool isActive;
        uint256[] productsOwned;
        uint256 registeredAt;
    }
}
