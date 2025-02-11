// import React from "react";
// import { BackgroundBeamsWithCollision } from "../components/ui/background";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { cn } from "../lib/utils";
// import { Select, Option } from "@material-tailwind/react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted");
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
//         <div className="max-w-md w-full mx-auto  md:rounded-2xl p-4 md:p-8 shadow-input bg-[#708090] z-[10] p-2 rounded-[20px]">
//           <h2 className="font-bold text-[30px] text-neutral-200 text-center ">
//             Welcome to Secure X
//           </h2>
//           <form className="my-8" onSubmit={handleSubmit}>
//             <LabelInputContainer className={"mb-4"}>
//               <Label htmlFor="name">Your Name</Label>
//               <Input
//                 id="name"
//                 placeholder="Your Name"
//                 type="text"
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//               />
//             </LabelInputContainer>
//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="address">Address</Label>
//               <Input
//                 id="address"
//                 placeholder="Your Wallet Address"
//                 type="text"
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//               />
//             </LabelInputContainer>
//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="role">Role</Label>
//               <Select
//                 id="role"
//                 label="Select Role"
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//                 placeholder="Select Role"
//               >
//                 <Option value="manufacturer" className="">
//                   Manufacturer
//                 </Option>
//                 <Option value="distributor" className="">
//                   Distributor
//                 </Option>
//                 <Option value="retailer" className="">
//                   Retailer
//                 </Option>
//               </Select>
//             </LabelInputContainer>
//             <LabelInputContainer className="mb-8">
//               <Label htmlFor="userIntroduction">
//                 Tell Us A Bit About Yourself
//               </Label>
//               <textarea
//                 id="userIntroduction"
//                 placeholder="Write something about yourself..."
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md w-full h-32 resize-none"
//               />
//             </LabelInputContainer>

//             <button
//               className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//               type="submit"
//             >
//               Register &rarr;
//               <BottomGradient />
//             </button>

//             <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
//           </form>
//           <div className="text-center font-bold">
//             Already Have an Account? &nbsp;
//             <Link to="/login">
//               <span className="text-white cursor-pointer text-center font-bold">
//                 {" "}
//                 Login{" "}
//               </span>
//             </Link>
//           </div>
//         </div>
//       </BackgroundBeamsWithCollision>
//     </>
//   );
// };

// export default Register;
// import React, { useState, useEffect } from "react";
// import { BackgroundBeamsWithCollision } from "../components/ui/background";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { cn } from "../lib/utils";
// import { Select, Option } from "@material-tailwind/react";
// import { Link } from "react-router-dom";
// import {
//   ProductManagerAddress,
//   ProductManagerABI,
// } from "../contracts/constants";
// const { ethers } = require("ethers");

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     role: "",
//     details: "",
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getWalletAddress();
//   }, []);

//   // Automatically fetch wallet address when MetaMask is connected
//   const getWalletAddress = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setFormData((prev) => ({ ...prev, address }));
//       } catch (error) {
//         console.warn("MetaMask not connected:", error);
//       }
//     }
//   };

//   // Handle form input change
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   // Handle role selection
//   const handleRoleChange = (value) => {
//     setFormData((prev) => ({ ...prev, role: value }));
//   };

//   // Function to connect to smart contract
//   async function getContract() {
//     if (!window.ethereum) {
//       alert("MetaMask is not installed!");
//       throw new Error("MetaMask not installed");
//     }

//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();
//     return new ethers.Contract(
//       ProductManagerAddress,
//       ProductManagerABI,
//       signer
//     );
//   }

