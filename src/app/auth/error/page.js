import Link from "next/link";

export default function Pages() {
    return (
        <div className="text-center pt-52">

            <p className="text-4xl font-extrabold bg-gradient-to-b from-emerald-300 to-emerald-400 inline-block text-transparent bg-clip-text">Akun Anda Diblokir</p>
            <p className="text-gray-600 mb-40">Ajukan Aktivasi Akun Anda melalui Email concatoo@gmail.com</p>
            <Link href={'/'} className="  text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium px-6 py-3 rounded-full text-center me-2 mb-2 ">Pergi ke Halaman Utama</Link>
        </div>
    );
}
