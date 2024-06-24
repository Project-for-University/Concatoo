


import Link from "next/link"


export default function CardDashboard({ total_acara, total_tiket }) {

    return (
        <>

            <div className="flex flex-wrap -mx-2 my-4 ">
                <div className="w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 mt-4 md:-mt-1">
                    <Link href="#" className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                        <p className="font-normal text-gray-500">Total Acara</p>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{total_acara}</h5>
                    </Link>
                </div>
                <div className="w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 mt-4 md:-mt-1">
                    <Link href="#" className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                        <p className="font-normal text-gray-500">Total Tiket</p>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{total_tiket}</h5>
                    </Link>
                </div>
            </div>
        </>
    )
}