'use client'

// import { useSession } from "next-auth/react"
// import { CreateUser } from "./action/CreateUser";
// import { useRouter } from "next/navigation";
// import { useFormStatus, useFormState } from "react-dom";
// import { useState, useEffect } from "react"
import Link from "next/link";
import Image from "next/image";
import { GoogleRegisterAction } from "./action/action_google";

// import { useState, useEffect } from "react"
// // pake useformstate jangan useaction state
// import { useFormStatus, useFormState } from "react-dom";
// import Link from "next/link";
// import { useSession } from "next-auth/react"
// import { CreateUser } from "./action/CreateUser";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { MdOutlineDangerous } from "react-icons/md";




export default function RegisterForm({ providers }) {
    // useEffect(() => {
    //     if (status === 'authenticated') {
    //         if (session?.user?.role === "CUSTOMER") {
    //             router.push('/home');
    //         } else if (session?.user?.role === 'SELLER') {
    //             router.push('/dashboard');
    //         }
    //     }

    // }, [status, session, router]);

    //     const router = useRouter();
    // const [username, setusername] = useState('');
    // const [phonenumber, setphonenumber] = useState('');
    // const [email, setemail] = useState('');
    // const [password, setpassword] = useState('');
    // const { data: session, status } = useSession()
    // const initialState = {
    //     message: '',
    //     duplikat: ''
    // }
    // memang ngga ada sniped nya s useformstate ini jadi ketik aja
    // harus pake boject form entries 
    // const [state, formAction] = useFormState(CreateUser, initialState)


    // const handlephonenumber = (event) => {
    //     const newValue = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    //     const parsedValue = parseFloat(newValue);

    //     // Check if the parsed value is within the limit
    //     if (parsedValue <= 999999999999999 || newValue === '') {
    //         setphonenumber(newValue);
    //     }
    // };
    // const handleemail = (event) => {
    //     const newValue = event.target.value;

    //     if (newValue.length <= 50 || newValue === '') {
    //         setemail(newValue);
    //     }
    // };



    return (
        <div className="max-w-lg h-screen flex flex-col items-center -mt-20 justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div>
                        <Link href={'/'} className="flex justify-center item-center">
                            <Image src={'/asset/logo.png'} alt="logo.png" width={60} height={60}></Image>
                        </Link>
                    </div>
                    <div className="my-6">
                        <p className="font-semibold text-center font text-2xl">Bergabung Sekarang</p>
                        <p className="text-center text-sm mt-2">Sudah Punya Akun? Yuk Tinggal <Link href={`/auth/login`} className="text-emerald-600 font-semibold" >Masuk</Link></p>
                    </div>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name} class="flex items-center justify-center ">
                            <button onClick={() => { GoogleRegisterAction(provider.id) }} class="flex items-center bg-white  border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-600  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <Image src={`/asset/google.png`} width={200} height={200} class="h-6 w-6 mr-2" alt="" />
                                <span>Daftar dengan {provider.name}</span>
                            </button>
                        </div>
                    ))}
                    {/* {state?.duplikat ? (
                        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                            <MdOutlineDangerous className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" />
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-semibold"></span> {state.duplikat}
                            </div>
                        </div>
                    ) : null} */}
                    {/* <form action={formAction} className="max-w-md mx-auto" >
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="username" className="block mb-2 text-sm font-normal text-gray-900">Username</label>
                            <input type="text" id="username" name="username" value={username} onChange={(e) => { setusername(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                            pesan eror ini memang ngga ada sniped nya 
                            {state?.username && <div className="text-red-600">{state.username}</div>}

                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="phone_number" className="block mb-2 text-sm font-normal text-gray-900">Phone Number</label>
                            <input type="text" id="phonenumber" name="phonenumber" value={phonenumber} onChange={handlephonenumber} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                            {state?.phonenumber && <div className="text-red-600">{state.phonenumber}</div>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-normal text-gray-900">Email</label>
                            <input type="email" id="email" name="email" value={email} onChange={handleemail} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                            {state?.email && <div className="text-red-600">{state.email}</div>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="password" className="block mb-2 text-sm font-normal text-gray-900">Password</label>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => { setpassword(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                            {state?.password && <div className="text-red-600">{state.password}</div>}
                        </div>
                        <SubmitButton />
                        <div className="mt-4">
                            <p className="font-semibold text-xs text-center">Dengan mendaftar, saya menyetujui <br /><a className="text-emerald-600">Syarat dan Ketentuan</a> serta <a className="text-emerald-600">Kebijakan Privasi</a></p>
                        </div>
                    </form> */}
                </div>
            </div>
        </div>
    )
}
// function SubmitButton() {
//     const { pending } = useFormStatus();
//     return (
//         <button type="submit" className="w-full text-white drop-lg  bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">{pending ? "loading..." : "Daftar"}</button>
//     );
// }