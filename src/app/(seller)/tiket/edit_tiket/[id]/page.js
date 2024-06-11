// halaman buat form tiket

'use client'

import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom";
import { useFormState } from 'react-dom'
import Sidebar from "@/app/(seller)/dashboard/component/sidebar";
import Navbar from "@/app/(seller)/dashboard/component/navbar";
import { UpdateTiket } from "../../../../api/seller/tiket/edit_tiket/update_tiket/action";

// import Sidebar from "../sidebar/page";


export default function Edit({ params }) {
    console.log("id tiket");
    console.log(params.id);
    const [nama_tiket, setNama_tiket] = useState('')
    const [jumlah_tiket, setJumlah_tiket] = useState('')
    const [harga, setHarga] = useState('')
    const [deskripsi_tiket, setDeskripsi_tiket] = useState('')
    const [tanggal_mulai_penjualan, setTanggal_mulai_penjualan] = useState('')
    const [waktu_penjualan, setWaktu_penjualan] = useState('')
    const [tanggal_akhir_penjualan, setTanggal_akhir_penjualan] = useState('')
    const [waktu_akhir_penjualan, setWaktu_akhir_penjualan] = useState('')

    const initialState = {
        message: '',
    }

    const [state, formAction] = useFormState(UpdateTiket, initialState)
    console.log(formAction)
    console.log(state)

    useEffect(() => {
        async function fetchData() {
            const getData = await fetch(`/api/seller/tiket/edit_tiket/read_tiket/${params.id}`,
                { method: 'GET' }
            )
            const data = await getData.json()
            console.log(data)

            const start_date = new Date(data.tanggal_mulai_penjualan)
            const year = start_date.getUTCFullYear();
            const month = String(start_date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(start_date.getUTCDate()).padStart(2, '0');
            // Format the date as YYYY-MM-DD
            const formattedDate = `${year}-${month}-${day}`;

            const end_date = new Date(data.tanggal_akhir_penjualan)
            const tahun = end_date.getUTCFullYear();
            const bulan = String(end_date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
            const hari = String(end_date.getUTCDate()).padStart(2, '0');
            // Format the date as YYYY-MM-DD
            const formattedDate2 = `${tahun}-${bulan}-${hari}`;

            const waktu = new Date(data.waktu_penjualan)
            const hours = String(waktu.getUTCHours()).padStart(2, '0');
            const minutes = String(waktu.getUTCMinutes()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;

            const time_end = new Date(data.waktu_akhir_penjualan)
            const jam = String(time_end.getUTCHours()).padStart(2, '0');
            const menit = String(time_end.getUTCMinutes()).padStart(2, '0');
            const formattedTime2 = `${jam}:${menit}`;

            if (getData.ok) {
                setNama_tiket(data.nama_tiket)
                setJumlah_tiket(data.jumlah_tiket)
                setHarga(data.harga)
                setDeskripsi_tiket(data.deskripsi_tiket)
                setTanggal_mulai_penjualan(formattedDate)
                setWaktu_penjualan(formattedTime)
                setTanggal_akhir_penjualan(formattedDate2)
                setWaktu_akhir_penjualan(formattedTime2)
            }

        }
        fetchData()
    }, [params.id])


    const handleJumlah = (event) => {
        const newValue = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        const parsedValue = parseFloat(newValue);
        if (parsedValue >= 0 && parsedValue < 100000 || newValue === '') {
            setJumlah_tiket(newValue);
        }
    };

    const handleHarga = (event) => {
        const newValue = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        const parsedValue = parseFloat(newValue);

        // Check if the parsed value is within the limit
        if (parsedValue <= 9999999 || newValue === '') {
            setHarga(newValue);
        }
    };



    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <Sidebar />
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form
                        className="py-6 px-9"
                        action={formAction}
                    // method="POST"
                    >
                        <input type="hidden" name="id_tiket" value={params.id} />
                        <div className="mb-6 pt-4">
                            <div className="mb-5">
                                <label
                                    htmlFor="nama_tiket"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Nama Tiket
                                </label>
                                <input
                                    type="text"
                                    name="nama_tiket"
                                    id="nama_tiket"
                                    placeholder="Nama Tiket"
                                    value={nama_tiket}
                                    onChange={(e) => { setNama_tiket(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.nama_tiket && <div className="text-black">{state.nama_tiket}</div>}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="jumlah_tiket"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Jumlah tiket
                                </label>
                                <input
                                    type="text"
                                    name="jumlah_tiket"
                                    id="jumlah_tiket"
                                    value={jumlah_tiket}
                                    onChange={handleJumlah}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.jumlah_tiket && <div className="text-black">{state.jumlah_tiket}</div>}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="harga"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Harga
                                </label>
                                <input
                                    type="text"
                                    name="harga"
                                    id="harga"
                                    placeholder="100000"
                                    value={harga}
                                    onChange={handleHarga}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.harga && <div className="text-black">{state.harga}</div>}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="deskripsi_tiket"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Deskripsi Acara
                                </label>
                                <textarea
                                    type="text"
                                    name="deskripsi_tiket"
                                    id="deskripsi_tiket"
                                    value={deskripsi_tiket}
                                    onChange={(e) => { setDeskripsi_tiket(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.deskripsi_tiket && <div className="text-black">{state.deskripsi_tiket}</div>}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="tanggal_mulai_penjualan"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Tanggal Mulai Penjualan
                                </label>
                                <input
                                    type="date"
                                    name="tanggal_mulai_penjualan"
                                    id="tanggal_mulai_penjualan"
                                    value={tanggal_mulai_penjualan}
                                    onChange={(e) => { setTanggal_mulai_penjualan(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.tanggal_mulai_penjualan && <div className="text-black">{state.tanggal_mulai_penjualan}</div>}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="waktu_penjualan"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Waktu Penjualan
                                </label>
                                <input
                                    type="time"
                                    name="waktu_penjualan"
                                    id="waktu_penjualan"
                                    value={waktu_penjualan}
                                    onChange={(e) => { setWaktu_penjualan(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.waktu_penjualan && <div className="text-black">{state.waktu_penjualan}</div>}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="tanggal_akhir_penjualan"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Tanggal Akhir Penjualan
                                </label>
                                <input
                                    type="date"
                                    name="tanggal_akhir_penjualan"
                                    id="tanggal_akhir_penjualan"
                                    value={tanggal_akhir_penjualan}
                                    onChange={(e) => { setTanggal_akhir_penjualan(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.tanggal_akhir_penjualan && <div className="text-black">{state.tanggal_akhir_penjualan}</div>}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="waktu_akhir_penjualan"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Waktu Akhir Penjualan
                                </label>
                                <input
                                    type="time"
                                    name="waktu_akhir_penjualan"
                                    id="waktu_akhir_penjualan"
                                    placeholder="Deskripsi acara"
                                    value={waktu_akhir_penjualan}
                                    onChange={(e) => { setWaktu_akhir_penjualan(e.target.value) }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {state?.waktu_akhir_penjualan && <div className="text-black">{state.waktu_akhir_penjualan}</div>}
                            </div>
                        </div>
                        <SubmitButton />
                    </form>
                </div >
            </div >
        </div>

    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="hover:shadow-form w-full rounded-md bg-[#2D6C70] py-3 px-8 text-center text-base font-semibold text-white outline-none">{pending ? "Submitting..." : "Submit"}</button>
    )
}