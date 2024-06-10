'use client'

import { useState } from "react"

import { useFormStatus } from "react-dom";
import { CreateUser } from "./api/CreateUser";

// pake useformstate jangan useaction state
import { useFormState } from 'react-dom'
import Link from "next/link";


export default function Register({ }) {
    const [username, setusername] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    // async function onSubmit() {
    //     // Prevent the default form submission behavior
    //     const response = await fetch('/auth/register/api', { // Ensure the correct path
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username: username,
    //             phonenumber: phonenumber,
    //             email: email,
    //             password: password,
    //         })
    //     });



    //     const data = await response.json();
    //     console.log(data); // Handle response data
    // }

    const initialState = {
        message: '',
    }

    // memang ngga ada sniped nya s useformstate ini jadi ketik aja
    // harus pake boject form entries 
    const [state, formAction] = useFormState(CreateUser, initialState)
    console.log(formAction);

    return (
        <div className="max-w-lg h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                            Register
                        </h1>
                        <p className="text-green-600">
                            <Link href={`/auth/login`}>Masuk</Link>
                        </p>
                    </div>
                    <form action={formAction} className="max-w-md mx-auto">
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="username" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Username</label>
                            <input type="text" id="username" name="username" value={username} onChange={(e) => { setusername(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {/* pesan eror ini memang ngga ada sniped nya  */}
                            {state?.username && <div className="text-white">{state.username}</div>}

                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="phone_number" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Phone Number</label>
                            <input type="text" id="phonenumber" name="phonenumber" value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {state?.phonenumber && <div className="text-white">{state.phonenumber}</div>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => { setemail(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {state?.email && <div className="text-white">{state.email}</div>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="password" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => { setpassword(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {state?.password && <div className="text-white">{state.password}</div>}
                        </div>
                        <SubmitButton />
                        <p className="pt-2 text-green-600 text-center text-sm"><a>Forgot Password</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="w-full text-white bg-gradient-to-r from-green-300 to-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">{pending ? "Submitting..." : "Submit"}</button>
    );
}