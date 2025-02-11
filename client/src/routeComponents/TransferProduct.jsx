// // import React from 'react'
// // import { BackgroundBeamsWithCollision } from '../components/ui/background'
// // import { Label } from "../components/ui/label";
// // import { Input } from "../components/ui/input";
// // import { cn } from "../lib/utils";
// // import { Select, Option } from "@material-tailwind/react";
// // import { Link,useNavigate } from 'react-router-dom';

// // const TransferProduct = () => {

// //     const navigate = useNavigate();

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         navigate("/dashboard");
// //         console.log("Form submitted");
// //     };

// //     const BottomGradient = () => {
// //         return (
// //           <>
// //             <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
// //             <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
// //           </>
// //         );
// //       };

// //       const LabelInputContainer = ({
// //         children,
// //         className,
// //       }) => {
// //         return (
// //           <div className={cn("flex flex-col space-y-2 w-full", className)}>
// //             {children}
// //           </div>
// //         );
// //       };

// //   return (
// //     <>
// //     <BackgroundBeamsWithCollision className={`p-5`}>
// //     <div className="max-w-md w-full mx-auto  md:rounded-2xl p-4 md:p-8 bg-[#708090] z-[10] shadow-lg rounded-[20px]">
// //       <h2 className="font-bold text-[25px] text-neutral-200 text-center ">
// //       Transfer Product Ownership
// //       </h2>
// //       <form className="my-8" onSubmit={handleSubmit}>
// //                     <LabelInputContainer className="mb-4">
// //                       <Label htmlFor="address"> Receiver Wallet Address</Label>
// //                       <Input id="address" placeholder="Your Wallet Address" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
// //                     </LabelInputContainer>
// //                     <LabelInputContainer className="mb-4">
// //                    <Label htmlFor="productId">Product Id</Label>
// //                       <Input id="productId" placeholder="Enter Product ID" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
// //                     </LabelInputContainer>
// //                     <button
// //                       className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
// //                       type="submit"
// //                     >
// //                       Transfer &rarr;
// //                       <BottomGradient />
// //                     </button>

// //             <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
// //         </form>
// //       <div className='text-center font-bold'>
// //         Return to back{" "}&nbsp;
// //         <Link to="/">
// //             <span className="text-white cursor-pointer text-center font-bold"> Home </span>
// //         </Link>
// //       </div>
// //     </div>
// //         </BackgroundBeamsWithCollision>
// //     </>
// //   )
// // }

// // export default TransferProduct;

// import React, { useState, useEffect } from "react";

// import { BackgroundBeamsWithCollision } from "../components/ui/background";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { cn } from "../lib/utils";
// import { Select, Option } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ProductManagerAddress,
//   ProductManagerABI,
//   QualityControlAddress,
//   QualityControlABI,
// } from "../contracts/constants";

// // Import your contract ABI
// const { ethers } = require("ethers");

// const TransferProduct = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [userRole, setUserRole] = useState(null);
//   const [statusOptions, setStatusOptions] = useState([]);
//   const [formData, setFormData] = useState({
//     receiverAddress: "",
//     productId: "",
//     newStatus: "",
//     notes: "",
//   });

//   // Contract address - replace with your deployed contract address
//   const PRODUCT_MANAGER_ADDRESS = ProductManagerAddress;

//   useEffect(() => {
//     console.log(ethers);

//     checkUserRole();
//   }, []);

//   const checkUserRole = async () => {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = provider.getSigner();
//       const address = await signer.getAddress();

//       const contract = new ethers.Contract(
//         PRODUCT_MANAGER_ADDRESS,
//         ProductManagerABI,
//         provider
//       );

//       // Check user roles
//       const isManufacturer = await contract.isManufacturer(address);
//       const isDistributor = await contract.isDistributor(address);
//       const isRetailer = await contract.isRetailer(address);

//       if (isManufacturer) {
//         setUserRole("Manufacturer");
//         setStatusOptions(["ShippedByMfg"]);
//       } else if (isDistributor) {
//         setUserRole("Distributor");
//         setStatusOptions(["ReceivedByDist", "ShippedByDist"]);
//       } else if (isRetailer) {
//         setUserRole("Retailer");
//         setStatusOptions(["ReceivedByRet", "Sold"]);
//       }
//     } catch (error) {
//       console.error("Error checking user role:", error);
//       setError(
//         "Error checking user role. Please make sure you're connected to MetaMask."
//       );
//     }
//   };

