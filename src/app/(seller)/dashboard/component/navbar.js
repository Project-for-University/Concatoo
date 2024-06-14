import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-lg p-4 border rounded-b-3xl ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="pl-6 flex">
                    <a href="/dashboard">
                        <Image src={'/asset/logo.png'} alt="logo.png" className="w-10" width={100} height={100}></Image>
                    </a>
                    <p className="pl-2 content-center text-green-500 font-medium">Concert</p>
                </div>
                <div className="pr-4">
                    <button className=" text-black px-4 py-2 rounded-xl drop-shadow-lg hover:bg-orange-100">
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    )
}