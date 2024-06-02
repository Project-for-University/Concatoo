import Navbar from "../navbar/navbar";

export default function Pages() {
    return (
        <div class="max-w-7xl mx-auto p-4">
        <div className="pb-4"><Navbar/></div>
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="flex flex-col lg:flex-row">
                <img src="https://via.placeholder.com/300x150" alt="Musikal Keluarga Cemara" class="w-full lg:w-1/2 object-cover"/>
                <div class="p-6 lg:w-1/2">
                    <h1 class="text-2xl font-bold">Musikal Keluarga Cemara</h1>
                    <p class="text-gray-600 mt-2">[Sabtu, 22 Juni 2024]</p>
                    <p class="text-gray-600">22 Jun 2024</p>
                    <p class="text-gray-600">Ciputra Artpreneur, DKI Jakarta</p>
                    <div class="mt-4">
                        <button class="bg-white text-gray-800 px-4 py-2 rounded border-2 border-gray-300">Beli Tiket</button>
                    </div>
                    {/* <div class="mt-4 flex space-x-3">
                        <a href="#" class="text-gray-500 hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.29 6.29a1 1 0 011.42 0l1.38 1.38a8 8 0 111.43-1.42l-1.38-1.38a1 1 0 010-1.42z" />
                            </svg>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12l9-4.5M12 12l-9-4.5m0 9l9-4.5m0 0v9m0-9L3 7.5m9 4.5l9-4.5M3 12v7a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            </svg>
                        </a>
                    </div> */}
                </div>
            </div>
            <div class="p-6 bg-gray-50">
                <h2 class="text-xl font-bold">DESKRIPSI</h2>
                <p class="mt-4 text-gray-700">
                    Harta yang paling berharga adalah keluarga...
                </p>
                <p class="mt-2 text-gray-700">
                    Bersiaplah untuk terhanyut dalam pertunjukan panggung yang menakjubkan, Pertunjukan Panggung Musikal Keluarga Cemara. Sebuah pertunjukan yang diangkat dari film legendaris Keluarga Cemara, yang telah menghangatkan hati keluarga Indonesia.
                </p>
                <p class="mt-2 text-gray-700">
                    Pertunjukan ini menghadirkan pengalaman imersif dan spektakuler, membawa penonton dari segala usia ke dalam dunia yang penuh dengan kisah-kisah mendalam dan emosional. Saksikan bagaimana cerita keluarga sederhana ini dihidupkan kembali di atas panggung dan memberikan pengalaman yang mendalam dan menyentuh hati.
                </p>
            </div>
        </div>
    </div>

    );
}


