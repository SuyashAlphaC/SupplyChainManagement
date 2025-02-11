// // import React from 'react'
// // import { BackgroundBeamsWithCollision } from '../components/ui/background'
// // import { Label } from "../components/ui/label";
// // import { Input } from "../components/ui/input";
// // import { cn } from "../lib/utils";
// // import { Link } from 'react-router-dom';

// // const Register = () => {

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         console.log("Form submitted");
// //     };

// import React, { useState, useEffect } from "react";
// import { BackgroundBeamsWithCollision } from "../components/ui/background";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { cn } from "../lib/utils";
// import { Link } from "react-router-dom";
// import {
//   ProductManagerAddress,
//   ProductManagerABI,
//   QualityControlAddress,
//   QualityControlABI,
// } from "../contracts/constants";

// const { BrowserProvider, ethers } = require("ethers");
// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// const LabelInputContainer = ({ children, className }) => {
//   return (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );
// };

// //   return (
// //     <>
// //     <BackgroundBeamsWithCollision className={`p-5`}>
// //     <div className="max-w-md w-full mx-auto  md:rounded-2xl p-4 md:p-8 shadow-input bg-[#708090] z-[10] p-2 rounded-[20px]">
// //       <h2 className="font-bold text-[25px] text-neutral-200 text-center ">
// //         Create Product at Secure X
// //       </h2>
// //       <form className="my-8" onSubmit={handleSubmit}>
// //           <LabelInputContainer className={"mb-4"}>
// //             <Label htmlFor="name">Product Name</Label>
// //             <Input id="name" placeholder="Product Name" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
// //           </LabelInputContainer>
// //         <LabelInputContainer className="mb-8">
// //         <Label htmlFor="description">Product Description</Label>
// //         <textarea
// //             id="description"
// //             placeholder="Describe the Product"
// //             className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md w-full h-32 resize-none"
// //         />
// //         </LabelInputContainer>
// //         <LabelInputContainer className="mb-4">
// //           <Label htmlFor="price">Product Price</Label>
// //           <Input id="price" placeholder="Price of the Product" type="number" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
// //         </LabelInputContainer>
// //         <LabelInputContainer className="mb-4">
// //           <Label htmlFor="location">Location</Label>
// //           <Input id="location" placeholder="Manufactured At" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
// //         </LabelInputContainer>
// //         <button
// //           className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
// //           type="submit"
// //         >
// //           Create Product &rarr;
// //           <BottomGradient />
// //         </button>

// //         <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
// //       </form>
// //       <div className='text-center font-bold'>
// //         <Link to="/">
// //             <span className="text-white cursor-pointer text-center font-bold"> Return To Home </span>
// //         </Link>
// //       </div>
// //     </div>
// //         </BackgroundBeamsWithCollision>
// //     </>
// //   )
// // }

// // export default Register;

// const contractAddress = ProductManagerAddress; // Replace with your contract address
// const contractABI = ProductManagerABI; // Replace with your contract ABI

// const CreateProduct = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     location: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     listenToProductCreatedEvent();
//   }, []);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   // Function to connect to smart contract
//   async function getContract() {
//     if (!window.ethereum) {
//       setError("MetaMask is not installed!");
//       throw new Error("MetaMask not installed");
//     }

//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = provider.getSigner();
//     return new ethers.Contract(contractAddress, contractABI, signer);
//   }

//   // Check if user has MANUFACTURER_ROLE before creating a product
//   async function checkManufacturerRole() {
//     try {
//       const contract = await getContract();
//       const signer = await contract.signer.getAddress();
//       const isManufacturer = await contract.hasRole(
//         ethers.id("MANUFACTURER_ROLE"),
//         signer
//       );

//       if (!isManufacturer) {
//         setError("You are not a Manufacturer!");
//         throw new Error("Unauthorized");
//       }
//     } catch (err) {
//       console.error("Role Check Failed:", err);
//       throw err;
//     }
//   }

//   // Listen to the "ProductCreated" event
//   async function listenToProductCreatedEvent() {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const contract = new ethers.Contract(
//         contractAddress,
//         contractABI,
//         provider
//       );

//       contract.on("ProductCreated", (productId, name, manufacturer) => {
//         console.log(
//           `🟢 Product Created: ID: ${productId}, Name: ${name}, By: ${manufacturer}`
//         );
//         setSuccessMessage(
//           `Product "${name}" successfully created with ID ${productId}`
//         );
//       });
//     } catch (error) {
//       console.error("Event Listener Failed:", error);
//     }
//   }

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.name ||
//       !formData.description ||
//       !formData.price ||
//       !formData.location
//     ) {
//       setError("All fields are required!");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setSuccessMessage("");

