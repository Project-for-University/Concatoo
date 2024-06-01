'use client'
import { useState } from "react"
import { useFormStatus } from "react-dom";
import { useFormState } from 'react-dom'

import { CreateTiket } from "./api/CreateTiket";
import Sidebar from "../sidebar/page"

function Tiket (){

  const [nama_tiket, setNama_tiket] = useState('')
  const [jumlah_tiket, setJumlah_tiket] = useState('')
  const [harga, setHarga] = useState('')
  const [deskripsi_tiket, setDeskripsi_tiket] = useState('')
  const [tanggal_mulai_penjualan, setTanggal_mulai] = useState('')
  const [waktu_penjualan, setWaktu_penjualan] = useState('')
  const [tanggal_akhir_penjualan, setTanggal_akhir] = useState('')
  const [waktu_akhir_penjualan, setAkhir_penjualan] = useState('')

  const initialState = {
    message: '',
  }

  const [state, formAction] = useFormState(CreateTiket, initialState)
  console.log(formAction)

  function SubmitButton(){
    const {pending} = {useFormStatus}
    return(
      <button type="submit" class="hover:shadow-form w-full rounded-md bg-[#2D6C70] py-3 px-8 text-center text-base font-semibold text-white outline-none">{pending ? "Submitting..." : "Submit"}</button>
    )
  }
    
    return(
    <div class="flex items-center justify-center p-4">
      {/* <Sidebar/> */}
      <div class="mx-auto w-full max-w-[550px] bg-white">
        <form
          class="py-6 px-9"
          action={formAction}
          // method="POST"
        >
          <div class="mb-6 pt-4">
            <div class="mb-5">
              <label
                for="nama_tiket"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                  Nama Tiket
              </label>
              <input
                type="text"
                name="nama_tiket"
                id="nama_tiket"
                placeholder="Nama tiket"
                value={nama_tiket}
                onChange={(e) => {setNama_tiket(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.nama_tiket && <div className="text-white">{state.username}</div>}
            </div>

            <div class="mb-5">
              <label
                for="jumlah_tiket"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Jumlah Tiket
              </label>
              <input
                type="text"
                name="jumlah_tiket"
                id="jumlah_tiket"
                value={jumlah_tiket}
                onChange={(e)=> {setJumlah_tiket(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.jumlah_tiket && <div className="text-white">{state.jumlah_tiket}</div>}
            </div>

            <div class="mb-5">
              <label
                for="harga"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Harga
              </label>
              <input
                type="text"
                name="harga"
                id="harga"
                placeholder="100000"
                value={harga}
                onChange={(e)=> {setHarga(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.harga && <div className="text-white">{state.harga}</div>}
            </div>

            <div class="mb-5">
              <label
                for="deskripsi_tiket"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Deskripsi Tiket
              </label>
              <textarea
                type="text"
                name="deskripsi_tiket"
                id="deskripsi_tiket"
                placeholder="Deskripsi Tiket"
                value={deskripsi_tiket}
                onChange={(e)=> {setDeskripsi_tiket(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.deskripsi_tiket && <div className="text-white">{state.deskripsi_tiket}</div>}
            </div>

            <div class="mb-5">
              <label
                for="tanggal_mulai_penjualan"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Tanggal Mulai Penjualan
              </label>
              <input
                type="date"
                name="tanggal_mulai_penjualan"
                id="tanggal_mulai_penjualan"
                value={tanggal_mulai_penjualan}
                onChange={(e)=> {setTanggal_mulai}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.tanggal_mulai_penjualan && <div className="text-white">{state.tanggal_mulai_penjualan}</div>}
            </div>

            <div class="mb-5">
              <label
                for="waktu_penjualan"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Waktu Penjualan
              </label>
              <input
                type="time"
                name="waktu_penjualan"
                id="waktu_penjualan"
                value={waktu_penjualan}
                onChange={(e)=> {setWaktu_penjualan}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.waktu_penjualan && <div className="text-white">{state.waktu_penjualan}</div>}
            </div>

            <div class="mb-5">
              <label
                for="tanggal_akhir_penjualan"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Tanggal Akhir Penjualan
              </label>
              <input
                type="date"
                name="tanggal_akhir_penjualan"
                id="tanggal_akhir_penjualan"
                value={tanggal_akhir_penjualan}
                onChange={(e)=> {setTanggal_akhir}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.tanggal_akhir_penjualan && <div className="text-white">{state.phonenumber}</div>}
            </div>

            <div class="mb-5">
              <label
                for="waktu_akhir_penjualan"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Waktu Akhir Penjualan
              </label>
              <input
                type="time"
                name="waktu_akhir_penjualan"
                id="waktu_akhir_penjualan"
                value={waktu_akhir_penjualan}
                onChange={(e)=> {setAkhir_penjualan(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.waktu_akhir_penjualan && <div className="text-white">{state.phonenumber}</div>}
            </div>
          </div>
          <SubmitButton/>
        </form>
      </div>
    </div>
    )
}

export default Tiket