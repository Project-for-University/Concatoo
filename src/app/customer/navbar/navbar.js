import { IoSearchOutline } from "react-icons/io5";

function Navbar(){
    return(
    <div class="flex justify-between ml-80 items-center mb-4 w-1/2">
        <input type="text" placeholder="Search" class="p-2 border rounded-md flex-1 mr-4"/>
        <button class="p-2 bg-white text-black border-2 border-c rounded-md"><IoSearchOutline /></button>
    </div>
    )
}

export default Navbar