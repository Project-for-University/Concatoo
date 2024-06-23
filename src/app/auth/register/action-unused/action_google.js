import { signIn, } from "next-auth/react";

export async function GoogleRegisterAction(params) {

    const response = await fetch(`/auth/api/read_acara`);
    const jsonData = await response.json();

    if (jsonData) {
        signIn(params, { callbackUrl: '/' })
    }
}

