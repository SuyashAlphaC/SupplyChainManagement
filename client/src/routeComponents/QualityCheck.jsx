// import React, { useState, useEffect } from "react";
// import { BackgroundBeamsWithCollision } from "../components/ui/background";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { cn } from "../lib/utils";
// import { Radio, Typography } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ProductManagerAddress,
//   ProductManagerABI,
//   QualityControlAddress,
//   QualityControlABI,
// } from "../contracts/constants";
// const { ethers } = require("ethers");

// const CONTRACT_ADDRESS = QualityControlAddress; // Replace with your contract address
// const CONTRACT_ABI = QualityControlABI; // Replace with your contract ABI

// const QualityCheck = () => {
//   const [qualityStatus, setQualityStatus] = useState("pass");
//   const [productId, setProductId] = useState("");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [qualityChecks, setQualityChecks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (window.ethereum) {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = provider.getSigner();
//         const contract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           CONTRACT_ABI,
//           signer
//         );

//         // Call the contract function to perform quality check
//         const transaction = await contract.performQualityCheck(
//           productId,
//           qualityStatus === "pass",
//           "Quality check performed"
//         );
//         await transaction.wait();
//         console.log("Quality check performed!");
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error("Error performing quality check:", error);
//     }
//   };

//   const fetchQualityChecks = async () => {
//     try {
//       if (window.ethereum && productId) {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = provider.getSigner();
//         const contract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           CONTRACT_ABI,
//           signer
//         );
//         const checks = await contract.getQualityChecks(productId);
//         setQualityChecks(checks);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching quality checks:", error);
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

//   useEffect(() => {
//     fetchQualityChecks();
//   }, [productId]);

//   return (
//     <>
//       <BackgroundBeamsWithCollision className="p-5">
//         <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 bg-[#708090] z-[10] shadow-lg rounded-[20px]">
//           <h2 className="font-bold text-[25px] text-neutral-200 text-center">
//             Verify Quality, Ensure Trust
//           </h2>
//           <form className="my-8" onSubmit={handleSubmit}>
//             <LabelInputContainer className="mb-4">
//               <Label htmlFor="walletAddress">Your Wallet Address</Label>
//               <Input
//                 id="walletAddress"
//                 placeholder="Your Wallet Address"
//                 type="text"
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//                 value={walletAddress}
//                 onChange={(e) => setWalletAddress(e.target.value)}
//               />
//             </LabelInputContainer>
//             <LabelInputContainer className="mb-6">
//               <Label htmlFor="productId">Product ID</Label>
//               <Input
//                 id="productId"
//                 placeholder="Enter Product ID"
//                 type="text"
//                 className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//               />
//             </LabelInputContainer>
//             <LabelInputContainer className="my-4">
//               <Label htmlFor="qualityStatus">Quality Status</Label>
//               <div className="flex gap-4 !text-black">
//                 <Radio
//                   name="qualityStatus"
//                   label={
//                     <Typography
//                       color="blue-gray"
//                       className="hover:text-blueg-gray-900 font-medium transition-colors"
//                     >
//                       Pass
//                     </Typography>
//                   }
//                   value="pass"
//                   id="pass"
//                   color="green"
//                   className="text-black"
//                   checked={qualityStatus === "pass"}
//                   onChange={() => setQualityStatus("pass")}
//                 />
//                 <Radio
//                   name="qualityStatus"
//                   label={
//                     <Typography
//                       color="blue-gray"
//                       className="hover:text-blueg-gray-900 font-medium transition-colors"
//                     >
//                       Fail
//                     </Typography>
//                   }
//                   value="fail"
//                   id="fail"
//                   color="red"
//                   className="!text-black"
//                   checked={qualityStatus === "fail"}
//                   onChange={() => setQualityStatus("fail")}
//                 />
//               </div>
//             </LabelInputContainer>
//             <button
//               className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
//               type="submit"
//             >
//               Submit &rarr;
//               <BottomGradient />
//             </button>
//             <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
//           </form>
//           <div className="text-center font-bold">
//             Return to back{" "}
//             <Link to="/">
//               <span className="text-white cursor-pointer text-center font-bold">
//                 Home
//               </span>
//             </Link>
//           </div>
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold">Quality Check History</h3>
//             {loading ? (
//               <p>Loading quality checks...</p>
//             ) : (
//               <ul>
//                 {qualityChecks.map((check, index) => (
//                   <li key={index} className="mb-2">
//                     <strong>Inspector:</strong> {check.inspector}
//                     <br />
//                     <strong>Status:</strong> {check.passed ? "Pass" : "Fail"}
//                     <br />
//                     <strong>Notes:</strong> {check.notes}
//                     <br />
//                     <strong>Timestamp:</strong>{" "}
//                     {new Date(check.timestamp * 1000).toLocaleString()}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </BackgroundBeamsWithCollision>
//     </>
//   );
// };

