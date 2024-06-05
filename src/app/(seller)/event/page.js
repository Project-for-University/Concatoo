'use client'

import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../dashboard/component/sidebar';
import Navbar from '../dashboard/component/navbar';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

const prisma = new PrismaClient()

export default function Event() {
  return (
    <Acara />
  )
}

async function Acara() {

  const acaras = await prisma.acara.findMany({
    include: {
      kontak: true,
      deskripsi: true,
    },
  });

  return (
    <div>
      <Navbar />
      <div className="flex justify-between">
        <Sidebar />
        <main className="flex-1 p-4">
          <Link className="text-gray-700 border rounded-lg p-2 " href={`/event/buat_event/acara`}>+ Tambah Acara</Link>
          <div className="grid grid-cols-3 gap-4 p-8">
            {acaras.map((acara) => (
              <div key={acara.id_acara} className="bg-white shadow-md rounded-md overflow-hidden">
                <Link href={`/event/buat_event/acara/detail_acara/${acara.id_acara}`}>
                  <img src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/blog/1643376580_R4lRPn.jpg" alt="" className="w-full" />
                  <div className="flex justify-between p-4">
                    <h3 className="font-bold">{acara.nama_event}</h3>
                    <p className="text-gray-600">
                      {new Date(acara.tanggal_acara).toLocaleDateString()} - {new Date(acara.waktu_acara).toLocaleTimeString()}
                    </p>
                    <div className="flex p-4">
                      <Link href={`/event/buat_event/acara/edit/${acara.id_acara}`}>
                        <MdOutlineEdit className="text-gray-500 hover:text-gray-700" />
                      </Link>
                      <Link className="pl-2" href={`/event/buat_event/acara/delete/${acara.id_acara}`}>
                        <MdDeleteOutline className="text-gray-500 hover:text-gray-700" />
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
