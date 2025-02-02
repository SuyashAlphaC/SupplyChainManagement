import React from 'react'
import { BackgroundBeamsWithCollision } from '../components/ui/background'
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Link } from 'react-router-dom';
 

const Register = () => {

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
    <div className="max-w-md w-full mx-auto  md:rounded-2xl p-4 md:p-8 shadow-input bg-[#708090] z-[10] p-2 rounded-[20px]">
      <h2 className="font-bold text-[25px] text-neutral-200 text-center ">
        Create Product at Secure X
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className={"mb-4"}>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" placeholder="Product Name" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
          </LabelInputContainer>
        <LabelInputContainer className="mb-8">
        <Label htmlFor="description">Product Description</Label>
        <textarea
            id="description"
            placeholder="Describe the Product"
            className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md w-full h-32 resize-none"
        />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="price">Product Price</Label>
          <Input id="price" placeholder="Price of the Product" type="number" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Manufactured At" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Create Product &rarr;
          <BottomGradient />
        </button>
 
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
      </form>
      <div className='text-center font-bold'>
        <Link to="/">
            <span className="text-white cursor-pointer text-center font-bold"> Return To Home </span>
        </Link>
      </div>
    </div>
        </BackgroundBeamsWithCollision>
    </>        
  )
}

export default Register;