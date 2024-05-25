"use client"


import { signOut } from "next-auth/react"




export default function Pages() {
    return (
        <>
            <h1>home</h1>
            <button onClick={() => signOut()} className="text-white">Signout</button>
        </>
    );
}
