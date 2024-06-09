'use client'


import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Pages() {
    const { data: session, status } = useSession()
    console.log(status);
    console.log(session);


    const router = useRouter()


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/auth/login')
        }
    }, [router, status]);
    return (
        <>
            <h1 className="">dashboard</h1>
            {status === 'authenticated' ? (
                <button onClick={() => signOut()} className="p-2 text-black ml-auto">Sign out</button>
            ) : (
                <div className="flex space-x-4 ml-auto">
                    <button className="rounded-lg hover:" onClick={() => signIn()}>Sign in</button>
                    <Link href="/auth/register">Register</Link>
                </div>
            )}
        </>
    )
}