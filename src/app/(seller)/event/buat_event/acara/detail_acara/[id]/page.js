import Navbar from '@/app/(seller)/dashboard/component/navbar';
import Sidebar from '@/app/(seller)/dashboard/component/sidebar';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import 'flowbite';
import Link from 'next/link';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';


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
    const tanggalAcara = new Date(acara.tanggal_acara);
    const formattedDate = tanggalAcara.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                < div className="w-full p-4" >
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            <img src="https://via.placeholder.com/300x150" alt="Musikal Keluarga Cemara" className="w-full lg:w-1/2 object-cover" />
                            <div className="p-6 lg:w-1/2">
                                <h1 className="text-2xl font-bold">{acara.nama_event}</h1>
                                <p className="text-gray-600 mt-2">{formattedDate}</p>
                                <p className="text-gray-600">{new Date(acara.waktu_acara).toLocaleTimeString()}</p>
                                <p className="text-gray-600">{acara.lokasi}</p>
                                <div className="mt-4">
                                    {/* ganti */}
                                    <Link key={acara.id_acara} href={`/event/buat_event/tiket/${acara.id_acara}`} className="block w-48 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">   Tambah Tiket</Link>
                                    {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                    Tambah Tiket
                                </button> */}
                                </div>
                            </div>
                        </div>
                        <div className="p-2">
                            <b>Deskripsi</b><br />
                            <p className="">
                                {acara.deskripsi.deskripsi_acara}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white shadow-md rounded-lg overflow-hidden mt-10 w-1/2">
                            <h1 className="text-2xl font-bold pl-4 pt-4">Nama Tiket</h1>
                            <div className="flex justify-between">
                                <div className="p-6 lg:w-1/2">
                                    <p className="text-gray-600 mt-2">Jumlah Tiket</p>
                                    <p className="text-gray-600">Harga</p>
                                    <p className="text-gray-600">Deskripsi Tiket</p>
                                </div>
                                <div className="p-6 lg:w-1/2">
                                    <p className="text-gray-600">Tanggal mulai penjualan - Tanggal akhir penjualan</p>
                                    <p className="text-gray-600">Waktu awal penjualan -Waktu akhir penjualan</p>
                                </div>
                            </div>
                            <div className="flex p-4 justify-end mr-6">
                                <Link href={``}>
                                    <MdOutlineEdit className="text-gray-500 hover:text-gray-700" />
                                </Link>
                                <Link className="pl-2" href={``}>
                                    <MdDeleteOutline className="text-gray-500 hover:text-gray-700" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}