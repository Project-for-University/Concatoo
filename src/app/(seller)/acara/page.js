'use client'

import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../dashboard/component/sidebar';
import Navbar from '../dashboard/component/navbar';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { Suspense, useEffect, useState } from 'react';

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
        const acarasResponse = await fetch('/api/seller/acara/read_acara');
        const acarasData = await acarasResponse.json();
        console.log(acarasData);
        // Set acaras state
        if (acarasData) {
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
      const response = await fetch(`/api/seller/acara/delete_acara/${id_acara}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('berhasil hapus');
        setmDel({ message: 'berhasil delete data' });
        // kalo berhasil update read data terbaru
        const acarasResponse = await fetch('/api/seller/acara/read_acara');
        const acarasData = await acarasResponse.json();
        console.log(acarasData);
        // Set acaras state
        if (Array.isArray(acarasData)) {
          setAcara(acarasData);
        } else {
          console.error("Expected an array of acaras but received:", typeof acarasData);
          setAcara([]);
        }

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
    <div>
      <Navbar />
      <div className="flex justify-between">
        <Sidebar />
        <main className="flex-1 p-4">
          <Link className="bg-white shadow-lg hover:bg-orange-100 text-gray-700 border rounded-lg p-2  " href={`acara/buat_acara`}>+ Tambah Acara</Link>
          <div className="grid grid-cols-3 gap-4 p-8">
            {acaras.map((acara) => (
              <div key={acara.id_acara} className="relative bg-white shadow-md rounded-md overflow-hidden">
                <Link href={`detail_acara/${acara.id_acara}`}>
                  <Image src={acara.banner} width={10} height={10} alt="" className="w-full" />
                  <div className="flex justify-between p-4">
                    <h3 className="font-bold">{acara.nama_event}</h3>
                    <p className="text-gray-600">
                      {new Date(acara.tanggal_acara).toLocaleDateString()} - {new Date(acara.waktu_acara).toLocaleTimeString()}
                    </p>
                  </div>
                </Link>
                <div className="absolute top-4 right-4 flex space-x-4">
                  <Link href={`acara/edit_acara/${acara.id_acara}`} className='bg-white p-2 rounded-full shadow-md'>
                    <MdOutlineEdit className="text-orange-500 hover:text-orange-700" />
                  </Link>

                  <button onClick={() => { DeleteAcara(acara.id_acara) }} className='bg-white p-2 rounded-full shadow-md'>
                    <MdDeleteOutline className="text-orange-500 hover:text-orange-700" />
                  </button>
                </div>
              </div>
            ))}

          </div>
        </main>
      </div>
    </div>
  )
}