//       // Ensure user is a Manufacturer
//       await checkManufacturerRole();

//       // Interact with the contract
//       const contract = await getContract();
//       const tx = await contract.createProduct(
//         formData.name,
//         formData.description,
//         ethers.parseUnits(formData.price, "wei"), // Convert ETH to Wei
//         formData.location
//       );

//       console.log("Transaction Sent:", tx.hash);
//       alert("Transaction Sent. Waiting for confirmation...");

//       await tx.wait();
//       alert("Transaction Confirmed!");

//       // Reset form
//       setFormData({ name: "", description: "", price: "", location: "" });
//     } catch (error) {
//       console.error("Product creation failed:", error);
//       setError("Transaction failed. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <BackgroundBeamsWithCollision className={`p-5`}>
//         <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 shadow-input bg-[#708090] z-[10] p-2 rounded-[20px]">
//           <h2 className="font-bold text-[25px] text-neutral-200 text-center">
//             Create Product at Secure X
//           </h2>

//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {successMessage && (
//             <p className="text-green-500 text-center">{successMessage}</p>
//           )}

//           <form className="my-8" onSubmit={handleSubmit}>
//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="name">Product Name</Label>
//               <Input
//                 id="name"
//                 placeholder="Product Name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </LabelInputContainer>

//             <LabelInputContainer className="mb-8">
//               <Label htmlFor="description">Product Description</Label>
//               <textarea
//                 id="description"
//                 placeholder="Describe the Product"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="p-2 rounded-md w-full h-32 resize-none"
//               />
//             </LabelInputContainer>

//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="price">Product Price (ETH)</Label>
//               <Input
//                 id="price"
//                 placeholder="Price in ETH"
//                 type="number"
//                 value={formData.price}
//                 onChange={handleChange}
//               />
//             </LabelInputContainer>

//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="location">Location</Label>
//               <Input
//                 id="location"
//                 placeholder="Manufactured At"
//                 type="text"
//                 value={formData.location}
//                 onChange={handleChange}
//               />
//             </LabelInputContainer>

//             <button
//               className="bg-gradient-to-br from-black to-black block w-full text-white rounded-md h-10 font-medium shadow-md"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Creating..." : "Create Product →"}
//             </button>
//           </form>

//           <div className="text-center font-bold">
//             <Link to="/">
//               <span className="text-white cursor-pointer">Return To Home</span>
//             </Link>
//           </div>
//         </div>
//       </BackgroundBeamsWithCollision>
//     </>
//   );
// };

// export default CreateProduct;
// import React, { useState, useEffect } from "react";
// import { BackgroundBeamsWithCollision } from "../components/ui/background";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { cn } from "../lib/utils";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ProductManagerAddress,
//   ProductManagerABI,
//   RoleManagerAddress,
//   RoleManagerABI,
// } from "../contracts/constants";
// import { toast } from "react-hot-toast";
// import { ethers } from "ethers";

// const CreateProduct = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     location: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     initializeContract();
//     return () => {
//       if (contract) {
//         contract.removeAllListeners();
//       }
//     };
//   }, []);

//   const LabelInputContainer = ({ children, className }) => {
//     return (
//       <div className={cn("flex flex-col space-y-2 w-full", className)}>
//         {children}
//       </div>
//     );
//   };

//   const initializeContract = async () => {
//     try {
//       if (!window.ethereum) {
//         throw new Error("Please install MetaMask to use this feature");
//       }

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const productManagerContract = new ethers.Contract(
//         ProductManagerAddress,
//         ProductManagerABI,
//         signer
//       );
//       setContract(productManagerContract);
//     } catch (err) {
//       console.error("Contract initialization failed:", err);
//       setError(
//         "Failed to initialize contract. Please check your wallet connection."
//       );
//     }
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) throw new Error("Product name is required");
//     if (!formData.description.trim())
//       throw new Error("Product description is required");
//     if (!formData.price || formData.price <= 0)
//       throw new Error("Valid product price is required");
//     if (!formData.location.trim())
//       throw new Error("Manufacturing location is required");
//   };

//   // const checkManufacturerRole = async () => {
//   //   try {
//   //     const provider = new ethers.BrowserProvider(window.ethereum);
//   //     const signer = await provider.getSigner();
//   //     const roleManagerContract = new ethers.Contract(
//   //       RoleManagerAddress,
//   //       RoleManagerABI,
//   //       signer
//   //     );
//   //     const signerAddress = await signer.getAddress();
//   //     const isManufacturer = await roleManagerContract.isManufacturer(
//   //       signerAddress
//   //     );
//   //     if (!isManufacturer) {
//   //       throw new Error("You don't have manufacturer permissions");
//   //     }
//   //   } catch (err) {
//   //     console.error("Role check failed:", err);
//   //     throw new Error("Failed to verify manufacturer role");
//   //   }
//   // };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccessMessage("");

