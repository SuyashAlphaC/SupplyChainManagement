// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//////////////////
//IMPORTS     ////
//////////////////

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract RoleManager is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");

    ///////////////////
    //EVENTS     //////
    ///////////////////

    event RoleAssigned(address indexed account, bytes32 indexed role);
    event RoleRevoked(address indexed account, bytes32 indexed role);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    ////////////////////////////
    //EXTERNAL FUNCTIONS    ////
    ////////////////////////////

    function assignRole(address account, bytes32 role) external onlyRole(ADMIN_ROLE) {
        require(account != address(0), "Invalid address");
        require(!hasRole(role, account), "Role already assigned");

        grantRole(role, account);
        emit RoleAssigned(account, role);
    }

    function revokeParticipantRole(address account, bytes32 role) external onlyRole(ADMIN_ROLE) {
        require(hasRole(role, account), "Role not assigned");

        revokeRole(role, account);
        emit RoleRevoked(account, role);
    }

    //////////////////////////////////
    //PUBLIC VIEW FUNCTIONS     //////
    //////////////////////////////////

    function isManufacturer(address account) public view returns (bool) {
        return hasRole(MANUFACTURER_ROLE, account);
    }

    function isDistributor(address account) public view returns (bool) {
        return hasRole(DISTRIBUTOR_ROLE, account);
    }

    function isRetailer(address account) public view returns (bool) {
        return hasRole(RETAILER_ROLE, account);
    }
}
