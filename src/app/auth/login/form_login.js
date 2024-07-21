'use client'

import Image from "next/image";
import Link from "next/link";
// import ActionLogin from "./api/action";
// import { useState, useEffect } from "react"
import { signIn, } from "next-auth/react";

// const initialState = {
//     message: '',
//     error: null
// }
export default function LoginForm({ providers }) {
    console.log(providers);
    // const [email, setemail] = useState('');
    // const [password, setpassword] = useState('');
    // const [state, formAction] = useFormState(ActionLogin, initialState)
    return (
        <div className="max-w-lg h-screen flex flex-col items-center -mt-20 justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-xl md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div>

                        <Link href={'/'} className="flex justify-center item-center">
                            <Image src={'/asset/logo.png'} alt="logo.png" width={60} height={60}></Image>
                        </Link>

                        <div className="my-6">
                            <p className="font-semibold text-center font text-2xl">Selamat Datang</p>
                            <p className="text-center text-sm mt-2">
                                Belum Punya Akun? Yuk

                                <Link href={`/auth/register`} className="text-emerald-600 font-semibold ml-1">Daftar</Link>
                            </p>
                        </div>
                    </div>
                    {/* {state?.error ? (
                        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                            <MdOutlineDangerous className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" />
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-semibold"></span> {state.error}
                            </div>
                        </div>
                    ) : null} */}
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name} className="flex items-center justify-center ">
                            <button onClick={() => signIn(provider.id, { callbackUrl: '/' })} className="flex items-center bg-white  border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-600  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <Image src={`/asset/google.png`} width={200} height={200} className="h-6 w-6 mr-2" alt="" />
                                <span>Masuk dengan {provider.name}</span>
                            </button>
                        </div>
                    ))}
                    {/* <form action={formAction} className="max-w-md mx-auto" >
                        {state?.error?.form && <div className="text-red-600 mb-4">{state.error.form}</div>}


                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-normal text-gray-900">email</label>
                            <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder=" " />
                            {state?.email && <div className="text-red-600">{state.email}</div>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-normal text-gray-900">Password</label>
                            <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} name="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder=" " />
                            {state?.password && <div className="text-red-600">{state.password}</div>}
                        </div>
                        <LoginButton />
                    </form> */}
                </div>
            </div>
        </div>
    );
}
// function LoginButton() {
//     const { pending } = useFormStatus()
//     return (
//         <button type="submit" className="w-full text-white drop-lg  bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">{pending ? "loading..." : "Masuk"}</button>
//     )
// }