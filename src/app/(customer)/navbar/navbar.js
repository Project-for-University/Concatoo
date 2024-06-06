'use client'
import { IoIosSearch } from "react-icons/io";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";

function Navbar() {
    const { data: session, status } = useSession()
    console.log(session);
    console.log(status);

    return (
        <div className="flex justify-between items-center mb-4 w-full px-4">
            <div className="flex-1 flex justify-center items-center">
                <input type="text" placeholder="Search" className="p-2 border rounded-md flex-1 max-w-lg mr-2" />
                <Link className="pl-2" href={``}><IoIosSearch /></Link>
            </div>
            {status === 'authenticated' ? (
                <button onClick={() => signOut()} className="p-2 text-black ml-auto">Sign out</button>
            ) : (
                <div className="flex space-x-4 ml-auto">
                    <button className="rounded-lg hover:" onClick={() => signIn()}>Sign in</button>
                    <Link href="/auth/register">Register</Link>
                </div>
            )}
        </div>
    )
}

export default Navbar