//   const getStatusValue = (statusString) => {
//     const statusMap = {
//       ShippedByMfg: 1,
//       ReceivedByDist: 2,
//       ShippedByDist: 3,
//       ReceivedByRet: 4,
//       Sold: 5,
//     };
//     return statusMap[statusString];
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleStatusChange = (value) => {
//     setFormData({
//       ...formData,
//       newStatus: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = provider.getSigner();

//       const contract = new ethers.Contract(
//         PRODUCT_MANAGER_ADDRESS,
//         ProductManagerABI.abi,
//         signer
//       );

//       // Validate receiver address
//       if (!ethers.isAddress(formData.receiverAddress)) {
//         throw new Error("Invalid receiver address");
//       }

//       // Get product details to verify ownership
//       const product = await contract.getProduct(formData.productId);
//       const currentAddress = await signer.getAddress();

//       if (product.currentOwner.toLowerCase() !== currentAddress.toLowerCase()) {
//         throw new Error("You don't own this product");
//       }

//       // Perform transfer
//       const tx = await contract.transferProduct(
//         formData.productId,
//         formData.receiverAddress,
//         getStatusValue(formData.newStatus),
//         formData.notes || "Product transferred"
//       );

//       await tx.wait();
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error transferring product:", error);
//       setError(
//         error.message || "Error transferring product. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const BottomGradient = () => {
//     return (
//       <>
//         <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//         <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//       </>
//     );
//   };

//   const LabelInputContainer = ({ children, className }) => {
//     return (
//       <div className={cn("flex flex-col space-y-2 w-full", className)}>
//         {children}
//       </div>
//     );
//   };

//   return (
//     <>
//       <BackgroundBeamsWithCollision className={`p-5`}>
//         <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 bg-[#708090] z-[10] shadow-lg rounded-[20px]">
//           <h2 className="font-bold text-[25px] text-neutral-200 text-center">
//             Transfer Product Ownership
//           </h2>
//           {error && (
//             <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
//           )}
//           <form className="my-8" onSubmit={handleSubmit}>
//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="receiverAddress">Receiver Wallet Address</Label>
//               <Input
//                 id="receiverAddress"
//                 placeholder="Receiver's Ethereum Address"
//                 type="text"
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//                 value={formData.receiverAddress}
//                 onChange={handleInputChange}
//                 required
//               />
//             </LabelInputContainer>

//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="productId">Product Id</Label>
//               <Input
//                 id="productId"
//                 placeholder="Enter Product ID"
//                 type="text"
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//                 value={formData.productId}
//                 onChange={handleInputChange}
//                 required
//               />
//             </LabelInputContainer>

//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="newStatus">New Status</Label>
//               <Select
//                 id="newStatus"
//                 value={formData.newStatus}
//                 onChange={handleStatusChange}
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//                 required
//               >
//                 {statusOptions.map((status) => (
//                   <Option key={status} value={status}>
//                     {status}
//                   </Option>
//                 ))}
//               </Select>
//             </LabelInputContainer>

//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="notes">Transfer Notes</Label>
//               <Input
//                 id="notes"
//                 placeholder="Add any notes about the transfer"
//                 type="text"
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//                 value={formData.notes}
//                 onChange={handleInputChange}
//               />
//             </LabelInputContainer>

//             <button
//               className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Processing..." : "Transfer →"}
//               <BottomGradient />
//             </button>

//             <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
//           </form>
//           <div className="text-center font-bold">
//             Return to &nbsp;
//             <Link to="/">
//               <span className="text-white cursor-pointer text-center font-bold">
//                 Home
//               </span>
//             </Link>
//           </div>
//         </div>
//       </BackgroundBeamsWithCollision>
//     </>
//   );
// };

// export default TransferProduct;
// import React, { useState, useEffect } from "react";
// import { BackgroundBeamsWithCollision } from "../components/ui/background";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { cn } from "../lib/utils";
// import { Select, Option } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ProductManagerAddress,
//   ProductManagerABI,
// } from "../contracts/constants";
// const { ethers } = require("ethers");

// const TransferProduct = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [userRole, setUserRole] = useState(null);
//   const [statusOptions, setStatusOptions] = useState([]);
//   const [formData, setFormData] = useState({
//     receiverAddress: "",
//     productId: "",
//     newStatus: "",
//     notes: "",
//   });

//   const PRODUCT_MANAGER_ADDRESS = ProductManagerAddress;

//   useEffect(() => {
//     checkUserRole();
//   }, []);

//   const checkUserRole = async () => {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();

//       const contract = new ethers.Contract(
//         PRODUCT_MANAGER_ADDRESS,
//         ProductManagerABI,
//         provider
//       );

//       const isManufacturer = await contract.isManufacturer(address);
//       const isDistributor = await contract.isDistributor(address);
//       const isRetailer = await contract.isRetailer(address);

//       if (isManufacturer) {
//         setUserRole("Manufacturer");
//         setStatusOptions(["ShippedByMfg"]);
//       } else if (isDistributor) {
//         setUserRole("Distributor");
//         setStatusOptions(["ReceivedByDist", "ShippedByDist"]);
//       } else if (isRetailer) {
//         setUserRole("Retailer");
//         setStatusOptions(["ReceivedByRet", "Sold"]);
//       }
//     } catch (error) {
//       console.error("Error checking user role:", error);
//       setError(
//         "Error checking user role. Please make sure you're connected to MetaMask."
//       );
//     }
//   };

//   const getStatusValue = (statusString) => {
//     const statusMap = {
//       ShippedByMfg: 1,
//       ReceivedByDist: 2,
//       ShippedByDist: 3,
//       ReceivedByRet: 4,
//       Sold: 5,
//     };
//     return statusMap[statusString];
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleStatusChange = (value) => {
//     setFormData({
//       ...formData,
//       newStatus: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const contract = new ethers.Contract(
//         PRODUCT_MANAGER_ADDRESS,
//         ProductManagerABI,
//         signer
//       );

//       if (!ethers.isAddress(formData.receiverAddress)) {
//         throw new Error("Invalid receiver address");
//       }

//       const product = await contract.getProduct(formData.productId);
//       const currentAddress = await signer.getAddress();

//       if (product[5].toLowerCase() !== currentAddress.toLowerCase()) {
//         throw new Error("You don't own this product");
//       }

//       const tx = await contract.transferProduct(
//         Number(formData.productId),
//         formData.receiverAddress,
//         getStatusValue(formData.newStatus),
//         formData.notes || "Product transferred"
//       );

//       await tx.wait();
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error transferring product:", error);
//       setError(
//         error.message || "Error transferring product. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const BottomGradient = () => (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );

//   const LabelInputContainer = ({ children, className }) => (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );

//   return (
//     <BackgroundBeamsWithCollision className={`p-5`}>
//       <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 bg-[#708090] z-[10] shadow-lg rounded-[20px]">
//         <h2 className="font-bold text-[25px] text-neutral-200 text-center">
//           Transfer Product Ownership
//         </h2>
//         {error && (
//           <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
//         )}
//         <form className="my-8" onSubmit={handleSubmit}>
//           <LabelInputContainer className="mb-4">
//             <Label htmlFor="receiverAddress">Receiver Wallet Address</Label>
//             <Input
//               id="receiverAddress"
//               placeholder="Receiver's Ethereum Address"
//               type="text"
//               className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//               value={formData.receiverAddress}
//               onChange={handleInputChange}
//               required
//             />
//           </LabelInputContainer>

//           <LabelInputContainer className="mb-4">
//             <Label htmlFor="productId">Product Id</Label>
//             <Input
//               id="productId"
//               placeholder="Enter Product ID"
//               type="text"
//               className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//               value={formData.productId}
//               onChange={handleInputChange}
//               required
//             />
//           </LabelInputContainer>

//           <LabelInputContainer className="mb-4">
//             <Label htmlFor="newStatus">New Status</Label>
//             <Select
//               id="newStatus"
//               value={formData.newStatus}
//               onChange={handleStatusChange}
//               className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//               required
//             >
//               {statusOptions.map((status) => (
//                 <Option key={status} value={status}>
//                   {status}
//                 </Option>
//               ))}
//             </Select>
//           </LabelInputContainer>

//           <LabelInputContainer className="mb-4">
//             <Label htmlFor="notes">Transfer Notes</Label>
//             <Input
//               id="notes"
//               placeholder="Add any notes about the transfer"
//               type="text"
//               className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//               value={formData.notes}
//               onChange={handleInputChange}
//             />
//           </LabelInputContainer>

//           <button
//             className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Transfer →"}
//             <BottomGradient />
//           </button>

//           <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
//         </form>
//         <div className="text-center font-bold">
//           Return to &nbsp;
//           <Link to="/">
//             <span className="text-white cursor-pointer text-center font-bold">
//               Home
//             </span>
//           </Link>
//         </div>
//       </div>
//     </BackgroundBeamsWithCollision>
//   );
// };

// export default TransferProduct;
import React, { useState, useEffect } from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Select, Option } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ProductManagerAddress,
  ProductManagerABI,
} from "../contracts/constants";
const { ethers } = require("ethers");