//   // Map frontend role to contract role enum
//   const mapRoleToEnum = (role) => {
//     switch (role) {
//       case "manufacturer":
//         return 0; // Assuming 0 is Manufacturer in the contract
//       case "distributor":
//         return 1; // Assuming 1 is Distributor in the contract
//       case "retailer":
//         return 2; // Assuming 2 is Retailer in the contract
//       default:
//         throw new Error("Invalid role");
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.address || !formData.role) {
//       alert("Name, Address, and Role are required!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const contract = await getContract();
//       const roleEnum = mapRoleToEnum(formData.role);
//       const tx = await contract.registerParticipant(
//         formData.address,
//         formData.name,
//         formData.details || "Registered Participant",
//         roleEnum
//       );
//       await contract.grantRole(
//         ethers.id("MANUFACTURER_ROLE"),
//         formData.address
//       );
//       console.log("Transaction Sent:", tx.hash);
//       alert("Transaction Sent. Waiting for confirmation...");

//       await tx.wait();
//       alert("Participant Registered Successfully!");

//       // Reset form
//       setFormData({
//         name: "",
//         address: formData.address,
//         role: "",
//         details: "",
//       });
//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert(`Registration failed: ${error.message}`);
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
//     <>
//       <BackgroundBeamsWithCollision className="p-5">
//         <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 shadow-input bg-[#708090] z-[10] p-2 rounded-[20px]">
//           <h2 className="font-bold text-[30px] text-neutral-200 text-center">
//             Welcome to Secure X
//           </h2>
//           <form className="my-8" onSubmit={handleSubmit}>
//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="name">Your Name</Label>
//               <Input
//                 id="name"
//                 placeholder="Your Name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//               />
//             </LabelInputContainer>

//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="address">Wallet Address</Label>
//               <Input
//                 id="address"
//                 placeholder="Your Wallet Address"
//                 type="text"
//                 value={formData.address}
//                 disabled // Prevent manual editing
//                 className="bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
//               />
//             </LabelInputContainer>

//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="role">Role</Label>
//               <Select
//                 id="role"
//                 label="Select Role"
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//                 placeholder="Select Role"
//                 onChange={handleRoleChange}
//               >
//                 <Option value="manufacturer">Manufacturer</Option>
//                 <Option value="distributor">Distributor</Option>
//                 <Option value="retailer">Retailer</Option>
//               </Select>
//             </LabelInputContainer>

//             <LabelInputContainer className="mb-8">
//               <Label htmlFor="details">Details (Optional)</Label>
//               <textarea
//                 id="details"
//                 placeholder="Additional details about your organization..."
//                 value={formData.details}
//                 onChange={handleChange}
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md w-full h-32 resize-none"
//               />
//             </LabelInputContainer>

//             <button
//               className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Registering..." : "Register →"}
//               <BottomGradient />
//             </button>

//             <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
//           </form>
//           <div className="text-center font-bold">
//             Already Have an Account?{" "}
//             <Link to="/login">
//               <span className="text-white cursor-pointer text-center font-bold">
//                 {" "}
//                 Login{" "}
//               </span>
//             </Link>
//           </div>
//         </div>
//       </BackgroundBeamsWithCollision>
//     </>
//   );
// };

// export default Register;
import React, { useState, useEffect } from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  ProductManagerAddress,
  ProductManagerABI,
} from "../contracts/constants";
const { ethers } = require("ethers");

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    role: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWalletAddress();
  }, []);

  const getWalletAddress = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setFormData((prev) => ({ ...prev, address }));
      } catch (error) {
        console.warn("MetaMask not connected:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  async function getContract() {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      throw new Error("MetaMask not installed");
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(
      ProductManagerAddress,
      ProductManagerABI,
      signer
    );
  }

  const mapRoleToEnum = (role) => {
    switch (role) {
      case "manufacturer":
        return 0;
      case "distributor":
        return 1;
      case "retailer":
        return 2;
      default:
        throw new Error("Invalid role");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.role) {
      alert("Name, Address, and Role are required!");
      return;
    }

    try {
      setLoading(true);
      const contract = await getContract();
      const roleEnum = mapRoleToEnum(formData.role);
      const tx = await contract.registerParticipant(
        formData.address,
        formData.name,
        formData.details || "Registered Participant",
        roleEnum
      );

      console.log("Transaction Sent:", tx.hash);
      alert("Transaction Sent. Waiting for confirmation...");

      await tx.wait();
      alert("Participant Registered Successfully!");

      setFormData({
        name: "",
        address: formData.address,
        role: "",
        details: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      alert(`Registration failed: ${error.message}`);
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
  const LabelInputContainer = ({ children, className }) => (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );

  return (
    <>
      <BackgroundBeamsWithCollision className="p-5">
        <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 shadow-input bg-[#708090] z-[10] p-2 rounded-[20px]">
          <h2 className="font-bold text-[30px] text-neutral-200 text-center">
            Welcome to Secure X
          </h2>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="address">Wallet Address</Label>
              <Input
                id="address"
                placeholder="Your Wallet Address"
                type="text"
                value={formData.address}
                disabled // Prevent manual editing
                className="bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                label="Select Role"
                className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Select Role"
                onChange={handleRoleChange}
              >
                <Option value="manufacturer">Manufacturer</Option>
                <Option value="distributor">Distributor</Option>
                <Option value="retailer">Retailer</Option>
              </Select>
            </LabelInputContainer>

            <LabelInputContainer className="mb-8">
              <Label htmlFor="details">Details (Optional)</Label>
              <textarea
                id="details"
                placeholder="Additional details about your organization..."
                value={formData.details}
                onChange={handleChange}
                className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md w-full h-32 resize-none"
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register →"}
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
          </form>
          <div className="text-center font-bold">
            Already Have an Account?{" "}
            <Link to="/login">
              <span className="text-white cursor-pointer text-center font-bold">
                {" "}
                Login{" "}
              </span>
            </Link>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default Register;
