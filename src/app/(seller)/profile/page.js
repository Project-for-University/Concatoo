'use client'
import { useFormStatus, useFormState } from "react-dom";

export default function Profile() {
    return(
        <div className="flex justify-center mb-4">
        <div className="mx-auto w-full max-w-[900px] shadow-md mt-8 rounded-md bg-white">
            <div className="mt-8 ml-8 text-[#07074D] font-semibold text-xl">Profile</div>

            <form
                className="py-6 px-9"
                // action={formAction}
            >
                <div className="mb-6 pt-4">
                    <label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload Profile</label>
                    <div className="items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                            <input type="hidden" name="" value="" />
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <span className="font-semibold"></span> : <>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                    <p className="text-xs text-gray-500"> PNG,JPEG or JPG  (MAX. 2700 x 1100 / 16 MB)</p>
                                </>
                            </div>
                            <input
                                id="dropzone-file"
                                name="avatar"
                                type="file"
                                className="hidden"
                                onChange=""
                            />
                            {/* {state?.banner && <div className="text-orange-600">{state.banner}</div>} */}

                        </label>
                        <div className="mt-4">
                            <label htmlFor="nama" className="mb-3 block text-base font-medium text-[#07074D]">
                                Nama 
                            </label>
                            <input
                                type="text"
                                name="nama"
                                id="nama"
                                placeholder="Nama Lengkap"
                                value=""
                                onChange=""
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                            />
                            {/* {state?.nama_event && <div className="text-orange-600">{state.nama_event}</div>} */}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                Email 
                            </label>
                            <input
                                type="email"
                                disabled
                                name="email"
                                id="email"
                                placeholder="you@gmail.com"
                                value=""
                                onChange=""
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
                                name="no_ponsel_"
                                id="no_ponsel"
                                placeholder="0928918921"
                                value=""
                                onChange=""
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                            />
                            {/* {state?.nama_event && <div className="text-orange-600">{state.nama_event}</div>} */}
                        </div>
                    </div>
                    </div>
                    <SubmitButton/>
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