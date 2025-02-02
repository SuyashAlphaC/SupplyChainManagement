import React from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background";
import { NavBar } from "../components/Navbar";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const App = () => {

    const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <BackgroundBeamsWithCollision className={`p-5`}>
        <div className="flex flex-col min-h-screen w-full items-center">
          {" "}
          {/* Full height and centered */}
          <div className="w-full bg-inherit sticky top-3 z-[10] self-start">
            {" "}
            {/* NavBar at the top */}
            <NavBar />
          </div>
          <div className="flex justify-between items-center w-full max-w-[1300px] mt-20 z-[10]">
            {" "}
            {/* Full width within max-w constraint */}
            <div className="font-bold text-[30px] self-start text-[#d4d4d4]">
              Your Products
            </div>
            <div className=" text-[#d4d4d4]">
            <button className="px-4 py-2 bg-blue-600 max-h-9  hover:bg-blue-700 text-white rounded-md">
                <Link to="/createproduct">Create New Product</Link>
            </button>
            </div>
          </div>
          <hr className="my-3 z-[10] w-full max-w-[1300px] border-t-2 border-[#d4d4d4]" />
<section className="flex justify-around w-full max-w-[1300px]" >
      <div className="max-w-[1300px] w-full">      
      <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4 w-full">
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors !text-white ${
            open === 1 ? "text-white" : ""
          }`}
        >
          Product Name
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
        <div className="p-4 bg-innherit text-white flex flex-col md:flex-row justify-between">
        {/* Left Section: Details */}
        <div className="space-y-2">
            <p className="text-lg font-semibold">Price: <span className="font-normal">$99</span></p>
            <p className="text-lg font-semibold">Description: <span className="font-normal">This is a great product.</span></p>
            <p className="text-lg font-semibold">Location: <span className="font-normal">New York</span></p>
        </div>

        {/* Right Section: Buttons */}
        <div className="mt-4 md:mt-0 flex gap-2 md:self-end">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              <Link to="/transferProduct">
              Transfer Product
              </Link>
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">  
              <Link to="/trackProduct">
                Track Product
              </Link></button>
        </div>
        </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} className="mb-2 rounded-lg border border-blue-gray-100 px-4 w-full">
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className={`border-b-0 transition-colors !text-white ${
            open === 2 ? "text-white" : ""
          }`}
        >
          How to use Material Tailwind?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
        <div className="p-4 bg-innherit text-white flex flex-col md:flex-row justify-between">
        {/* Left Section: Details */}
        <div className="space-y-2">
            <p className="text-lg font-semibold">Price: <span className="font-normal">$99</span></p>
            <p className="text-lg font-semibold">Description: <span className="font-normal">This is a great product.</span></p>
            <p className="text-lg font-semibold">Location: <span className="font-normal">New York</span></p>
        </div>

        {/* Right Section: Buttons */}
        <div className="mt-4 md:mt-0 flex gap-2 md:self-end">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            <Link to="/transferProduct">
              Transfer Product
            </Link>
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            <Link to="/trackProduct">
                Track Product
            </Link>
            </button>
        </div>
        </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} className="rounded-lg border border-blue-gray-100 px-4 w-full">
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className={`border-b-0 transition-colors !text-white ${
            open === 3 ? "text-white" : ""
          }`}
        >
          What can I do with Material Tailwind?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal w-full">
        <div className="p-4 bg-innherit text-white flex flex-col md:flex-row justify-between">
        {/* Left Section: Details */}
        <div className="space-y-2">
            <p className="text-lg font-semibold">Price: <span className="font-normal">$99</span></p>
            <p className="text-lg font-semibold">Description: <span className="font-normal">This is a great product.</span></p>
            <p className="text-lg font-semibold">Location: <span className="font-normal">New York</span></p>
        </div>

        {/* Right Section: Buttons */}
        <div className="mt-4 md:mt-0 flex gap-2 md:self-end">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            <Link to="/transferProduct">
              Transfer Product
            </Link>
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                <Link to="/trackProduct">
                Track Product
                </Link>
            </button>
        </div>
        </div>
        </AccordionBody>
      </Accordion>
      </div>
      </section>
    </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default App;
