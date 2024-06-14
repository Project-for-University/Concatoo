import Image from "next/image"
import Navbar from "../navbar/navbar"

export default function Pages() {
    return (
        <main className="flex-1 p-4">
            <Navbar />
            <div className="grid grid-cols-3 gap-4 p-8">
                <div className="bg-white shadow-md rounded-md overflow-hidden">
                    <Image src="" width={500} height={500} alt="Image 1" className="w-full" />
                    <div className="p-4">
                        <h3 className="font-bold">Heroes, unite for the fantasy realm</h3>
                        <p className="text-gray-600">Recruit Elven maidens, mighty Orcs, powerful frost mages, and countless magical heroes.</p>
                        <p className="text-sm text-gray-500">Bersponsor - Call of Dragons</p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-md overflow-hidden">
                    <Image src="" width={500} height={500} alt="Image 2" className="w-full" />
                    <div className="p-4">
                        <h3 className="font-bold">Mix - Sabrina Carpenter - Espresso (Lyrics)</h3>
                        <p className="text-gray-600">Ed Sheeran, Sabrina Carpenter, Lay Bankz, dan lainnya</p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-md overflow-hidden">
                    <Image src="" width={500} height={500} alt="Image 3" className="w-full" />
                    <div className="p-4">
                        <h3 className="font-bold">Mix - Royel Otis - Linger (The Cranberries Cover)</h3>
                        <p className="text-gray-600">Live @ SiriusXM</p>
                    </div>
                </div>

            </div>
        </main>
    )
}