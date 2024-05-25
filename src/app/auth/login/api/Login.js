'use server'

import { signIn } from "../../auth"

export default async function LoginAction(formData) {
    await signIn("credentials", formData,)
}