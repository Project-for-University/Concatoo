'use client'
import { useState } from "react";
import Image from 'next/image'
import { AiFillPlusCircle, AiOutlineBars, AiOutlineUsergroupDelete, AiOutlineDatabase, AiOutlineLogout} from "react-icons/ai";


function Sidebar(){
        const [isMinimized, setIsMinimized] = useState(false);
      
        const toggleSidebar = () => {
          setIsMinimized(!isMinimized);
        };

    return(
      <div className="">
        {/* <div className="flex m-4 justify-between">
        <Image
          src="/asset/logo.png"
          width={60}
          height={60}
          alt="Picture of the author"
        />
        <button><AiOutlineLogout /></button>
        
        </div> */}
<div className={`flex ${isMinimized ? 'w-16' : 'w-64'} h-screen bg-white text-black transition-width duration-300`}>
            <div className="flex flex-col items-center w-full rounded-3xl border border-neutral-300">
                <button
                onClick={toggleSidebar}
                className="p-4 focus:outline-none"
                >
                <AiOutlineBars />
                </button>
                <div className="flex items-center justify-center p-2 hover:bg-gray-200 w-full">
                    <AiOutlineDatabase />
                    {!isMinimized && <span className="ml-2">Dashboard</span>}
                </div>
                <div className="flex flex-col mt-4 space-y-4 w-full">
                <div className="flex items-center justify-center p-2 hover:bg-gray-200 w-full">
                    <AiFillPlusCircle/>
                    {!isMinimized && <span className="ml-2">Create Event</span>}
                </div>
                <div className="flex items-center justify-center p-2 hover:bg-gray-200 w-full">
                    <AiOutlineUsergroupDelete/>
                    {!isMinimized && <span className="ml-2">User</span>}
                </div>
                </div>
            </div>
        </div>
      </div>
        
    )
}

export default Sidebar