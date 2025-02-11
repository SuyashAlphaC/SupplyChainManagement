import React, { useEffect, useState } from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background";
import { NavBar } from "../components/Navbar";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
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

const ParticipantTypeMap = {
  0: "Manufacturer",
  1: "Distributor",
  2: "Retailer",
};

const Elements = () => {
  const [open, setOpen] = useState(1);
  const [products, setProducts] = useState([]);
  const [participantDetails, setParticipantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!window.ethereum) {
        setError("MetaMask not detected");
        setLoading(false);
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(
          ProductManagerAddress,
          ProductManagerABI,
          signer
        );

        // Get participant details first
        const participant = await contract.getParticipant(address);
        setParticipantDetails({
          name: participant[0],
          details: participant[1],
          role: ParticipantTypeMap[participant[2]],
          isActive: participant[3],
          productsOwned: participant[4].map((id) => Number(id)),
          registeredAt: new Date(
            Number(participant[5]) * 1000
          ).toLocaleString(),
        });

        // Fetch all owned products
        const productsData = await Promise.all(
          participant[4].map(async (productId) => {
            const product = await contract.getProduct(productId);
            return {
              id: Number(product[0]),
              name: product[1],
              description: product[2],
              price: ethers.formatEther(product[3]),
              manufacturer: product[4],
              currentOwner: product[5],
              status: ProductStatusMap[Number(product[6])],
              locationData: product[7],
              createdAt: new Date(Number(product[8]) * 1000).toLocaleString(),
              updatedAt: new Date(Number(product[9]) * 1000).toLocaleString(),
            };
          })
        );

        setProducts(productsData);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlockchainData();
  }, []);

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

  return (
    <BackgroundBeamsWithCollision className="p-5">
      <div className="flex flex-col min-h-screen w-full items-center">
        <div className="w-full bg-inherit sticky top-3 z-[10] self-start">
          <NavBar />
        </div>

        {participantDetails && (
          <div className="w-full max-w-[1300px] mt-20 z-[10] bg-white bg-opacity-10 rounded-lg p-4 mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Participant Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-white">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {participantDetails.name}
              </p>
              <p>
                <span className="font-semibold">Role:</span>{" "}
                {participantDetails.role}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {participantDetails.isActive ? "Active" : "Inactive"}
              </p>
              <p>
                <span className="font-semibold">Products Owned:</span>{" "}
                {participantDetails.productsOwned.length}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center w-full max-w-[1300px] z-[10]">
          <div className="font-bold text-[30px] text-[#d4d4d4]">
            Your Products
          </div>
          {participantDetails?.role === "Manufacturer" && (
            <div className="text-[#d4d4d4]">
              <Link to="/createproduct">
                <button className="px-4 py-2 bg-blue-600 max-h-9 hover:bg-blue-700 text-white rounded-md">
                  Create New Product
                </button>
              </Link>
            </div>
          )}
        </div>

        <hr className="my-3 z-[10] w-full max-w-[1300px] border-t-2 border-[#d4d4d4]" />

        <section className="flex justify-around w-full max-w-[1300px]">
          <div className="max-w-[1300px] w-full">
            {error ? (
              <div className="text-red-500 text-center text-xl">{error}</div>
            ) : products.length === 0 ? (
              <div className="text-white text-center text-xl">
                No products found
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
                    {product.name} (ID: {product.id})
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
                          Status:{" "}
                          <span className="font-normal">{product.status}</span>
                        </p>
                        <p className="text-lg font-semibold">
                          Location:{" "}
                          <span className="font-normal">
                            {product.locationData}
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
                          Created:{" "}
                          <span className="font-normal">
                            {product.createdAt}
                          </span>
                        </p>
                        <p className="text-lg font-semibold">
                          Last Updated:{" "}
                          <span className="font-normal">
                            {product.updatedAt}
                          </span>
                        </p>
                      </div>

                      <div className="mt-4 md:mt-0 flex flex-col gap-2 md:self-end">
                        {product.currentOwner.toLowerCase() ===
                          window.ethereum.selectedAddress.toLowerCase() && (
                          <Link to={`/transferProduct/${product.id}`}>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full">
                              Transfer Product
                            </button>
                          </Link>
                        )}
                        <Link to={`/trackProduct/${product.id}`}>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full">
                            Track Product
                          </button>
                        </Link>
                      </div>
                    </div>
                  </AccordionBody>
                </Accordion>
              ))
            )}
          </div>
        </section>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Elements;
