



import { auth } from "./auth/login/auth";
import { signIn } from "next-auth/react"


export default async function Pages() {

    const session = await auth()
    console.log(session);
    if (session === null) {
        return (
            <>
                <h1 className="text-white">belum login</h1>
                <button onClick={() => signIn()}>Sign In</button>
            </>
        )
    }
    return (
        <>
            <h1 className="text-white">dia itu seler</h1>

        </>
    );
}
