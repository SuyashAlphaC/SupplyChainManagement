// import React, { useEffect, useState } from "react";
// import { BackgroundBeamsWithCollision } from "../components/ui/background";
// import { NavBar } from "../components/Navbar";
// import {
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";
// import { Link } from "react-router-dom";
// import { Button } from "@material-tailwind/react";
// import {
//   ProductManagerAddress,
//   ProductManagerABI,
// } from "../contracts/constants";
// const { ethers } = require("ethers");

// const Dashboard = () => {
//   const [open, setOpen] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [signer, setSigner] = useState(null);

//   const handleOpen = (value) => setOpen(open === value ? 0 : value);

//   const loadBlockchainData = async () => {
//     if (!window.ethereum) {
//       setError("MetaMask not detected");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Request account access
//       await window.ethereum.request({ method: "eth_requestAccounts" });

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const newSigner = await provider.getSigner();
//       setSigner(newSigner);

//       const newContract = new ethers.Contract(
//         ProductManagerAddress,
//         ProductManagerABI,
//         newSigner
//       );
//       setContract(newContract);

//       // Fetch total number of products
//       const productCount = await newContract._productIdCounter();
//       const productsData = [];

//       // Fetch details for each product
//       for (let i = 1; i < productCount; i++) {
//         try {
//           const productDetails = await newContract.getProduct(i);
//           productsData.push({
//             id: productDetails[0].toString(),
//             name: productDetails[1],
//             description: productDetails[2],
//             price: ethers.formatEther(productDetails[3]),
//             manufacturer: productDetails[4],
//             currentOwner: productDetails[5],
//             status: productDetails[6],
//             location: productDetails[7],
//             createdAt: new Date(productDetails[8] * 1000).toLocaleString(),
//             updatedAt: new Date(productDetails[9] * 1000).toLocaleString(),
//           });
//         } catch (error) {
//           console.error(`Error fetching product ${i}:`, error);
//         }
//       }

//       setProducts(productsData);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error loading blockchain data:", error);
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   // Setup event listeners for product updates
//   const setupProductEventListeners = () => {
//     if (!contract) return;

//     // Listen for product creation events
//     contract.on("ProductCreated", async (productId, name, description) => {
//       console.log("New product created:", productId, name);
//       await loadBlockchainData();
//     });

//     // Listen for product transfer events
//     contract.on("ProductTransferred", async (productId, from, to) => {
//       console.log("Product transferred:", productId, from, to);
//       await loadBlockchainData();
//     });
//   };

//   useEffect(() => {
//     loadBlockchainData();
//   }, []);

//   // Setup event listeners when contract is available
//   useEffect(() => {
//     if (contract) {
//       setupProductEventListeners();
//     }

//     // Cleanup event listeners
//     return () => {
//       if (contract) {
//         contract.removeAllListeners("ProductCreated");
//         contract.removeAllListeners("ProductTransferred");
//       }
//     };
//   }, [contract]);

//   // Refresh data when ethereum accounts change
//   useEffect(() => {
//     const handleAccountsChanged = () => {
//       loadBlockchainData();
//     };

//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", handleAccountsChanged);
//       return () => {
//         window.ethereum.removeListener(
//           "accountsChanged",
//           handleAccountsChanged
//         );
//       };
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-white text-2xl">Loading products...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-500">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <>
//       <BackgroundBeamsWithCollision className={`p-5`}>
//         <div className="flex flex-col min-h-screen w-full items-center">
//           <div className="w-full bg-inherit sticky top-3 z-[10] self-start">
//             <NavBar />
//           </div>
//           <div className="flex justify-between items-center w-full max-w-[1300px] mt-20 z-[10]">
//             <div className="font-bold text-[30px] self-start text-[#d4d4d4]">
//               Dashboard
//             </div>
//             <div className="text-[#d4d4d4]">
//               <Link to="/createproduct">
//                 <Button className="px-4 py-2 bg-blue-600 max-h-9 hover:bg-blue-700 text-white rounded-md">
//                   Create New Product
//                 </Button>
//               </Link>
//             </div>
//           </div>
//           <hr className="my-3 z-[10] w-full max-w-[1300px] border-t-2 border-[#d4d4d4]" />

