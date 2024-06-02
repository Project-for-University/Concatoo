'use client'

import { useState } from "react"
import { useFormStatus } from "react-dom";
import {useFormState} from 'react-dom'

import { CreateEvent } from "./api/CreateEvent";
import Sidebar from "../sidebar/page";

function Ticket (){
  const [nama_event, setNama_event] = useState('')
  const [foto_profie, setFoto_profie] = useState('')
  const [tanggal_acara, setTanggal_acara] = useState('')
  const [waktu_acara, setWaktu_acara] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [nama_narahubung, setNama_narahubung] = useState('')
  const [email, setEmail] = useState('')
  const [no_ponsel, setNo_ponsel] = useState('')
  const [deskripsi_acara, setDeskripsi_acara] = useState('')
  const [syarat_ketentuan, setSyarat_ketentuan] = useState('')

  const initialState = {
    message: '',
  }

  const [state, formAction] = useFormState(CreateEvent, initialState)
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
            <label class="mb-5 block text-xl font-semibold text-[#07074D]">
              Upload Thumbnail
            </label>

            <div class="mb-8">
              <input value={foto_profie} type="file" name="foto_profie" id="foto_profie" onChange={(e) => { setFoto_profie(e.target.value) }} class="sr-only" />
              {state?.foto_profie && <div className="text-white">{state.foto_profie}</div>}
              <label
                for="foto_profie"
                class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
              >
                <div>
                  <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                    Drop files here
                  </span>
                  <span class="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span
                    class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                  >
                    Browse
                  </span>
                </div>
              </label>
            </div>

            <div class="mb-5">
            <label
              for="nama_event"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nama Acara
            </label>
            <input
              type="text"
              name="nama_event"
              id="nama_event"
              placeholder="Nama event"
              value={nama_event}
              onChange={(e) => { setNama_event(e.target.value) }}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {state?.nama_event && <div className="text-white">{state.nama_event}</div>}

            
            </div>

            <div class="mb-5">
              <label
                for="tanggal_acara"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Tanggal Acara
              </label>
              <input
                type="date"
                name="tanggal_acara"
                id="tanggal_acara"
                value={tanggal_acara}
                onChange={(e)=> {setTanggal_acara(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.tanggal_acara && <div className="text-white">{state.tanggal_acara}</div>}

            </div>

            <div class="mb-5">
              <label
                for="lokasi"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Lokasi
              </label>
              <input
                type="text"
                name="lokasi"
                id="lokasi"
                placeholder="Lokasi"
                value={lokasi}
                onChange={(e)=>{setLokasi(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.username && <div className="text-white">{state.username}</div>}
            </div>
            
            <div class="mb-5">
              <label
                for="waktu_acara"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Waktu Acara
              </label>
              <input
                type="time"
                name="waktu_acara"
                id="waktu_acara"
                value={waktu_acara}
                onChange={(e)=> {setWaktu_acara(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.username && <div className="text-white">{state.username}</div>}
            </div>

            <div class="mb-5">
              <label
                for="nama_narahubung"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Nama Nara Hubung
              </label>
              <input
                type="text"
                name="nama_narahubung"
                id="nama_narahubung"
                placeholder="Nama Narahubung"
                value={nama_narahubung}
                onChange={(e) => {setNama_narahubung(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.username && <div className="text-white">{state.username}</div>}
            </div>

            <div class="mb-5">
              <label
                for="email"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.username && <div className="text-white">{state.username}</div>}
            </div>

            <div class="mb-5">
              <label
                for="no_ponsel"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                No ponsel
              </label>
              <input
                type="text"
                name="no_ponsel"
                id="no_ponsel"
                placeholder="No Ponsel"
                value={no_ponsel}
                onChange={(e) => {setNo_ponsel(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.username && <div className="text-white">{state.username}</div>}
            </div>

            <div class="mb-5">
              <label
                for="deskripsi_acara"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Deskripsi Acara
              </label>
              <textarea
                name="deskripsi_acara"
                id="deskripsi_acara"
                placeholder="Deskripsi acara"
                value={deskripsi_acara}
                onChange={(e) => {setDeskripsi_acara(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.username && <div className="text-white">{state.username}</div>}
            </div>

            <div class="mb-5">
              <label
                for="syarat_ketentuan"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Syarat Ketentuan
              </label>
              <textarea
                type="text"
                name="syarat_ketentuan"
                id="syarat_ketentuan"
                placeholder="Syarat & Ketentuan"
                value={syarat_ketentuan}
                onChange={(e) => {setSyarat_ketentuan(e.target.value)}}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {state?.username && <div className="text-white">{state.username}</div>}
            </div>
          </div>
          <SubmitButton/>
        </form>
      </div>
    </div>
    )
}

export default Ticket