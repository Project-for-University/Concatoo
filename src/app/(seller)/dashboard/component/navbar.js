import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
export default function Navbar() {
    const { data: session, status } = useSession()
    // console.log(session);
    // console.log(status);
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
                    {status === 'authenticated' ? (
                        <button
                            onClick={() => signOut()}
                            className="p-2 text-black ml-auto">Sign out</button>
                    ) : (
                        <div className="flex space-x-4 ml-auto">
                            <button className="bg-white rounded-lg hover:bg-orange-100 p-2" onClick={() => signIn()}>Sign in</button>
                            <Link className="bg-white hover:bg-orange-100 p-2" href="/auth/register">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}