'use client'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchData } from 'next-auth/client/_utils';
const prisma = new PrismaClient()

export default function Event() {
  return (
    <Acara />
  )
}

function Acara() {

  // get data acara
  const [acaras, setAcara] = useState([]);
  console.log(acaras);
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch acaras
        const acarasResponse = await fetch('/event/api/ReadAcara');
        const acarasData = await acarasResponse.json();
        console.log(acarasData);
        // Set acaras state
        if (Array.isArray(acarasData)) {
          setAcara(acarasData);
        } else {
          console.error("Expected an array of acaras but received:", typeof acarasData);
          setAcara([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAcara([]);
      }
    }

    fetchData();
  }, []);

  // delete acara
  const [mdelete, setmDel] = useState({ message: '' });
  async function DeleteAcara(id_acara) {
    console.log(id_acara);
    try {
      const response = await fetch(`/event/buat_event/acara/api/delete/${id_acara}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setmDel({ message: 'berhasil delete data' });
        // Update the acara list after deletion
        setAcara(acaras.filter(acara => acara.id_acara !== id_acara));
      } else {
        const message = await response.json();
        setmDel({ message: 'gagal hapus data', details: message });
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setmDel({ message: 'gagal hapus data', details: error.message });
    }
  }






  return (
    <main className="flex-1 p-4">
      <button>Tambah Acara</button>
      <div className="grid grid-cols-3 gap-4 p-8">
        {mdelete?.message}
        {acaras.map((acara) => {

          const tanggalAcara = new Date(acara.tanggal_acara);
          const formattedDate = tanggalAcara.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
          console.log(formattedDate);
          return (

            <div key={acara.id_acara} className="bg-white shadow-md rounded-md overflow-hidden relative">
              <Link href={`/event/buat_event/acara/detail_acara/${acara.id_acara}`}>
                <div className="p-4 cursor-pointer">
                  <Image src="" alt="" className="w-full" width={10} height={10} />
                  <h3 className="font-bold">{acara.nama_event}</h3>
                  <p className="text-gray-600">
                    {formattedDate} - {new Date(acara.waktu_acara).toLocaleTimeString()}
                  </p>
                </div>
              </Link>
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => DeleteAcara(acara.id_acara)}
              >
                Delete
              </button>
            </div>
          )
        }


        )}
      </div>
    </main >
  )
}



