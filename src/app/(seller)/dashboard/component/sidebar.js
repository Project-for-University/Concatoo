import { AiFillPlusCircle, AiOutlineDatabase } from "react-icons/ai";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className=" text-gray-700 w-64 h-screen border rounded-3xl m-4">
      <div className="flex flex-col items-start p-4 space-y-4">
        <div className="flex items-center w-full p-2 rounded-lg hover:bg-gray-300">
          <AiOutlineDatabase className="mr-4" size={24} />
          <Link href={`/dashboard`}><span>Dashboard</span></Link>
        </div>
        <div className="flex items-center w-full p-2 rounded-lg hover:bg-gray-300">
          <AiFillPlusCircle className="mr-4" size={24} />
          <Link href={`/event`}><span>Event</span></Link>
        </div>
      </div>
    </div>
  );
}
