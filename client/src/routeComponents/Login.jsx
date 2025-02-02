import React from 'react'
import { BackgroundBeamsWithCollision } from '../components/ui/background'
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Select, Option } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
 

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
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
      <h2 className="font-bold text-[30px] text-neutral-200 text-center ">
        Welcome Back!!
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Your Wallet Address" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
        <Label htmlFor="role">Role</Label>
        <Select
            id="role"
            label="Select Role"
            className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Select Role"
            >
            <Option value="manufacturer" className="">
                Manufacturer
            </Option>
            <Option value="distributor" className="">
                Distributor
            </Option>
            <Option value="retailer" className="">
                Retailer
            </Option>
        </Select>
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>
 
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
      <div className='text-center font-bold'>
        Don't Have an Account?{" "}&nbsp;
        <Link to="/register">
            <span className="text-white cursor-pointer text-center font-bold"> Register </span>
        </Link>
      </div>
    </div>
        </BackgroundBeamsWithCollision>
    </>        
  )
}

export default Login;