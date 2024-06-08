'use client'
import Navbar from "@/app/(seller)/dashboard/component/navbar"
import Sidebar from "@/app/(seller)/dashboard/component/sidebar"
import { UpdateAcara } from "../updateAcara/actionUpdate";

import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom";
import { useFormState } from 'react-dom'

export default function Edit({ params }) {
    console.log(params.id)

    const [nama_event, setNama_event] = useState('')
    const [tanggal_acara, setTanggal_acara] = useState('')
    const [waktu_acara, setWaktu_acara] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [nama_narahubung, setNama_narahubung] = useState('')
    const [email, setEmail] = useState('')
    const [no_ponsel, setNo_ponsel] = useState('')
    const [deskripsi_acara, setDeskripsi_acara] = useState('')
    const [syarat_ketentuan, setSyarat_ketentuan] = useState('')

    console.log('nama_event:', nama_event);
        console.log('tanggal_acara:', tanggal_acara);
        console.log('waktu_acara:', waktu_acara);
        console.log('lokasi:', lokasi);
        console.log('nama_narahubung:', nama_narahubung);
        console.log('email:', email);
        console.log('no_ponsel:', no_ponsel);
        console.log('deskripsi_acara:', deskripsi_acara);
        console.log('syarat_ketentuan:', syarat_ketentuan);

    const initialState = {
        message: '',
    }

    const [state, formAction] = useFormState(UpdateAcara, initialState)
    console.log(formAction)
    console.log(state);

    useEffect(() => {
        async function fetchData() {
            const getData = await fetch(`/event/buat_event/acara/edit/api/readAcara/${params.id}`,
                { method: 'GET' }
            )
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
            {/* <button onClick={() => { tes(12) }}>cek</button> */}
            <Navbar />
            <div className="flex  justify-center">
                <Sidebar />
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form
                        className="py-6 px-9"
                        action={formAction}
                    >
                        <div className="mb-6 pt-4">
                            <label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload Thumbnail</label>
                            <div className="mb-5">
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
                                {state?.nama_event && <div className="text-black">{state.nama_event}</div>}

                            </div>

                            <div className="mb-5">
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
                                {state?.tanggal_acara && <div className="text-black">{state.tanggal_acara}</div>}

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
                                {state?.lokasi && <div className="text-black">{state.lokasi}</div>}
                            </div>

                            <div className="mb-5">
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
                                {state?.waktu_acara && <div classNameName="text-black">{state.waktu_acara}</div>}
                            </div>

                            <div className="mb-5">
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
                                {state?.nama_narahubung && <div className="text-black">{state.nama_narahubung}</div>}
                            </div>

                            <div className="mb-5">
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
                                {state?.email && <div className="text-black">{state.email}</div>}
                            </div>

                            <div className="mb-5">
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
                                    onChange={(e) => { setNo_ponsel(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.no_ponsel && <div className="text-black">{state.no_ponsel}</div>}
                            </div>

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
                                {state?.deskripsi_acara && <div className="text-black">{state.deskripsi_acara}</div>}
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
                                {state?.syarat_ketentuan && <div className="text-black">{state.syarat_ketentuan}</div>}
                            </div>
                        </div>
                        <SubmitButton />
                    </form>
                </div >
            </div >
        </div >
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="hover:shadow-form w-full rounded-md bg-[#2D6C70] py-3 px-8 text-center text-base font-semibold text-white outline-none">{pending ? "Submitting..." : "Submit"}</button>
    )
}