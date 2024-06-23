import Link from "next/link";

export default function Beranda() {
    return(
        <div className="flex flex-cols-3 gap-3 w-full mx-2 my-6">
            <div className="">
                <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Pengguna</h5>
                    <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </Link>
            </div>
            <div className="">
                <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Acara</h5>
                    <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </Link>
            </div>
        </div>
    )
};