const ProductStatusMap = {
  0: "Created",
  1: "ShippedByMfg",
  2: "ReceivedByDist",
  3: "ShippedByDist",
  4: "ReceivedByRet",
  5: "Sold",
};

const TransferProduct = () => {
  const { productId: routeProductId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    receiverAddress: "",
    productId: routeProductId || "",
    newStatus: "",
    notes: "",
  });

  const PRODUCT_MANAGER_ADDRESS = ProductManagerAddress;

  // New function to check recipient registration
  const checkRecipientRegistration = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        PRODUCT_MANAGER_ADDRESS,
        ProductManagerABI,
        provider
      );
      const participant = await contract.getParticipant(address);
      return participant[3]; // Check 'isActive' flag
    } catch (error) {
      console.error("Error checking recipient registration:", error);
      return false;
    }
  };

  useEffect(() => {
    checkUserRole();
    if (routeProductId) {
      fetchProductDetails();
    }
  }, [routeProductId]);

  const checkUserRole = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(
        PRODUCT_MANAGER_ADDRESS,
        ProductManagerABI,
        provider
      );

      const isManufacturer = await contract.isManufacturer(address);
      const isDistributor = await contract.isDistributor(address);
      const isRetailer = await contract.isRetailer(address);

      if (isManufacturer) {
        setUserRole("Manufacturer");
        setStatusOptions(["ShippedByMfg"]);
      } else if (isDistributor) {
        setUserRole("Distributor");
        setStatusOptions(["ReceivedByDist", "ShippedByDist"]);
      } else if (isRetailer) {
        setUserRole("Retailer");
        setStatusOptions(["ReceivedByRet", "Sold"]);
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      setError("Error checking user role. Please connect MetaMask.");
    }
  };

  const fetchProductDetails = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        PRODUCT_MANAGER_ADDRESS,
        ProductManagerABI,
        provider
      );

      const product = await contract.getProduct(routeProductId);
      setCurrentProduct({
        id: product[0].toString(),
        name: product[1],
        description: product[2],
        currentStatus: ProductStatusMap[Number(product[6])],
        currentOwner: product[5],
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to load product details");
    }
  };

  const getStatusValue = (statusString) => {
    const statusMap = {
      ShippedByMfg: 1,
      ReceivedByDist: 2,
      ShippedByDist: 3,
      ReceivedByRet: 4,
      Sold: 5,
    };
    return statusMap[statusString];
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleStatusChange = (value) => {
    setFormData({
      ...formData,
      newStatus: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Validate receiver address and registration
      if (!ethers.isAddress(formData.receiverAddress)) {
        throw new Error("Invalid receiver address");
      }

      const isRecipientRegistered = await checkRecipientRegistration(
        formData.receiverAddress
      );
      if (!isRecipientRegistered) {
        throw new Error("Recipient must be registered in the system");
      }

      const contract = new ethers.Contract(
        PRODUCT_MANAGER_ADDRESS,
        ProductManagerABI,
        signer
      );

      const tx = await contract.transferProduct(
        Number(formData.productId),
        formData.receiverAddress,
        getStatusValue(formData.newStatus),
        formData.notes || "Product transferred"
      );

      await tx.wait();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error transferring product:", error);
      setError(
        error.message || "Error transferring product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const BottomGradient = () => (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );

  return (
    <BackgroundBeamsWithCollision className="p-5">
      <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 bg-[#708090] z-10 shadow-lg rounded-[20px]">
        <h2 className="font-bold text-[25px] text-neutral-200 text-center">
          Transfer Product Ownership
        </h2>

        {currentProduct && (
          <div className="bg-white/10 rounded-lg p-3 mb-4 text-white">
            <p>Product: {currentProduct.name}</p>
            <p>Current Status: {currentProduct.currentStatus}</p>
            <p className="truncate">
              Current Owner: {currentProduct.currentOwner}
            </p>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
        )}

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 w-full mb-4">
            <Label htmlFor="receiverAddress">Receiver Wallet Address</Label>
            <Input
              id="receiverAddress"
              placeholder="Receiver's Ethereum Address"
              type="text"
              className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.receiverAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col space-y-2 w-full mb-4">
            <Label htmlFor="productId">Product Id</Label>
            <Input
              id="productId"
              placeholder="Enter Product ID"
              type="text"
              className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.productId}
              onChange={handleInputChange}
              required
              readOnly={!!routeProductId}
            />
          </div>

          <div className="flex flex-col space-y-2 w-full mb-4">
            <Label htmlFor="newStatus">New Status</Label>
            <Select
              id="newStatus"
              value={formData.newStatus}
              onChange={handleStatusChange}
              className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            >
              {statusOptions.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col space-y-2 w-full mb-4">
            <Label htmlFor="notes">Transfer Notes</Label>
            <Input
              id="notes"
              placeholder="Add any notes about the transfer"
              type="text"
              className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-input cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Transfer →"}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>

        <div className="text-center font-bold">
          Return to{" "}
          <Link to="/dashboard" className="text-white cursor-pointer">
            Dashboard
          </Link>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default TransferProduct;
