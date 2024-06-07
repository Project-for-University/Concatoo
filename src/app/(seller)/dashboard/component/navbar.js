export default function Navbar() {
    return (
        <nav className="p-4 border rounded-b-3xl ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="pl-6 flex">
                    <a href="/dashboard">
                        <img src="/asset/logo.png" alt="logo.png" className="w-10"></img>
                    </a>
                    <p className="pl-2 content-center text-green-500 font-medium">Concert</p>
                </div>
                <div className="pr-4">
                    <button className=" text-black px-4 py-2 rounded-xl hover:bg-green-100">
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    )
}