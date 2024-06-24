import Link from "next/link";

export default function Beranda({ total_seller, total_acara }) {
    return (
        <div className="flex flex-cols-3 gap-3 w-full mx-2 my-6">
            <div className="">
                <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Total Seller</h5>
                    <p className="font-normal text-gray-700">{total_seller}</p>
                </Link>
            </div>
            <div className="">
                <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Total Acara</h5>
                    <p className="font-normal text-gray-700">{total_acara}</p>
                </Link>
            </div>
        </div>
    )
};
