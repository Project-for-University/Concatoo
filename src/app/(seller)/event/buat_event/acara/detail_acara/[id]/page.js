import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import 'flowbite';
import Link from 'next/link';


export default function detailAcara({ params }) {

    return (
        <Card param={params} />
    )
}

async function Card({ param }) {

    const acara = await prisma.acara.findFirst({
        where: {
            id_acara: param.id
        },
        include: {
            deskripsi: true,
            kontak: true
        }
    })


    return (
        <>


            < div className="max-w-7xl mx-auto p-4" >
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        <img src="https://via.placeholder.com/300x150" alt="Musikal Keluarga Cemara" className="w-full lg:w-1/2 object-cover" />
                        <div className="p-6 lg:w-1/2">
                            <h1 className="text-2xl font-bold">{acara.nama_event}</h1>
                            <p className="text-gray-600 mt-2">{new Date(acara.tanggal_acara).toLocaleDateString()}</p>
                            <p className="text-gray-600">{new Date(acara.waktu_acara).toLocaleTimeString()}</p>
                            <p className="text-gray-600">{acara.lokasi}</p>
                            <div className="mt-4">
                                {/* ganti */}
                                <Link key={acara.id_acara} href={`/event/buat_event/tiket/${acara.id_acara}`} className="block text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">   Tambah Tiket</Link>
                                {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                    Tambah Tiket
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50">
                        <h2 className="text-xl font-bold">DESKRIPSI</h2>
                        <p className="mt-4 text-gray-700">
                            {acara.deskripsi.deskripsi_acara}
                        </p>
                    </div>
                </div>
            </div >
        </>
    )
}