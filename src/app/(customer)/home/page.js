'use client'
import { useSession, signOut } from "next-auth/react"

export default function Home() {
    const { data: session, status } = useSession()
    console.log(session);


    return (
        <>
            halaman customer bos
            <p>Signed in as {session?.user.email}</p>
            <p>Signed in as {session?.user.role}</p>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 " role="menuitem">Keluar</button>

        </>
    )
}