//           <section className="flex justify-around w-full max-w-[1300px]">
//             <div className="max-w-[1000px] w-[80%]">
//               {products.length === 0 ? (
//                 <div className="text-white text-center text-xl">
//                   No products found. Create your first product!
//                 </div>
//               ) : (
//                 products.map((product, index) => (
//                   <Accordion
//                     key={product.id}
//                     open={open === index + 1}
//                     className="mb-2 rounded-lg border border-blue-gray-100 px-4 w-full"
//                   >
//                     <AccordionHeader
//                       onClick={() => handleOpen(index + 1)}
//                       className={`border-b-0 transition-colors !text-white ${
//                         open === index + 1 ? "text-white" : ""
//                       }`}
//                     >
//                       {product.name}
//                     </AccordionHeader>
//                     <AccordionBody className="pt-0 text-base font-normal">
//                       <div className="p-4 bg-inherit text-white flex flex-col md:flex-row justify-between">
//                         <div className="space-y-2">
//                           <p className="text-lg font-semibold">
//                             Price:{" "}
//                             <span className="font-normal">
//                               {product.price} ETH
//                             </span>
//                           </p>
//                           <p className="text-lg font-semibold">
//                             Description:{" "}
//                             <span className="font-normal">
//                               {product.description}
//                             </span>
//                           </p>
//                           <p className="text-lg font-semibold">
//                             Manufacturer:{" "}
//                             <span className="font-normal">
//                               {product.manufacturer}
//                             </span>
//                           </p>
//                           <p className="text-lg font-semibold">
//                             Current Owner:{" "}
//                             <span className="font-normal">
//                               {product.currentOwner}
//                             </span>
//                           </p>
//                           <p className="text-lg font-semibold">
//                             Status:{" "}
//                             <span className="font-normal">
//                               {product.status}
//                             </span>
//                           </p>
//                           <p className="text-lg font-semibold">
//                             Created At:{" "}
//                             <span className="font-normal">
//                               {product.createdAt}
//                             </span>
//                           </p>
//                         </div>

//                         <div className="mt-4 md:mt-0 flex gap-2 md:self-end">
//                           <Link to={`/transferProduct/${product.id}`}>
//                             <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
//                               Transfer Product
//                             </Button>
//                           </Link>
//                           <Link to={`/trackProduct/${product.id}`}>
//                             <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
//                               Track Product
//                             </Button>
//                           </Link>
//                         </div>
//                       </div>
//                     </AccordionBody>
//                   </Accordion>
//                 ))
//               )}
//             </div>

//             <div className="h-fit flex flex-col gap-4 !text-[#d4d4d4]">
//               <div className="text-center text-[50px] font-bold border-b-4 border-black-500">
//                 Stats:
//               </div>
//               <div className="flex flex-col gap-2">
//                 <p className="text-xl font-semibold">
//                   Total Products: {products.length}
//                 </p>
//               </div>
//             </div>
//           </section>
//         </div>
//       </BackgroundBeamsWithCollision>
//     </>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background";
import { NavBar } from "../components/Navbar";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
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

