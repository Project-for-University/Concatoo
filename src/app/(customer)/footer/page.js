import Image from "next/image";
import Link from "next/link";

export default function Footer(){
    return (
        <footer className="bg-white mt-8 mx-auto px-4 py-4 border-2 border-gray-100 shadow">
            <div className="w-full p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image width={80} height={80} src={'/asset/logo.png'} alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Concert</span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                        <li>
                            <Link href={`/about`} className="hover:underline me-4 md:me-6">About</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">© 2024. All Rights Reserved.</span>
            </div>
        </footer>
    )
}