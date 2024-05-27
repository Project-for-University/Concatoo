'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export default function Component() {
    // return status = unautenticated,autenticated
    //session itu akun yang login nya
    const { data: session, status } = useSession()
    console.log(session);
    console.log(status);
    return (
        <>
            <h1>Home</h1>
            {status === 'authenticated' ? (
                <button onClick={() => signOut()} className="text-white">Sign out</button>
            ) : (
                <button onClick={() => signIn()}>Sign in</button>
            )}
        </>
    )
}

