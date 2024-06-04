'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function Pages() {
    const { session, status } = useSession()
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
        </>
    )
}