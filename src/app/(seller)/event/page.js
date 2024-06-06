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
