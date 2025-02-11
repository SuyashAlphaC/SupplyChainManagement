export const ProductManagerAddress =
  "0x0cF57b92335Ad5133Df4730302FF505dcb7CD3B4";
export const QualityControlAddress =
  "0x5aD99C0D7Bcab7b63020c0bebDC9a7A3524593f8";
export const RoleManagerAddress = "0x1a7aa2C309Fd99b57007cd1d29511023Fafdb3d2";
export const RoleManagerABI = [
  {
    type: "function",
    name: "DISTRIBUTOR_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MANUFACTURER_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "RETAILER_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "assignRole",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "role", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getRoleMembers",
    inputs: [{ name: "role", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isDistributor",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isManufacturer",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isRetailer",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "role", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "RoleAssigned",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
];
export const ProductManagerABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "DISTRIBUTOR_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MANUFACTURER_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "RETAILER_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "assignRole",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "role", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createProduct",
    inputs: [
      { name: "_name", type: "string", internalType: "string" },
      { name: "_description", type: "string", internalType: "string" },
      { name: "_price", type: "uint256", internalType: "uint256" },
      { name: "_locationData", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getParticipant",
    inputs: [
      {
        name: "_participantAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "details", type: "string", internalType: "string" },
      {
        name: "role",
        type: "uint8",
        internalType: "enum SupplyChainStorage.ParticipantType",
      },
      { name: "isActive", type: "bool", internalType: "bool" },
      {
        name: "productsOwned",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      { name: "registeredAt", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getProduct",
    inputs: [{ name: "_productId", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "id", type: "uint256", internalType: "uint256" },
      { name: "name", type: "string", internalType: "string" },
      { name: "description", type: "string", internalType: "string" },
      { name: "price", type: "uint256", internalType: "uint256" },
      {
        name: "manufacturer",
        type: "address",
        internalType: "address",
      },
      {
        name: "currentOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "status",
        type: "uint8",
        internalType: "enum SupplyChainStorage.ProductStatus",
      },
      { name: "locationData", type: "string", internalType: "string" },
      { name: "createdAt", type: "uint256", internalType: "uint256" },
      { name: "updatedAt", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleMembers",
    inputs: [{ name: "role", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isDistributor",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isManufacturer",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isRetailer",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerParticipant",
    inputs: [
      {
        name: "_participantAddress",
        type: "address",
        internalType: "address",
      },
      { name: "_name", type: "string", internalType: "string" },
      { name: "_details", type: "string", internalType: "string" },
      {
        name: "_role",
        type: "uint8",
        internalType: "enum SupplyChainStorage.ParticipantType",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "role", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferProduct",
    inputs: [
      { name: "_productId", type: "uint256", internalType: "uint256" },
      { name: "_to", type: "address", internalType: "address" },
      {
        name: "_newStatus",
        type: "uint8",
        internalType: "enum SupplyChainStorage.ProductStatus",
      },
      { name: "_notes", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unpause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateProductStatus",
    inputs: [
      { name: "_productId", type: "uint256", internalType: "uint256" },
      {
        name: "_newStatus",
        type: "uint8",
        internalType: "enum SupplyChainStorage.ProductStatus",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ParticipantRegistered",
    inputs: [
      {
        name: "participantAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "role",
        type: "uint8",
        indexed: false,
        internalType: "enum SupplyChainStorage.ParticipantType",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProductCreated",
    inputs: [
      {
        name: "productId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "manufacturer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProductStatusUpdated",
    inputs: [
      {
        name: "productId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "oldStatus",
        type: "uint8",
        indexed: false,
        internalType: "enum SupplyChainStorage.ProductStatus",
      },
      {
        name: "newStatus",
        type: "uint8",
        indexed: false,
        internalType: "enum SupplyChainStorage.ProductStatus",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProductTransferred",
    inputs: [
      {
        name: "productId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "status",
        type: "uint8",
        indexed: false,
        internalType: "enum SupplyChainStorage.ProductStatus",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleAssigned",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
];

export const QualityControlABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_productManager",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getQualityChecks",
    inputs: [{ name: "productId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct QualityControl.QualityCheck[]",
        components: [
          {
            name: "inspector",
            type: "address",
            internalType: "address",
          },
          { name: "passed", type: "bool", internalType: "bool" },
          { name: "notes", type: "string", internalType: "string" },
          {
            name: "timestamp",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "performQualityCheck",
    inputs: [
      { name: "productId", type: "uint256", internalType: "uint256" },
      { name: "passed", type: "bool", internalType: "bool" },
      { name: "notes", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "productManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ProductManager",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "qualityChecks",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "inspector", type: "address", internalType: "address" },
      { name: "passed", type: "bool", internalType: "bool" },
      { name: "notes", type: "string", internalType: "string" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "QualityCheckPerformed",
    inputs: [
      {
        name: "productId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "inspector",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "passed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
];
