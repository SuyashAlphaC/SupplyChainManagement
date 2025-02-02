import React from 'react'
import { BackgroundBeamsWithCollision } from '../components/ui/background'
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Select, Option } from "@material-tailwind/react";
import { Link,useNavigate } from 'react-router-dom';
import { Radio, Typography } from "@material-tailwind/react";

const TransferProduct = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard");
        console.log("Form submitted");
    };

    const BottomGradient = () => {
        return (
          <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </>
        );
      };
       
      const LabelInputContainer = ({
        children,
        className,
      }) => {
        return (
          <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
          </div>
        );
      };

  return (
    <>
    <BackgroundBeamsWithCollision className={`p-5`}>
    <div className="max-w-md w-full mx-auto  md:rounded-2xl p-4 md:p-8 bg-[#708090] z-[10] shadow-lg rounded-[20px]">
      <h2 className="font-bold text-[25px] text-neutral-200 text-center ">
      Verify Quality, Ensure Trust
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="address"> Your Wallet Address</Label>
            <Input id="address" placeholder="Your Wallet Address" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
        <Label htmlFor="productId">Product Id</Label>
            <Input id="productId" placeholder="Enter Product ID" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
        </LabelInputContainer>
        <LabelInputContainer className="my-4">
            <Label htmlFor="qualityStatus">Quality Status</Label>
            <div className="flex gap-4 !text-black">
                <Radio name="qualityStatus" label={
                  <Typography
                    color="blue-gray"
                    className="hover:text-blueg-gray-900 font-medium transition-colors"
                  >
                    Pass
                  </Typography>
        } value="pass" id="pass" color="green" className='text-black' />
                <Radio name="qualityStatus" label={
                  <Typography
                  color="blue-gray"
                  className="hover:text-blueg-gray-900 font-medium transition-colors"
                >
                  Fail
                </Typography>
                } value="fail" id="fail" color="red" className='!text-black'/>
            </div>
        </LabelInputContainer>
        <button
            className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
            type="submit"
        >
            Submit &rarr;
            <BottomGradient />
        </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      <div className='text-center font-bold'>
        Return to back{" "}&nbsp;
        <Link to="/">
            <span className="text-white cursor-pointer text-center font-bold"> Home </span>
        </Link>
      </div>
    </div>
        </BackgroundBeamsWithCollision>
    </>        
  )
}

export default TransferProduct;