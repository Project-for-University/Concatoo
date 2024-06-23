// halaman buat form tiket

'use client'

import { useState } from "react"
import { useFormState, useFormStatus } from 'react-dom'
import { CreateTiket } from "../../../../api/seller/tiket/buat_tiket/action/action";
// import { Datepicker } from "flowbite-react";


export default function Ticket({ params }) {
    // console.log("id tiket");
    // console.log(params.id);
    const [nama_tiket, setNama_tiket] = useState('')
    const [jumlah_tiket, setJumlah_tiket] = useState('')
    const [harga, setHarga] = useState('')
    const [deskripsi_tiket, setDeskripsi_tiket] = useState('')


    const [tanggal_mulai_penjualan, setTanggal_mulai_penjualan] = useState(new Date());
    const [waktu_mulai_penjualan, setWaktu_penjualan] = useState(null);

    const [tanggal_akhir_penjualan, setTanggal_akhir_penjualan] = useState(new Date());
    const [waktu_akhir_penjualan, setWaktu_akhir_penjualan] = useState(null);




    console.log("🚀 ~ Ticket ~ nama_tiket:", nama_tiket)
    console.log("🚀 ~ Ticket ~ jumlah_tiket:", jumlah_tiket)
    console.log("🚀 ~ Ticket ~ harga:", harga)
    console.log("🚀 ~ Ticket ~ deskripsi_tiket:", deskripsi_tiket)
    console.log("🚀 ~ Ticket ~ waktu_penjualan:", waktu_mulai_penjualan)
    console.log("🚀 ~ Ticket ~ tanggal_mulai_penjualan:", tanggal_mulai_penjualan)
    console.log("🚀 ~ Ticket ~ tanggal_akhir_penjualan:", tanggal_akhir_penjualan)
    console.log("🚀 ~ Ticket ~ waktu_akhir_penjualan:", waktu_akhir_penjualan)


    // awal useform state
    const initialState = {
        message: '',
    }
    const [state, formAction] = useFormState(CreateTiket, initialState)
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
    // akhir use form state


    // input date time
    const today = new Date().toISOString().split('T')[0];
    const handleEndTimeChange = (e) => {
        const endTime = e.target.value;

        // Jika tanggal akhir sama dengan tanggal mulai dan waktu akhir kurang dari waktu mulai
        if (tanggal_akhir_penjualan === tanggal_mulai_penjualan && endTime < waktu_mulai_penjualan) {
            alert('Waktu akhir harus lebih dari waktu mulai Penjualan');
            setWaktu_akhir_penjualan('');
            return;
        }

        setWaktu_akhir_penjualan(endTime);
    };
    // akhir input date time


    return (
        <div className="flex justify-center">
            <div className="mx-auto w-full max-w-[50%] h-fit bg-white mt-6 rounded-lg shadow-md">
                <div className="ml-8 mt-6 text-black font-semibold text-xl">Buat Tiket</div>
                <form
                    className="py-3 px-9"
                    action={formAction}
                >
                    <input type="hidden" name="id_acara" value={params.id} />
                    <div className="mt-4">
                        <label
                            htmlFor="nama_tiket"
                            className="mb-3 block text-base font-medium  text-gray-600"
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
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                        />
                        {state?.nama_tiket && <div className="text-red-500">{state.nama_tiket}</div>}
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4 pt-4">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <div className="mb-5">
                                <label
                                    htmlFor="harga"
                                    className="mb-3 block text-base font-medium  text-gray-600"
                                >
                                    Harga
                                </label>
                                <input
                                    type="text"
                                    name="harga"
                                    id="harga"
                                    placeholder="Rp. 100000"
                                    value={harga}
                                    onChange={handleHarga}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                                />
                                {state?.harga && <div className="text-red-500">{state.harga}</div>}
                            </div>
                        </div>


                        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                            <div className="mb-5">
                                <label
                                    htmlFor="jumlah_tiket"
                                    className="mb-3 block text-base font-medium  text-gray-600"
                                >
                                    Jumlah tiket
                                </label>
                                <input
                                    type="text"
                                    name="jumlah_tiket"
                                    id="jumlah_tiket"
                                    value={jumlah_tiket}
                                    onChange={handleJumlah}

                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
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
                                    className="mb-3 block text-base font-medium  text-gray-600"
                                >
                                    Tanggal Mulai Penjualan
                                </label>

                                <input
                                    type="date"
                                    min={today}
                                    value={tanggal_mulai_penjualan}
                                    name="tanggal_mulai_penjualan"
                                    onChange={(e) => setTanggal_mulai_penjualan(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"

                                />

                                {state?.tanggal_mulai_penjualan && (
                                    <div className="text-red-500">{state.tanggal_mulai_penjualan}</div>
                                )}
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="waktu_penjualan"
                                    className="mb-3 block text-base font-medium  text-gray-600"
                                >
                                    Waktu Penjualan
                                </label>
                                <input
                                    type="time"
                                    value={waktu_mulai_penjualan}
                                    onChange={(e) => setWaktu_penjualan(e.target.value)}
                                    name="waktu_mulai_penjualan"
                                    id="waktu_mulai_penjualan"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                                />

                                {state?.waktu_mulai_penjualan && <div className="text-red-500">{state.waktu_mulai_penjualan}</div>}

                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <div className="mb-5">
                                <label
                                    htmlFor="tanggal_akhir_penjualan"
                                    className="mb-3 block text-base font-medium  text-gray-600"
                                >
                                    Tanggal Akhir Penjualan
                                </label>

                                <input
                                    type="date"
                                    name="tanggal_akhir_penjualan"
                                    min={tanggal_mulai_penjualan}
                                    value={tanggal_akhir_penjualan}
                                    onChange={(e) => setTanggal_akhir_penjualan(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                                />

                                {state?.tanggal_akhir_penjualan && (
                                    <div className="text-red-500">{state.tanggal_akhir_penjualan}</div>
                                )}

                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="waktu_akhir_penjualan"
                                    className="mb-3 block text-base font-medium  text-gray-600"
                                >
                                    Waktu Akhir Penjualan
                                </label>
                                <input
                                    type="time"
                                    value={waktu_akhir_penjualan}
                                    onChange={handleEndTimeChange}
                                    name="waktu_akhir_penjualan"
                                    id="waktu_akhir_penjualan"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                                />
                                {state?.waktu_akhir_penjualan && <div className="text-red-500">{state.waktu_akhir_penjualan}</div>}

                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="deskripsi_tiket"
                            className="mb-3 block text-base font-medium  text-gray-600"
                        >
                            Deskripsi Tiket
                        </label>

                        <textarea
                            type="text"
                            name="deskripsi_tiket"
                            id="deskripsi_tiket"
                            value={deskripsi_tiket}
                            onChange={(e) => { setDeskripsi_tiket(e.target.value) }}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-emerald-200 focus:shadow-md"
                        />
                        {state?.deskripsi_tiket && <div className="text-red-500">{state.deskripsi_tiket}</div>}
                    </div>
                    <SubmitButton />
                </form>
            </div >
        </div >
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="hover:shadow-form w-full rounded-md bg-gradient-to-b from-emerald-300 to-emerald-400 py-3 px-8 text-center text-base font-semibold text-white outline-none">{pending ? "Submitting..." : "Simpan"}</button>
    )
}