const Dashboard = () => {
  const [open, setOpen] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const loadBlockchainData = async () => {
    if (!window.ethereum) {
      setError("MetaMask not detected");
      setLoading(false);
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      const newContract = new ethers.Contract(
        ProductManagerAddress,
        ProductManagerABI,
        signer
      );
      setContract(newContract);

      // Fetch participant's owned products
      const participantDetails = await newContract.getParticipant(address);
      const productIds = participantDetails[4].map((id) => Number(id)); // Convert BigInt to Number

      const productsData = await Promise.all(
        productIds.map(async (productId) => {
          const productDetails = await newContract.getProduct(productId);
          return {
            id: Number(productDetails[0]).toString(),
            name: productDetails[1],
            description: productDetails[2],
            price: ethers.formatEther(productDetails[3]),
            manufacturer: productDetails[4],
            currentOwner: productDetails[5],
            status: ProductStatusMap[Number(productDetails[6])],
            location: productDetails[7],
            createdAt: new Date(
              Number(productDetails[8]) * 1000
            ).toLocaleString(),
            updatedAt: new Date(
              Number(productDetails[9]) * 1000
            ).toLocaleString(),
          };
        })
      );

      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);
  return (
    <>
      <BackgroundBeamsWithCollision className={`p-5`}>
        <div className="flex flex-col min-h-screen w-full items-center">
          <div className="w-full bg-inherit sticky top-3 z-[10] self-start">
            <NavBar />
          </div>
          <div className="flex justify-between items-center w-full max-w-[1300px] mt-20 z-[10]">
            <div className="font-bold text-[30px] self-start text-[#d4d4d4]">
              Dashboard
            </div>
            <div className="text-[#d4d4d4]">
              <Link to="/createproduct">
                <Button className="px-4 py-2 bg-blue-600 max-h-9 hover:bg-blue-700 text-white rounded-md">
                  Create New Product
                </Button>
              </Link>
            </div>
          </div>
          <hr className="my-3 z-[10] w-full max-w-[1300px] border-t-2 border-[#d4d4d4]" />

          <section className="flex justify-around w-full max-w-[1300px]">
            <div className="max-w-[1000px] w-[80%]">
              {products.length === 0 ? (
                <div className="text-white text-center text-xl">
                  No products found. Create your first product!
                </div>
              ) : (
                products.map((product, index) => (
                  <Accordion
                    key={product.id}
                    open={open === index + 1}
                    className="mb-2 rounded-lg border border-blue-gray-100 px-4 w-full"
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(index + 1)}
                      className={`border-b-0 transition-colors !text-white ${
                        open === index + 1 ? "text-white" : ""
                      }`}
                    >
                      {product.name}
                    </AccordionHeader>
                    <AccordionBody className="pt-0 text-base font-normal">
                      <div className="p-4 bg-inherit text-white flex flex-col md:flex-row justify-between">
                        <div className="space-y-2">
                          <p className="text-lg font-semibold">
                            Price:{" "}
                            <span className="font-normal">
                              {product.price} ETH
                            </span>
                          </p>
                          <p className="text-lg font-semibold">
                            Description:{" "}
                            <span className="font-normal">
                              {product.description}
                            </span>
                          </p>
                          <p className="text-lg font-semibold">
                            Manufacturer:{" "}
                            <span className="font-normal">
                              {product.manufacturer}
                            </span>
                          </p>
                          <p className="text-lg font-semibold">
                            Current Owner:{" "}
                            <span className="font-normal">
                              {product.currentOwner}
                            </span>
                          </p>
                          <p className="text-lg font-semibold">
                            Status:{" "}
                            <span className="font-normal">
                              {product.status}
                            </span>
                          </p>
                          <p className="text-lg font-semibold">
                            Created At:{" "}
                            <span className="font-normal">
                              {product.createdAt}
                            </span>
                          </p>
                        </div>

                        <div className="mt-4 md:mt-0 flex gap-2 md:self-end">
                          <Link to={`/transferProduct/${product.id}`}>
                            <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                              Transfer Product
                            </Button>
                          </Link>
                          <Link to={`/trackProduct/${product.id}`}>
                            <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                              Track Product
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </AccordionBody>
                  </Accordion>
                ))
              )}
            </div>

            <div className="h-fit flex flex-col gap-4 !text-[#d4d4d4]">
              <div className="text-center text-[50px] font-bold border-b-4 border-black-500">
                Stats:
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">
                  Total Products: {products.length}
                </p>
              </div>
            </div>
          </section>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default Dashboard;
