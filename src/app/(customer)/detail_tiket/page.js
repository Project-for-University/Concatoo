import Image from "next/image";
import Navbar from "../navbar/navbar";

export default function Pages() {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="pb-4"><Navbar /></div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    <Image src="" width={500} height={500} alt="Musikal Keluarga Cemara" className="w-full lg:w-1/2 object-cover" />
                    <div className="p-6 lg:w-1/2">
                        <h1 className="text-2xl font-bold">Musikal Keluarga Cemara</h1>
                        <p className="text-gray-600 mt-2">[Sabtu, 22 Juni 2024]</p>
                        <p className="text-gray-600">22 Jun 2024</p>
                        <p className="text-gray-600">Ciputra Artpreneur, DKI Jakarta</p>
                        <div className="mt-4">
                            <button className="bg-white text-gray-800 px-4 py-2 rounded border-2 border-gray-300">Beli Tiket</button>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50">
                    <h2 className="text-xl font-bold">DESKRIPSI</h2>
                    <p className="mt-4 text-gray-700">
                        Harta yang paling berharga adalah keluarga...
                    </p>
                    <p className="mt-2 text-gray-700">
                        Bersiaplah untuk terhanyut dalam pertunjukan panggung yang menakjubkan, Pertunjukan Panggung Musikal Keluarga Cemara. Sebuah pertunjukan yang diangkat dari film legendaris Keluarga Cemara, yang telah menghangatkan hati keluarga Indonesia.
                    </p>
                    <p className="mt-2 text-gray-700">
                        Pertunjukan ini menghadirkan pengalaman imersif dan spektakuler, membawa penonton dari segala usia ke dalam dunia yang penuh dengan kisah-kisah mendalam dan emosional. Saksikan bagaimana cerita keluarga sederhana ini dihidupkan kembali di atas panggung dan memberikan pengalaman yang mendalam dan menyentuh hati.
                    </p>
                </div>
            </div>
        </div>

    );
}