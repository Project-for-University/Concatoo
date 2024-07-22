'use client'
import { useEffect, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { useSession } from "next-auth/react"
import { UpdateProfile } from "@/app/api/seller/profile/action/action_profile";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";


export default function FormProfile() {
    const { data: session, status } = useSession()
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState('')

    const [no_ponsel, setNo_ponsel] = useState('')
    const [id_user, setid_user] = useState('')
    // place holder
    const [Davatar, DsetAvatar] = useState(null);
    const [id_avatar, setid_avatar] = useState(null);
    console.log("🚀 ~ Profile ~ id_avatar:", id_avatar)
    console.log("🚀 ~ Profile ~ Davatar:", Davatar)
    const [pname, setpName] = useState('')
    const [pemail, setpEmail] = useState('')
    const [pno_ponsel, setpNo_ponsel] = useState('')

    // '2026f791-286f-4a5d-9c90-eb7a01daec31-graphic.png'
    // pisahkan text
    let avatar_split
    if (Davatar) {
        const segments = Davatar.split('/');
        const filename = segments[segments.length - 1];
        const filenameParts = filename.split('-');
        avatar_split = filenameParts[filenameParts.length - 1];
    }


    const initialState = {
        message: '',
        error: ''
    }
    const [state, formAction] = useFormState(UpdateProfile, initialState)

    const handlePonsel = (event) => {
        const newValue = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        const parsedValue = parseFloat(newValue);
        if (parsedValue >= 0 && parsedValue < 999999999999999 || newValue === '') {
            setNo_ponsel(newValue);
        }
    };


    const findUser = async (session) => {
        if (session) {
            const res = await fetch(`/api/seller/profile/read_user/${session}`, {
                method: 'GET'
            })
            const user = await res.json()
            console.log("🚀 ~ findUser ~ user:", user)
            if (user == null) {

                // Misalnya, mengatur ke array kosong)
                DsetAvatar([])
                setpName([])
                setpEmail([])
                setpNo_ponsel([])
            }
            DsetAvatar(user.avatar)
            setpName(user.name)
            setpEmail(user.email)
            setpNo_ponsel(user.phonenumber)

            if (user.avatar) {
                const parts = user.avatar.split('/');
                const id_banner_split = parts[8];
                console.log("🚀 ~ findUser ~ id_banner_split:", id_banner_split)
                setid_avatar(id_banner_split)
                console.log(typeof id_banner_split);
            }


        } else {
            DsetAvatar([])
            setpName([])
            setpEmail([])
            setpNo_ponsel([])
        }
    }



    useEffect(() => {
        if (session) {
            setid_user(session.user.id_user);
            findUser(session.user.id_user)
        }
    }, [session]);

    return (
        <div className="flex justify-center mb-4">
            <div className="mx-auto w-full max-w-[900px] shadow-md mt-8 rounded-md bg-white">
                <div className="mt-8 ml-8 text-[#07074D] font-semibold text-xl">Profile</div>

                <form
                    className="py-6 px-9"
                    action={formAction}
                >
                    <div className="mb-6 pt-4">
                        <label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload Poto Profile</label>
                        <div className="items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                <input type="hidden" name="id_user" value={id_user} />
                                <input type="hidden" name="id_avatar" value={id_avatar} />
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <AiOutlineCloudUpload className="w-8 h-8 mb-4 text-gray-500" />

                                    {avatar ? <span className="font-semibold">{avatar.name}</span>
                                        : Davatar ?
                                            <>
                                                <Image src={Davatar} alt="banner" width={20} height={12} className="border border-gray-200 rounded w-40 h-40 object-cover" />
                                                {/* <span className="font-semibold">{avatar_split}</span> */}
                                            </>
                                            : <>
                                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                                <p className="text-xs text-gray-500"> PNG,JPEG or JPG  (MAX. 2700 x 1100 / 16 MB)</p>
                                            </>
                                    }



                                    {state?.banner && <div className="text-red-500">{state.banner}</div>}
                                </div>

                                <input
                                    id="dropzone-file"
                                    name="avatar"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        console.log("🚀 ~ Profile ~ file:", file)
                                        if (file) {
                                            setAvatar(file);
                                        } else {
                                            setAvatar(null);
                                        }
                                    }}
                                />
                                {state?.avatar && <div className="text-orange-600">{state.avatar}</div>}

                            </label>
                            <div className="mt-4">
                                <label htmlFor="nama" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder={pname}
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                                />
                                {state?.name && <div className="text-orange-600">{state.name}</div>}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder={pemail}
                                    disabled
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                                />
                                {/* {state?.nama_event && <div className="text-orange-600">{state.nama_event}</div>} */}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="no_ponsel" className="mb-3 block text-base font-medium text-[#07074D]">
                                    No Hp
                                </label>
                                <input
                                    type="text"
                                    name="no_ponsel"
                                    id="no_ponsel"
                                    placeholder={pno_ponsel}
                                    value={no_ponsel}
                                    onChange={handlePonsel}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                                />
                                {state?.error && <div className="text-orange-600">{state.error}</div>}
                                {state?.no_ponsel && <div className="text-orange-600">{state.no_ponsel}</div>}
                            </div>
                        </div>
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </div>
    )
};

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="hover:shadow-form w-full rounded-md bg-gradient-to-b from-emerald-300 to-emerald-400 py-3 px-8 mt-6 text-center text-base font-semibold text-white outline-none">{pending ? "Submitting..." : "Simpan"}</button>
    )
}