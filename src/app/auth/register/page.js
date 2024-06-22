
import { getProviders } from "next-auth/react";
import RegisterForm from "./form_register";
export default async function SignInPage() {


    const providers = await getProviders();
    if (!providers) {
        return <div>Failed to load providers</div>;
    }

    return (
        <>
            <RegisterForm providers={providers} />
        </>
    );
}






