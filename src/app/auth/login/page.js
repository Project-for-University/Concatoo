'use client'
import { useState, useEffect } from "react"

import { useFormStatus, useFormState } from 'react-dom'
import ActionLogin from "./api/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { MdOutlineDangerous } from "react-icons/md";


export default function Login() {
    const router = useRouter();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    // console.log(email);
    // console.log(password);

    const { data: session, status } = useSession()
    // console.log(session);
    // console.log(status);

    const initialState = {
        message: '',
        error: null
    }
    const [state, formAction] = useFormState(ActionLogin, initialState)

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role === "CUSTOMER") {
                router.push('/home');
            } else if (session?.user?.role === 'SELLER') {
                router.push('/dashboard');
            }
        }
    }, [status, session, router]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-lg h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div>
                        <div className="flex justify-center item-center">
                        <Image src={'/asset/logo.png'} alt="logo.png" width={60} height={60}></Image>
                        </div>
                        <div className="my-6">
                            <p className="font-semibold text-center font text-2xl">Selamat Datang</p>
                            <p className="text-center text-sm mt-2">Belum Punya Akun? Yuk <Link href={`/auth/register`} className="text-emerald-600">Daftar</Link></p>
                        </div>
                    </div>
                    <div className="flex border-2 bg-emerald-100 border-emerald-600 rounded-md h-8 justify-center items-center">
                        <MdOutlineDangerous />
                        <p className="text-center">Email atau Password Anda salah, silahkan coba lagi</p>
                    </div>
                    <form action={formAction} className="max-w-md mx-auto" >
                        {state?.error?.form && <div className="text-red-600 mb-4">{state.error.form}</div>}


                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">email</label>
                            <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " />
                            {state?.email && <div className="text-red-600">{state.email}</div>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Password</label>
                            <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} name="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " />
                            {state?.password && <div className="text-red-600">{state.password}</div>}
                        </div>
                        <LoginButton />
                    </form>
                </div>
            </div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="w-full text-white drop-lg bg-gradient-to-b hover:from-emerald-400 from-emerald-500 to-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{pending ? "loading..." : "Masuk"}</button>
    )
}
