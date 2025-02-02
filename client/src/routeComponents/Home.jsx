import React from 'react'
import { BackgroundBeamsWithCollision } from '../components/ui/background'
import { NavBar } from '../components/Navbar'

const App = () => {
  return (
    <>

<BackgroundBeamsWithCollision className={`p-5`}>
  <div className="flex flex-col min-h-screen w-full"> {/* Ensure the container takes full height */}
    <div className="w-full bg-inherit sticky top-3 z-[10] self-start"> {/* Align self to start (top) */}
      <NavBar />
    </div>
    <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight mt-40">  
      <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
        <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
          <span className="">Secure X</span>
        </div>
        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
          <span className="">Secure X</span>
        </div>
      </div>
    </h2>
  </div>
</BackgroundBeamsWithCollision>

  
    </>
  )
}

export default App