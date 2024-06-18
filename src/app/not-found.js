import Link from "next/link";

export default function Pages() {
    return (
        <div className="text-center pt-52">

            <p className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 via-sky-400 to-emerald-400 inline-block text-transparent bg-clip-text">404 - Halaman Tidak Ada</p>
            <p className="text-gray-600 mb-40"> Halaman kamu ingin mungkin ngga ada, sudah di rubah, atau memang ngga ada nihh...</p>
            <Link href={'/'} className="  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium px-6 py-3 rounded-full text-center me-2 mb-2 ">Go to Homepage</Link>

        </div>
    );
}
