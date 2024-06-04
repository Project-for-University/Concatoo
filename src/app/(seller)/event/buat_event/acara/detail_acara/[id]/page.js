import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import 'flowbite';


export default function detailAcara({ params }) {
    console.log(params);
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
            <div id="crud-modal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create Ticket
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label for="nama_tiket" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Tiket</label>
                                <input type="text" name="nama_tiket" id="nama_tiket" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nama Tiket" required=""/>
                            </div>
                            <div className="col-span-2">
                                <label for="jumlah_tiket" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah Tiket</label>
                                <input type="text" name="jumlah_tiket" id="jumlah_tiket" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required=""/>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label for="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="text" name="harga" id="harga" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rp. 100.000" required=""/>
                            </div>
                            <div className="col-span-2">
                                <label for="deskripsi_tiket" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi Tiket</label>
                                <textarea id="deskripsi_tiket" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis deskripsi tiket di sini"></textarea>                    
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label for="tanggal_mulai_penjualan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Mulai Penjualan</label>
                                <input type="date" name="tanggal_mulai_penjualan" id="tanggal_mulai_penjualan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rp. 100.000" required=""/>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label for="waktu_penjualan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waktu Penjualan</label>
                                <input type="time" name="waktu_penjualan" id="waktu_penjualan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rp. 100.000" required=""/>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label for="tanggal_akhir_penjualan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Akhir Penjualan</label>
                                <input type="date" name="tanggal_akhir_penjualan" id="tanggal_akhir_penjualan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rp. 100.000" required=""/>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label for="waktu_akhir_penjualan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waktu Akhir Penjualan</label>
                                <input type="time" name="waktu_akhir_penjualan" id="waktu_akhir_penjualan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rp. 100.000" required=""/>
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Tambah Tiket
                        </button>
                    </form>
                </div>
            </div>
            </div> 

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
                            <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            Tambah Tiket
                            </button>
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