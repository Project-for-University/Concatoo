import { getProviders } from "next-auth/react";

import LoginForm from "./form_login";


export default async function SignInPage() {


    const providers = await getProviders();
    if (!providers) {
        return <div>Failed to load providers</div>;
    }

    return (
        <>
            <LoginForm providers={providers} />
        </>
    );
}






// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react"
// import ActionLogin from "./api/action";


// const router = useRouter();

// // console.log(email);
// // console.log(password);


// const { data: session, status } = useSession()
// // console.log(session);
// // console.log(status);



// useEffect(() => {
//     if (status === 'authenticated') {
//         if (session?.user?.role === "CUSTOMER") {
//             router.push('/home');
//         } else if (session?.user?.role === 'SELLER') {
//             router.push('/dashboard');
//         }
//     }
// }, [status, session, router]);

// if (status === 'loading') {
//     return <div>Loading...</div>;
// }





