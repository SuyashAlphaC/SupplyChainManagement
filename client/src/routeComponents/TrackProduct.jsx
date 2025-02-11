import React, { useState, useEffect } from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background";
import { NavBar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  TruckIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import {
  ProductManagerAddress,
  ProductManagerABI,
  QualityControlAddress,
  QualityControlABI,
} from "../contracts/constants";
const { ethers } = require("ethers");

const TrackProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [qualityChecks, setQualityChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const CONTRACT_ADDRESSES = {
    productManager: ProductManagerAddress,
    qualityControl: QualityControlAddress,
  };

  const getStatusIcon = (status) => {
    const icons = {
      0: <BellIcon className="h-5 w-5" />,
      1: <TruckIcon className="h-5 w-5" />,
      2: <ArchiveBoxIcon className="h-5 w-5" />,
      3: <TruckIcon className="h-5 w-5" />,
      4: <BuildingStorefrontIcon className="h-5 w-5" />,
      5: <CurrencyDollarIcon className="h-5 w-5" />,
    };
    return icons[status] || <BellIcon className="h-5 w-5" />;
  };

  const getStatusText = (status) => {
    const statusTexts = [
      "Product Created",
      "Shipped by Manufacturer",
      "Received by Distributor",
      "Shipped by Distributor",
      "Received by Retailer",
      "Product Sold",
    ];
    return statusTexts[status] || "Unknown Status";
  };

  const fetchProductData = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const productManager = new ethers.Contract(
        CONTRACT_ADDRESSES.productManager,
        ProductManagerABI,
        provider
      );
      const qualityControl = new ethers.Contract(
        CONTRACT_ADDRESSES.qualityControl,
        QualityControlABI,
        provider
      );

      const product = await productManager.getProduct(productId);
      setProductData({
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: ethers.formatEther(product.price),
        manufacturer: product.manufacturer,
        currentOwner: product.currentOwner,
        status: Number(product.status),
        locationData: product.locationData,
        createdAt: new Date(Number(product.createdAt) * 1000).toLocaleString(),
        updatedAt: new Date(Number(product.updatedAt) * 1000).toLocaleString(),
      });

      const checks = await qualityControl.getQualityChecks(productId);
      setQualityChecks(
        checks.map((check) => ({
          inspector: check.inspector,
          passed: check.passed,
          notes: check.notes,
          timestamp: new Date(Number(check.timestamp) * 1000).toLocaleString(),
        }))
      );
    } catch (error) {
      console.error("Error fetching product data:", error);
      setError("Error fetching product data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (loading) {
    return (
      <BackgroundBeamsWithCollision className="p-5">
        <div className="flex flex-col min-h-screen w-full items-center">
          <NavBar />
          <div className="text-white text-xl mt-32">Loading...</div>
        </div>
      </BackgroundBeamsWithCollision>
    );
  }

  if (error) {
    return (
      <BackgroundBeamsWithCollision className="p-5">
        <div className="flex flex-col min-h-screen w-full items-center">
          <NavBar />
          <div className="text-red-500 text-xl mt-32">{error}</div>
          <Link to="/" className="text-white mt-4 underline">
            Return to Dashboard
          </Link>
        </div>
      </BackgroundBeamsWithCollision>
    );
  }

  return (
    <BackgroundBeamsWithCollision className="p-5">
      <div className="flex flex-col min-h-screen w-full items-center">
        <div className="w-full bg-inherit sticky top-3 z-[10] self-start">
          <NavBar />
        </div>

        {productData && (
          <div className="w-[32rem] mt-32 z-[10]">
            <div className="bg-white bg-opacity-90 rounded-xl p-6 mb-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{productData.name}</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Description: {productData.description}
                </p>
                <p className="text-gray-700">Price: {productData.price} ETH</p>
                <p className="text-gray-700">
                  Manufacturer: {productData.manufacturer}
                </p>
                <p className="text-gray-700">
                  Current Owner: {productData.currentOwner}
                </p>
                <p className="text-gray-700">
                  Created: {productData.createdAt}
                </p>
              </div>
            </div>

            <Timeline>
              <TimelineItem className="h-28">
                <TimelineConnector className="!w-[78px]" />
                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                  <TimelineIcon className="p-3" variant="ghost">
                    {getStatusIcon(productData.status)}
                  </TimelineIcon>
                  <div className="flex flex-col gap-1">
                    <Typography variant="h6" color="blue-gray">
                      {getStatusText(productData.status)}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {productData.updatedAt}
                    </Typography>
                  </div>
                </TimelineHeader>
              </TimelineItem>

              {qualityChecks.map((check, index) => (
                <TimelineItem key={index} className="h-28">
                  <TimelineConnector className="!w-[78px]" />
                  <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                    <TimelineIcon
                      className="p-3"
                      variant="ghost"
                      color={check.passed ? "green" : "red"}
                    >
                      <ArchiveBoxIcon className="h-5 w-5" />
                    </TimelineIcon>
                    <div className="flex flex-col gap-1">
                      <Typography variant="h6" color="blue-gray">
                        Quality Check: {check.passed ? "Passed" : "Failed"}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        Inspector: {check.inspector}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        Notes: {check.notes}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {check.timestamp}
                      </Typography>
                    </div>
                  </TimelineHeader>
                </TimelineItem>
              ))}
            </Timeline>

            <div className="mt-6 text-center">
              <Link to="/" className="text-white underline">
                Return to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default TrackProduct;
// import React, { useState } from "react";
// import { BackgroundBeamsWithCollision } from "../components/ui/background";
// import { NavBar } from "../components/Navbar";
// import {
//   Timeline,
//   TimelineItem,
//   TimelineConnector,
//   TimelineIcon,
//   Typography,
//   TimelineHeader,
// } from "@material-tailwind/react";
// import {
//   BellIcon,
//   ArchiveBoxIcon,
//   CurrencyDollarIcon,
//   TruckIcon,
//   BuildingStorefrontIcon,
// } from "@heroicons/react/24/solid";
// import { cn } from "../lib/utils";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { Link } from "react-router-dom";

// import {
//   ProductManagerAddress,
//   ProductManagerABI,
//   QualityControlAddress,
//   QualityControlABI,
// } from "../contracts/constants";
// const { ethers } = require("ethers");

// const TrackProduct = () => {
//   const [showTimeline, setShowTimeline] = useState(false);
//   const [productData, setProductData] = useState(null);
//   const [qualityChecks, setQualityChecks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     productId: "",
//   });

//   const CONTRACT_ADDRESSES = {
//     productManager: ProductManagerAddress,
//     qualityControl: QualityControlAddress,
//   };

//   const getStatusIcon = (status) => {
//     const icons = [
//       BellIcon,
//       TruckIcon,
//       ArchiveBoxIcon,
//       TruckIcon,
//       BuildingStorefrontIcon,
//       CurrencyDollarIcon,
//     ];
//     const Icon = icons[status] || BellIcon;
//     return <Icon className="h-5 w-5" />;
//   };

//   const getStatusText = (status) => {
//     const statusTexts = [
//       "Product Created",
//       "Shipped by Manufacturer",
//       "Received by Distributor",
//       "Shipped by Distributor",
//       "Received by Retailer",
//       "Product Sold",
//     ];
//     return statusTexts[status] || "Unknown Status";
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       productId: e.target.value,
//     });
//   };

//   const fetchProductData = async () => {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const productManager = new ethers.Contract(
//         CONTRACT_ADDRESSES.productManager,
//         ProductManagerABI,
//         provider
//       );
//       const qualityControl = new ethers.Contract(
//         CONTRACT_ADDRESSES.qualityControl,
//         QualityControlABI,
//         provider
//       );

//       const product = await productManager.getProduct(formData.productId);
//       setProductData({
//         id: product.id.toString(),
//         name: product.name,
//         description: product.description,
//         price: ethers.formatEther(product.price),
//         status: product.status,
//         updatedAt: new Date(product.updatedAt * 1000).toLocaleString(),
//       });

//       const checks = await qualityControl.getQualityChecks(formData.productId);
//       setQualityChecks(
//         checks.map((check) => ({
//           passed: check.passed,
//           notes: check.notes,
//           timestamp: new Date(check.timestamp * 1000).toLocaleString(),
//         }))
//       );

//       setShowTimeline(true);
//     } catch (error) {
//       console.error("Error fetching product data:", error);
//       setError("Invalid product ID or network error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     await fetchProductData();
//   };

//   const BottomGradient = () => (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );

//   return (
//     <BackgroundBeamsWithCollision className="p-5">
//       <div className="flex flex-col min-h-screen w-full items-center">
//         <NavBar className="w-full bg-inherit sticky top-3 z-10 self-start" />

//         {!showTimeline ? (
//           <div className="max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 bg-[#708090] z-10 rounded-[20px] mt-32">
//             <h2 className="font-bold text-[24px] text-neutral-200 text-center">
//               Enter Product ID to Track
//             </h2>
//             {error && (
//               <div className="text-red-500 text-center mb-4">{error}</div>
//             )}

//             <form onSubmit={handleSubmit} className="my-8">
//               <div className="flex flex-col space-y-2 mb-4">
//                 <Label htmlFor="productId">Product ID</Label>
//                 <Input
//                   id="productId"
//                   placeholder="Enter Product ID"
//                   type="text"
//                   value={formData.productId}
//                   onChange={handleInputChange}
//                   required
//                   className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-input cursor-pointer"
//               >
//                 {loading ? "Loading..." : "Track →"}
//                 <BottomGradient />
//               </button>
//             </form>

//             <div className="text-center font-bold">
//               Return to{" "}
//               <Link to="/" className="text-white cursor-pointer">
//                 Home
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="w-[32rem] mt-32">
//             <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
//               <h3 className="text-xl font-bold mb-2">{productData.name}</h3>
//               <p className="text-gray-600">{productData.description}</p>
//               <p className="text-gray-600">Price: {productData.price} ETH</p>
//             </div>

//             <Timeline>
//               <TimelineItem className="h-28">
//                 <TimelineConnector className="!w-[78px]" />
//                 <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
//                   <TimelineIcon className="p-3" variant="ghost">
//                     {getStatusIcon(productData.status)}
//                   </TimelineIcon>
//                   <div className="flex flex-col gap-1">
//                     <Typography variant="h6" color="blue-gray">
//                       {getStatusText(productData.status)}
//                     </Typography>
//                     <Typography
//                       variant="small"
//                       color="gray"
//                       className="font-normal"
//                     >
//                       {productData.updatedAt}
//                     </Typography>
//                   </div>
//                 </TimelineHeader>
//               </TimelineItem>

//               {qualityChecks.map((check, index) => (
//                 <TimelineItem key={index} className="h-28">
//                   <TimelineConnector className="!w-[78px]" />
//                   <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
//                     <TimelineIcon
//                       className="p-3"
//                       variant="ghost"
//                       color={check.passed ? "green" : "red"}
//                     >
//                       <ArchiveBoxIcon className="h-5 w-5" />
//                     </TimelineIcon>
//                     <div className="flex flex-col gap-1">
//                       <Typography variant="h6" color="blue-gray">
//                         Quality Check: {check.passed ? "Passed" : "Failed"}
//                       </Typography>
//                       <Typography
//                         variant="small"
//                         color="gray"
//                         className="font-normal"
//                       >
//                         {check.notes}
//                       </Typography>
//                       <Typography
//                         variant="small"
//                         color="gray"
//                         className="font-normal"
//                       >
//                         {check.timestamp}
//                       </Typography>
//                     </div>
//                   </TimelineHeader>
//                 </TimelineItem>
//               ))}
//             </Timeline>
//           </div>
//         )}
//       </div>
//     </BackgroundBeamsWithCollision>
//   );
// };

// export default TrackProduct;
