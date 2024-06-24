// halaman buat form tiket

'use client'

import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from 'react-dom'
import { UpdateTiket } from "../../../../api/seller/tiket/edit_tiket/update_tiket/action";

// import Sidebar from "../sidebar/page";


export default function Edit({ params }) {
    // console.log("id tiket");
    // console.log(params.id[0]);//tangkap url indeks 0 = id tiket
    // console.log(params.id[1]);//tangkap url indeks 1 = id acara
    const [nama_tiket, setNama_tiket] = useState('')
    const [jumlah_tiket, setJumlah_tiket] = useState('')
    const [harga, setHarga] = useState('')
    const [deskripsi_tiket, setDeskripsi_tiket] = useState('')
    const [tanggal_mulai_penjualan, setTanggal_mulai_penjualan] = useState('')
    const [waktu_mulai_penjualan, setWaktu_mulai_penjualan] = useState('')
    const [tanggal_akhir_penjualan, setTanggal_akhir_penjualan] = useState('')
    const [waktu_akhir_penjualan, setWaktu_akhir_penjualan] = useState('')

    const initialState = {
        message: '',
    }

    const [state, formAction] = useFormState(UpdateTiket, initialState)
    // console.log(formAction)
    // console.log(state)

    useEffect(() => {
        async function fetchData() {
            const getData = await fetch(`/api/seller/tiket/edit_tiket/read_tiket/${params.id[0]}`, {
                method: 'GET',


            })
            const data = await getData.json()
            // console.log(data)

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

            const waktu = new Date(data.waktu_mulai_penjualan)
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
                setWaktu_mulai_penjualan(formattedTime)
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
            {/* <Navbar /> */}
            <div className="flex justify-center mb-4">
                {/* <Sidebar /> */}
                <div className="mx-auto w-full max-w-[900px] shadow-md mt-8 rounded-md bg-white">
                    <div className="mt-8 ml-8 text-[#07074D] font-semibold text-xl">Edit Tiket</div>
                    <form className="py-6 px-9 mb-6 pt-4" action={formAction}>
                        {/* id acara */}
                        <input type="hidden" name="id_acara" value={params.id[1]} />
                        {/* ide tiket */}
                        <input type="hidden" name="id_tiket" value={params.id[0]} />
                        <div className="">
                            <label htmlFor="nama_tiket" className="mb-3 block text-base font-medium text-gray-600">
                                Nama Tiket
                            </label>
                            <input
                                type="text"
                                name="nama_tiket"
                                id="nama_tiket"
                                placeholder="Nama Tiket"
                                value={nama_tiket}
                                onChange={(e) => {
                                    setNama_tiket(e.target.value);
                                }}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-demerald-200 focus:shadow-md"
                            />
                            {state?.nama_tiket && <div className="text-red-500">{state.nama_tiket}</div>}
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-4 pt-4">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div className="">
                                    <label htmlFor="harga" className="mb-3 block text-base font-medium text-gray-600">
                                        Harga
                                    </label>
                                    <input
                                        type="text"
                                        name="harga"
                                        id="harga"
                                        placeholder="100000"
                                        value={harga}
                                        onChange={handleHarga}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-demerald-200 focus:shadow-md"
                                    />
                                    {state?.harga && <div className="text-red-500">{state.harga}</div>}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div className="">
                                    <label htmlFor="jumlah_tiket" className="mb-3 block text-base font-medium text-gray-600">
                                        Jumlah tiket
                                    </label>
                                    <input
                                        type="text"
                                        name="jumlah_tiket"
                                        id="jumlah_tiket"
                                        value={jumlah_tiket}
                                        onChange={handleJumlah}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-demerald-200 focus:shadow-md"
                                    />
                                    {state?.jumlah_tiket && <div className="text-red-500">{state.jumlah_tiket}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 mb-3 text-black font-semibold text-xl">Tanggal dan Waktu Penjualan Tiket</div>

                        <div className="flex flex-wrap -mx-3 mb-4 pt-4">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div className="mb-5">
                                    <label
                                        htmlFor="tanggal_mulai_penjualan"
                                        className="mb-3 block text-base font-medium text-gray-600"
                                    >
                                        Tanggal Mulai Penjualan
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_mulai_penjualan"
                                        id="tanggal_mulai_penjualan"
                                        value={tanggal_mulai_penjualan}
                                        onChange={(e) => {
                                            setTanggal_mulai_penjualan(e.target.value);
                                        }}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-demerald-200 focus:shadow-md"
                                    />
                                    {state?.tanggal_mulai_penjualan && (
                                        <div className="text-red-500">{state.tanggal_mulai_penjualan}</div>
                                    )}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="waktu_penjualan" className="mb-3 block text-base font-medium text-gray-600">
                                        Waktu Penjualan
                                    </label>
                                    <input
                                        type="time"
                                        name="waktu_penjualan"
                                        id="waktu_penjualan"
                                        value={waktu_mulai_penjualan}
                                        onChange={(e) => {
                                            setWaktu_mulai_penjualan(e.target.value);
                                        }}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-demerald-200 focus:shadow-md"
                                    />
                                    {state?.waktu_penjualan && <div className="text-red-500">{state.waktu_penjualan}</div>}
                                </div>

                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div className="mb-5">
                                    <label htmlFor="tanggal_akhir_penjualan" className="mb-3 block text-base font-medium text-gray-600">
                                        Tanggal Akhir Penjualan
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_akhir_penjualan"
                                        id="tanggal_akhir_penjualan"
                                        value={tanggal_akhir_penjualan}
                                        onChange={(e) => {
                                            setTanggal_akhir_penjualan(e.target.value);
                                        }}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-demerald-200 focus:shadow-md"
                                    />
                                    {state?.tanggal_akhir_penjualan && (
                                        <div className="text-red-500">{state.tanggal_akhir_penjualan}</div>
                                    )}
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="waktu_akhir_penjualan" className="mb-3 block text-base font-medium text-gray-600">
                                        Waktu Akhir Penjualan
                                    </label>
                                    <input
                                        type="time"
                                        name="waktu_akhir_penjualan"
                                        id="waktu_akhir_penjualan"
                                        placeholder="Deskripsi acara"
                                        value={waktu_akhir_penjualan}
                                        onChange={(e) => {
                                            setWaktu_akhir_penjualan(e.target.value);
                                        }}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-demerald-200 focus:shadow-md"
                                    />
                                    {state?.waktu_akhir_penjualan && (
                                        <div className="text-red-500">{state.waktu_akhir_penjualan}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="deskripsi_tiket" className="mb-3 block text-base font-medium text-gray-600">
                                Deskripsi Acara
                            </label>
                            <textarea
                                type="text"
                                name="deskripsi_tiket"
                                id="deskripsi_tiket"
                                value={deskripsi_tiket}
                                onChange={(e) => {
                                    setDeskripsi_tiket(e.target.value);
                                }}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-demerald-200 focus:shadow-md"
                            />
                            {state?.deskripsi_tiket && <div className="text-red-500">{state.deskripsi_tiket}</div>}
                        </div>
                        <SubmitButton />
                    </form>
                </div>
            </div>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="hover:shadow-form w-full rounded-md bg-gradient-to-b from-emerald-300 to-emerald-400 py-3 px-8 text-center text-base font-semibold text-white outline-none">{pending ? "Submitting..." : "Simpan Perubahan"}</button>
    )
}