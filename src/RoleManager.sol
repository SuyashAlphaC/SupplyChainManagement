// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RoleManager {
    // Role definitions
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");

    // Mapping to track roles for each address
    mapping(address => mapping(bytes32 => bool)) private _roles;

    // Mapping to track addresses with a specific role
    mapping(bytes32 => address[]) private _roleMembers;

    ///////////////////
    //EVENTS     //////
    ///////////////////

    event RoleAssigned(address indexed account, bytes32 indexed role);
    event RoleRevoked(address indexed account, bytes32 indexed role);

    ////////////////////////////
    //EXTERNAL FUNCTIONS    ////
    ////////////////////////////

    function assignRole(address account, bytes32 role) external {
        require(account != address(0), "Invalid address");
        require(!hasRole(role, account), "Role already assigned");
        require(role == MANUFACTURER_ROLE || role == DISTRIBUTOR_ROLE || role == RETAILER_ROLE, "Invalid role");

        _assignRole(account, role);
    }

    function revokeRole(address account, bytes32 role) external {
        require(hasRole(role, account), "Role not assigned");

        _revokeRole(account, role);
    }

    ////////////////////
    //INTERNAL FUNCTIONS/////
    ////////////////////

    function _assignRole(address account, bytes32 role) internal {
        if (!_roles[account][role]) {
            _roles[account][role] = true;
            _roleMembers[role].push(account);
            emit RoleAssigned(account, role);
        }
    }

    function _revokeRole(address account, bytes32 role) internal {
        if (_roles[account][role]) {
            _roles[account][role] = false;

            // Remove from role members array
            address[] storage members = _roleMembers[role];
            for (uint256 i = 0; i < members.length; i++) {
                if (members[i] == account) {
                    members[i] = members[members.length - 1];
                    members.pop();
                    break;
                }
            }

            emit RoleRevoked(account, role);
        }
    }

    //////////////////////////////////
    //PUBLIC VIEW FUNCTIONS     //////
    //////////////////////////////////

    function hasRole(bytes32 role, address account) public view returns (bool) {
        return _roles[account][role];
    }

    function isManufacturer(address account) public view returns (bool) {
        return hasRole(MANUFACTURER_ROLE, account);
    }

    function isDistributor(address account) public view returns (bool) {
        return hasRole(DISTRIBUTOR_ROLE, account);
    }

    function isRetailer(address account) public view returns (bool) {
        return hasRole(RETAILER_ROLE, account);
    }

    function getRoleMembers(bytes32 role) public view returns (address[] memory) {
        return _roleMembers[role];
    }
}
