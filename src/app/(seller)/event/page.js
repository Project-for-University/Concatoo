'use client'

import { PrismaClient } from '@prisma/client'
import Image from 'next/image';
import Link from 'next/link';
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
    <main className="flex-1 p-4">
      <button>Tambah Acara</button>
      <div className="grid grid-cols-3 gap-4 p-8">
        {acaras.map((acara) => (
          <Link key={acara.id_acara} href={`/event/buat_event/acara/detail_acara/${acara.id_acara}`}>
            <div key={acara.id_acara} className="bg-white shadow-md rounded-md overflow-hidden">
              <img src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/blog/1643376580_R4lRPn.jpg" alt="" className="w-full" />
              <div className="p-4">
                <h3 className="font-bold">{acara.nama_event}</h3>
                <p className="text-gray-600">
                  {new Date(acara.tanggal_acara).toLocaleDateString()} - {new Date(acara.waktu_acara).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}