// export default QualityCheck;
import React, { useState, useEffect } from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Radio, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {
  QualityControlAddress,
  QualityControlABI,
} from "../contracts/constants";
import { ethers } from "ethers";

const QualityCheck = () => {
  const [state, setState] = useState({
    qualityStatus: "pass",
    productId: "",
    isConnected: false,
    account: "",
    qualityChecks: [],
    loading: false,
    error: null,
  });

  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      }

      setState((prev) => ({ ...prev, loading: true }));
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setState((prev) => ({
        ...prev,
        isConnected: true,
        account: accounts[0],
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  };

  const getContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(
      QualityControlAddress,
      QualityControlABI,
      signer
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.productId) {
      setState((prev) => ({
        ...prev,
        error: "Product ID is required",
      }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const contract = await getContract();

      const tx = await contract.performQualityCheck(
        state.productId,
        state.qualityStatus === "pass",
        `Quality check performed by ${state.account}`
      );

      await tx.wait();
      await fetchQualityChecks();
      navigate("/dashboard");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  };

  const fetchQualityChecks = async () => {
    if (!state.productId) return;

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const contract = await getContract();
      const checks = await contract.getQualityChecks(state.productId);

      setState((prev) => ({
        ...prev,
        qualityChecks: checks,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (state.productId) {
      fetchQualityChecks();
    }
  }, [state.productId]);

  const BottomGradient = () => (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );

  return (
    <BackgroundBeamsWithCollision className="p-5">
      <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 bg-[#708090] z-[10] shadow-lg rounded-[20px]">
        <h2 className="font-bold text-[25px] text-neutral-200 text-center">
          Verify Quality, Ensure Trust
        </h2>

        {state.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {state.error}
          </div>
        )}

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="walletAddress">Connected Wallet</Label>
              <Input
                value={state.account}
                disabled
                className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="productId">Product ID</Label>
              <Input
                id="productId"
                placeholder="Enter Product ID"
                value={state.productId}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    productId: e.target.value,
                  }))
                }
                className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Quality Status</Label>
              <div className="flex gap-4">
                <Radio
                  name="qualityStatus"
                  label={<Typography className="text-white">Pass</Typography>}
                  value="pass"
                  color="green"
                  checked={state.qualityStatus === "pass"}
                  onChange={() =>
                    setState((prev) => ({
                      ...prev,
                      qualityStatus: "pass",
                    }))
                  }
                />
                <Radio
                  name="qualityStatus"
                  label={<Typography className="text-white">Fail</Typography>}
                  value="fail"
                  color="red"
                  checked={state.qualityStatus === "fail"}
                  onChange={() =>
                    setState((prev) => ({
                      ...prev,
                      qualityStatus: "fail",
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <button
            className="mt-6 bg-gradient-to-br relative group/btn from-black to-black block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={!state.isConnected || state.loading}
          >
            {state.loading ? "Processing..." : "Submit Quality Check"}
            <BottomGradient />
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white">
            Quality Check History
          </h3>
          {state.loading ? (
            <p className="text-white">Loading quality checks...</p>
          ) : (
            <ul className="space-y-4">
              {state.qualityChecks.map((check, index) => (
                <li
                  key={index}
                  className="bg-white/10 p-4 rounded-lg text-white"
                >
                  <p>
                    <strong>Inspector:</strong> {check.inspector}
                  </p>
                  <p>
                    <strong>Status:</strong> {check.passed ? "Pass" : "Fail"}
                  </p>
                  <p>
                    <strong>Notes:</strong> {check.notes}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {new Date(Number(check.timestamp) * 1000).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-white hover:text-gray-300 font-bold">
            Return Home
          </Link>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default QualityCheck;
