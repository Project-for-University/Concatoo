import { IoIosSearch } from "react-icons/io";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";


function Navbar() {
    const { data: session, status } = useSession()
    console.log(session);
    console.log(status);

    return (
        <div className="flex justify-between ml-80 items-center mb-4 w-1/2">
            <input type="text" placeholder="Search" className="p-2 border rounded-md flex-1 mr-4" />
            <button className="p-2 bg-white text-black border-2 border-c rounded-md"><IoIosSearch /></button>
            {status === 'authenticated' ? (
                <button onClick={() => signOut()} className="pl-4 text-black">Sign out</button>
            ) : (
                <>
                    <button onClick={() => signIn()}>Sign in</button>
                    <Link href="/auth/register"> Register</Link>

                </>
            )}
        </div>

    )
}

export default Navbar