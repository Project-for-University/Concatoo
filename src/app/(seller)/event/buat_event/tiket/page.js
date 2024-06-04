// halaman buat form tiket

'use client'

import { useState } from "react"
import { useFormStatus } from "react-dom";
import { useFormState } from 'react-dom'
import { CreateTiket } from "./api/create/page";

// import Sidebar from "../sidebar/page";


export default function Ticket() {
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

    const [state, formAction] = useFormState(CreateTiket, initialState)
    console.log(formAction)

    return (
        <div className="flex items-center justify-center p-4">
            {/* <Sidebar/> */}
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form
                    className="py-6 px-9"
                    action={formAction}
                // method="POST"
                >
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
                            {state?.nama_tiket && <div className="text-white">{state.nama_tiket}</div>}
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
                                onChange={(e) => { setJumlah_tiket(e.target.value) }}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {state?.jumlah_tiket && <div className="text-white">{state.jumlah_tiket}</div>}

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
                                onChange={(e) => { setHarga(e.target.value) }}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {state?.harga && <div className="text-white">{state.harga}</div>}
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
                            {state?.deskripsi_tiket && <div className="text-white">{state.deskripsi_tiket}</div>}
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
                            {state?.tanggal_mulai_penjualan && <div className="text-white">{state.tanggal_mulai_penjualan}</div>}
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
                            {state?.waktu_penjualan && <div className="text-white">{state.waktu_penjualan}</div>}
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
                            {state?.tanggal_akhir_penjualan && <div className="text-white">{state.tanggal_akhir_penjualan}</div>}
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="waktu_akhir_penjualan"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Waktu Akhir Penjualan
                            </label>
                            <textarea
                                name="waktu_akhir_penjualan"
                                id="waktu_akhir_penjualan"
                                placeholder="Deskripsi acara"
                                value={waktu_akhir_penjualan}
                                onChange={(e) => { setWaktu_akhir_penjualan(e.target.value) }}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {state?.waktu_akhir_penjualan && <div className="text-white">{state.waktu_akhir_penjualan}</div>}
                        </div>
                    </div>
                    <SubmitButton />
                </form>
            </div >
        </div >
    )
}

function SubmitButton() {
    const { pending } = { useFormStatus }
    return (
        <button type="submit" className="hover:shadow-form w-full rounded-md bg-[#2D6C70] py-3 px-8 text-center text-base font-semibold text-white outline-none">{pending ? "Submitting..." : "Submit"}</button>
    )
}