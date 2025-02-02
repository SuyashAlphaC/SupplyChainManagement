import React from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background";
import { NavBar } from "../components/Navbar";
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
} from "@heroicons/react/24/solid";
import { cn } from "../lib/utils"; 
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

const TrackProduct = () => {

  const [showTimeline,setShowTimeline] = React.useState(false);


   const handleSubmit = (e) => {
          e.preventDefault();
          setShowTimeline(true);
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
        <div className="flex flex-col min-h-screen w-full items-center">
          {" "}
          {/* Ensure the container takes full height */}
          <div className="w-full bg-inherit sticky top-3 z-[10] self-start">
            {" "}
            {/* Align self to start (top) */}
            <NavBar />
          </div>
        <div className="z-[10]">
          {!showTimeline && <div className="max-w-md w-full mx-auto  md:rounded-2xl p-4 md:p-8 shadow-input bg-[#708090] z-[999] rounded-[20px] mt-32">
            <h2 className="font-bold text-[24px] text-neutral-200 text-center z-[10]">
             Enter The product Id to track
            </h2>
            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Your Wallet Address" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
             <Label htmlFor="productId">Product Id</Label>
                <Input id="productId" placeholder="Enter Product ID" type="text" className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"/>
              </LabelInputContainer>
              <button
                className="bg-gradient-to-br relative group/btn from-black to-black block dark:bg-black w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
                type="submit"
              >
                Track &rarr;
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
         </div>}


         {showTimeline && <div className="w-[25rem] mt-32">
            <Timeline>
              <TimelineItem className="h-28">
                <TimelineConnector className="!w-[78px]" />
                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                  <TimelineIcon className="p-3" variant="ghost">
                    <BellIcon className="h-5 w-5" />
                  </TimelineIcon>
                  <div className="flex flex-col gap-1">
                    <Typography variant="h6" color="blue-gray">
                      $2400, Design changes
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      22 DEC 7:20 PM
                    </Typography>
                  </div>
                </TimelineHeader>
              </TimelineItem>
              <TimelineItem className="h-28">
                <TimelineConnector className="!w-[78px]" />
                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                  <TimelineIcon className="p-3" variant="ghost" color="red">
                    <ArchiveBoxIcon className="h-5 w-5" />
                  </TimelineIcon>
                  <div className="flex flex-col gap-1">
                    <Typography variant="h6" color="blue-gray">
                      New order #1832412
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      21 DEC 11 PM
                    </Typography>
                  </div>
                </TimelineHeader>
              </TimelineItem>
              <TimelineItem className="h-28">
                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                  <TimelineIcon className="p-3" variant="ghost" color="green">
                    <CurrencyDollarIcon className="h-5 w-5" />
                  </TimelineIcon>
                  <div className="flex flex-col gap-1">
                    <Typography variant="h6" color="blue-gray">
                      Payment completed for order #4395133
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      20 DEC 2:20 AM
                    </Typography>
                  </div>
                </TimelineHeader>
              </TimelineItem>
            </Timeline>
          </div>}
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default TrackProduct;