//     try {
//       validateForm();
//       // await checkManufacturerRole();

//       const tx = await contract.createProduct(
//         formData.name,
//         formData.description,
//         ethers.parseEther(formData.price),
//         formData.location
//       );

//       toast.loading("Creating product...");
//       await tx.wait();
//       setFormData({ name: "", description: "", price: "", location: "" });
//       toast.success("Product created successfully");
//     } catch (err) {
//       console.error("Product creation failed:", err);
//       setError(err.message || "Failed to create product. Please try again.");
//       toast.error(err.message || "Transaction failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <BackgroundBeamsWithCollision className="p-5">
//       <div className="max-w-md w-full mx-auto p-4 md:p-8 bg-[#708090] rounded-2xl shadow-lg">
//         <h2 className="font-bold text-[25px] text-white text-center">
//           Create New Product
//         </h2>
//         {error && (
//           <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
//         )}
//         {successMessage && (
//           <div className="bg-green-500 text-white p-3 rounded mb-4">
//             {successMessage}
//           </div>
//         )}
//         <form className="my-8" onSubmit={handleSubmit}>
//           {Object.keys(formData).map((key) => (
//             <LabelInputContainer key={key} className="mb-4">
//               <Label htmlFor={key}>
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </Label>
//               <Input
//                 id={key}
//                 type={key === "price" ? "number" : "text"}
//                 placeholder={`Enter ${key}`}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 className="bg-gray-200 text-gray-900 p-2 rounded-md w-full"
//               />
//             </LabelInputContainer>
//           ))}
//           <button
//             className="bg-black text-white w-full p-2 rounded-md hover:bg-gray-800"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Creating Product..." : "Create Product"}
//           </button>
//         </form>
//         <div className="text-center font-bold">
//           <Link to="/dashboard" className="text-white hover:text-gray-300">
//             Return To Dashboard
//           </Link>
//         </div>
//       </div>
//     </BackgroundBeamsWithCollision>
//   );
// };

// export default CreateProduct;

import React, { useEffect, useState } from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import {
  ProductManagerAddress,
  ProductManagerABI,
} from "../contracts/constants";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    initializeContract();
  }, []);

  const LabelInputContainer = ({ children, className }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };

  const initializeContract = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to use this feature");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const productManagerContract = new ethers.Contract(
        ProductManagerAddress,
        ProductManagerABI,
        signer
      );
      setContract(productManagerContract);
    } catch (err) {
      console.error("Contract initialization failed:", err);
      setError(
        "Failed to initialize contract. Please check your wallet connection."
      );
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) throw new Error("Product name is required");
    if (!formData.description.trim())
      throw new Error("Product description is required");
    if (!formData.price || formData.price <= 0)
      throw new Error("Valid product price is required");
    if (!formData.location.trim())
      throw new Error("Manufacturing location is required");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      validateForm();

      const tx = await contract.createProduct(
        formData.name,
        formData.description,
        ethers.parseEther(formData.price),
        formData.location
      );

      toast.loading("Creating product...");
      await tx.wait();
      setFormData({ name: "", description: "", price: "", location: "" });
      toast.success("Product created successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Product creation failed:", err);
      setError(err.message || "Failed to create product. Please try again.");
      toast.error(err.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundBeamsWithCollision className="p-5">
      <div className="max-w-md w-full mx-auto p-4 md:p-8 bg-[#708090] rounded-2xl shadow-lg">
        <h2 className="font-bold text-[25px] text-white text-center">
          Create New Product
        </h2>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
        )}
        <form className="my-8" onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <LabelInputContainer key={key} className="mb-4">
              <Label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Label>
              <Input
                id={key}
                type={key === "price" ? "number" : "text"}
                placeholder={`Enter ${key}`}
                value={formData[key]}
                onChange={handleChange}
                className="bg-gray-200 text-gray-900 p-2 rounded-md w-full"
              />
            </LabelInputContainer>
          ))}
          <button
            className="bg-black text-white w-full p-2 rounded-md hover:bg-gray-800"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
        <div className="text-center font-bold">
          <Link to="/dashboard" className="text-white hover:text-gray-300">
            Return To Dashboard
          </Link>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default CreateProduct;
