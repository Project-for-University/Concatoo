'use client'
import Navbar from "@/app/(seller)/dashboard/component/navbar"
import Sidebar from "@/app/(seller)/dashboard/component/sidebar"
import { UpdateAcara } from "../../../../api/seller/acara/edit_acara/update_acara/action";

import { useEffect, useState } from "react"
import { useFormStatus, useFormState } from "react-dom";


export default function Edit({ params }) {
    // console.log(params.id)
    const [banner, setBanner] = useState(null);
    // console.log(banner)
    const [nama_event, setNama_event] = useState('')
    const [tanggal_acara, setTanggal_acara] = useState('')
    const [waktu_acara, setWaktu_acara] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [nama_narahubung, setNama_narahubung] = useState('')
    const [email, setEmail] = useState('')
    const [no_ponsel, setNo_ponsel] = useState('')
    const [deskripsi_acara, setDeskripsi_acara] = useState('')
    const [syarat_ketentuan, setSyarat_ketentuan] = useState('')

    // console.log('nama_event:', nama_event);
    // console.log('tanggal_acara:', tanggal_acara);
    // console.log('waktu_acara:', waktu_acara);
    // console.log('lokasi:', lokasi);
    // console.log('nama_narahubung:', nama_narahubung);
    // console.log('email:', email);
    // console.log('no_ponsel:', no_ponsel);
    // console.log('deskripsi_acara:', deskripsi_acara);
    // console.log('syarat_ketentuan:', syarat_ketentuan);

    const initialState = {
        message: '',
    }

    const [state, formAction] = useFormState(UpdateAcara, initialState)
    // console.log(formAction)
    // console.log(state);

    const handlePonsel = (event) => {
        const newValue = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        const parsedValue = parseFloat(newValue);
        if (parsedValue >= 0 && parsedValue < 999999999999999 || newValue === '') {
            setNo_ponsel(newValue);
        }
    };

    useEffect(() => {
        async function fetchData() {
            const getData = await fetch(`/api/seller/acara/edit_acara/read_acara/${params.id}`, {
                method: 'GET',



            })
            const data = await getData.json()
            console.log(data)

            const tanggal = new Date(data.tanggal_acara)
            const year = tanggal.getUTCFullYear();
            const month = String(tanggal.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(tanggal.getUTCDate()).padStart(2, '0');
            // Format the date as YYYY-MM-DD
            const formattedDate = `${year}-${month}-${day}`;

            const waktu = new Date(data.waktu_acara)
            const hours = String(waktu.getUTCHours()).padStart(2, '0');
            const minutes = String(waktu.getUTCMinutes()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;

            if (getData.ok) {
                setNama_event(data.nama_event)
                setTanggal_acara(formattedDate)
                setWaktu_acara(formattedTime)
                setLokasi(data.lokasi)
                setNama_narahubung(data.kontak.nama_narahubung)
                setEmail(data.kontak.email)
                setNo_ponsel(data.kontak.no_ponsel)
                setDeskripsi_acara(data.deskripsi.deskripsi_acara)
                setSyarat_ketentuan(data.deskripsi.syarat_ketentuan)
            }

        }
        fetchData()
    }, [params.id])
    return (
        <div>
            {/* <Navbar /> */}
            <div className="flex justify-center">
                {/* <Sidebar /> */}
                <div className="mx-auto w-full max-w-[50%] h-fit bg-white mt-8 rounded-xl shadow-md">
                    <form
                        className="py-6 px-9"
                        action={formAction}
                    >
                        <div className="mt-8 text-[#07074D] font-semibold text-xl">Edit Acara</div>
                        <div className="mb-6 pt-4">
                            <label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload Thumbnail</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        {banner ? <span className="font-semibold">{banner.name}</span> : <>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400"> PNG,JPEG or JPG  (MAX. 2700 x 1100 / 16 MB)</p>
                                        </>}
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        name="banner"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => { setBanner(e.target.files[0]) }}
                                    />
                                </label>
                            </div>
                            <div className="mb-5 mt-4">
                                <input type="hidden" value={params.id} name="id_acara"></input>
                                <label htmlFor="nama_event" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Nama Acara
                                </label>
                                <input
                                    type="text"
                                    name="nama_event"
                                    id="nama_event"
                                    placeholder="Nama event"
                                    value={nama_event}
                                    onChange={(e) => { setNama_event(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.nama_event && <div className="text-red-500">{state.nama_event}</div>}
                            </div>
                            <label className="mb-5 block text-xl font-semibold text-[#07074D]">Info Kontak</label>
                            <div className="">
                                <label
                                    htmlFor="nama_narahubung"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Nama Nara Hubung
                                </label>
                                <input
                                    type="text"
                                    name="nama_narahubung"
                                    id="nama_narahubung"
                                    placeholder="Nama Narahubung"
                                    value={nama_narahubung}
                                    onChange={(e) => { setNama_narahubung(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.nama_narahubung && <div className="text-red-500">{state.nama_narahubung}</div>}
                            </div>
                            <div className="flex flex-wrap -mx-3 pt-4">
                                <div className="w-full md:w-1/2 px-3 mb-6">
                                    <div className="">
                                        <label
                                            htmlFor="email"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {state?.email && <div className="text-red-500">{state.email}</div>}
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6">
                                    <div className="">
                                        <label
                                            htmlFor="no_ponsel"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            No ponsel
                                        </label>
                                        <input
                                            type="text"
                                            name="no_ponsel"
                                            id="no_ponsel"
                                            placeholder="No Ponsel"
                                            value={no_ponsel}
                                            onChange={handlePonsel}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {state?.no_ponsel && <div className="text-red-500">{state.no_ponsel}</div>}
                                    </div>
                                </div>
                            </div>

                            <label className="block text-xl font-semibold text-[#07074D]">Diselenggarakan Pada</label>
                            <div className="flex flex-wrap -mx-3 pt-4">
                                <div className="w-full md:w-1/2 px-3 mb-6">
                                    <div className="">
                                        <label
                                            htmlFor="tanggal_acara"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Tanggal Acara
                                        </label>
                                        <input
                                            type="date"
                                            name="tanggal_acara"
                                            id="tanggal_acara"
                                            value={tanggal_acara}
                                            onChange={(e) => { setTanggal_acara(e.target.value) }}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {state?.tanggal_acara && <div className="text-red-500">{state.tanggal_acara}</div>}
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6">
                                    <div className="">
                                        <label
                                            htmlFor="waktu_acara"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Waktu Acara
                                        </label>
                                        <input
                                            type="time"
                                            name="waktu_acara"
                                            id="waktu_acara"
                                            value={waktu_acara}
                                            onChange={(e) => { setWaktu_acara(e.target.value) }}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {state?.waktu_acara && <div className="text-red-500">{state.waktu_acara}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="lokasi"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Lokasi
                                </label>
                                <input
                                    type="text"
                                    name="lokasi"
                                    id="lokasi"
                                    placeholder="Lokasi"
                                    value={lokasi}
                                    onChange={(e) => { setLokasi(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.lokasi && <div className="text-red-500">{state.lokasi}</div>}
                            </div>

                            <div className="mt-8 mb-4 text-[#07074D] font-semibold text-xl">Deskripsi dan Syarat Acara</div>
                            <div className="mb-5">
                                <label
                                    htmlFor="deskripsi_acara"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Deskripsi Acara
                                </label>
                                <textarea
                                    name="deskripsi_acara"
                                    id="deskripsi_acara"
                                    placeholder="Deskripsi acara"
                                    value={deskripsi_acara}
                                    onChange={(e) => { setDeskripsi_acara(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.deskripsi_acara && <div className="text-red-500">{state.deskripsi_acara}</div>}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="syarat_ketentuan"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Syarat Ketentuan
                                </label>
                                <textarea
                                    type="text"
                                    name="syarat_ketentuan"
                                    id="syarat_ketentuan"
                                    placeholder="Syarat & Ketentuan"
                                    value={syarat_ketentuan}
                                    onChange={(e) => { setSyarat_ketentuan(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.syarat_ketentuan && <div className="text-red-500">{state.syarat_ketentuan}</div>}
                            </div>
                        </div>
                        <SubmitButton />
                    </form>
                </div>
            </div>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="hover:shadow-form w-full rounded-md bg-gradient-to-t from-amber-500 to-orange-300 py-3 px-8 text-center text-base font-semibold text-white outline-none">{pending ? "Submitting..." : "Submit"}</button>
    )
}