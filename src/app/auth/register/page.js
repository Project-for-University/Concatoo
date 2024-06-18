'use client'

import { useState, useEffect } from "react"
// pake useformstate jangan useaction state
import { useFormStatus, useFormState } from "react-dom";
import Link from "next/link";
import { useSession } from "next-auth/react"
import { CreateUser } from "./action/CreateUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineDangerous } from "react-icons/md";



export default function Register() {
    const router = useRouter();
    const [username, setusername] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    // console.log(username);
    // console.log(phonenumber);
    // console.log(email);
    // console.log(password);

    const initialState = {
        message: '',
    }
    const { data: session, status } = useSession()
    // console.log(session);
    // console.log(status);
    // memang ngga ada sniped nya s useformstate ini jadi ketik aja
    // harus pake boject form entries 
    const [state, formAction] = useFormState(CreateUser, initialState)
    // console.log(formAction);

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
            <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div>
                        <div className="flex justify-center item-center">
                            <Image src={'/asset/logo.png'} alt="logo.png" width={60} height={60}></Image>
                        </div>
                    </div>
                    <div className="my-6">
                        <p className="font-semibold text-center font text-2xl">Selamat Datang</p>
                        <p className="text-center text-sm mt-2">Sudah Punya Akun? Yuk Tinggal <Link href={`/auth/login`} className="text-emerald-600">Masuk</Link></p>
                    </div>
                    <div className="flex border-2 bg-emerald-100 border-emerald-600 rounded-md h-8 justify-center items-center">
                        <MdOutlineDangerous />
                        <p className="text-center">Email atau No Hp Sudah Terpakai</p>
                    </div>
                    <form action={formAction} className="max-w-md mx-auto">
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="username" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Username</label>
                            <input type="text" id="username" name="username" value={username} onChange={(e) => { setusername(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {/* pesan eror ini memang ngga ada sniped nya  */}
                            {state?.username && <div className="text-red-600">{state.username}</div>}

                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="phone_number" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Phone Number</label>
                            <input type="text" id="phonenumber" name="phonenumber" value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {state?.phonenumber && <div className="text-red-600">{state.phonenumber}</div>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => { setemail(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {state?.email && <div className="text-red-600">{state.email}</div>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="password" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => { setpassword(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {state?.password && <div className="text-red-600">{state.password}</div>}
                        </div>
                        <SubmitButton />
                        <div className="mt-2">
                            <p className="font-semibold text-xs text-center">Dengan mendaftar, saya menyetujui <br /><a className="text-emerald-600">Syarat dan Ketentuan</a> serta <a className="text-emerald-600">Kebijakan Privasi</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="w-full text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{pending ? "Submitting..." : "Register"}</button>
    );
}