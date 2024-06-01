export default function Pages() {
    return (
    <div class="flex">
        <aside class="w-64 bg-white h-screen p-4 shadow-md">
        <div class="mb-4">
            <img src="/asset/logo.png" alt="Logo" class="h-10 mx-auto"/>
        </div>
        <nav class="space-y-2">
            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <span class="material-icons">home</span>
            <span class="ml-3">Home</span>
            </a>
            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <span class="material-icons">history</span>
            <span class="ml-3">History</span>
            </a>
            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <span class="material-icons">playlist_play</span>
            <span class="ml-3">Playlists</span>
            </a>
        </nav>
        </aside>
        <main class="flex-1 p-4">
        <div class="flex justify-between items-center mb-4">
            <input type="text" placeholder="Search" class="p-2 border rounded-md flex-1 mr-4"/>
            <button class="p-2 bg-blue-500 text-white rounded-md">Search</button>
        </div>

        <div class="grid grid-cols-3 gap-4">
            <div class="bg-white shadow-md rounded-md overflow-hidden">
            <img src="https://via.placeholder.com/300x150" alt="Image 1" class="w-full"/>
            <div class="p-4">
                <h3 class="font-bold">Heroes, unite for the fantasy realm</h3>
                <p class="text-gray-600">Recruit Elven maidens, mighty Orcs, powerful frost mages, and countless magical heroes.</p>
                <p class="text-sm text-gray-500">Bersponsor - Call of Dragons</p>
            </div>
            </div>

            <div class="bg-white shadow-md rounded-md overflow-hidden">
            <img src="https://via.placeholder.com/300x150" alt="Image 2" class="w-full"/>
            <div class="p-4">
                <h3 class="font-bold">Mix - Sabrina Carpenter - Espresso (Lyrics)</h3>
                <p class="text-gray-600">Ed Sheeran, Sabrina Carpenter, Lay Bankz, dan lainnya</p>
            </div>
            </div>

            <div class="bg-white shadow-md rounded-md overflow-hidden">
            <img src="https://via.placeholder.com/300x150" alt="Image 3" class="w-full"/>
            <div class="p-4">
                <h3 class="font-bold">Mix - Royel Otis - Linger (The Cranberries Cover)</h3>
                <p class="text-gray-600">Live @ SiriusXM</p>
            </div>
            </div>
            
        </div>
        </main>
    </div>
    );
}


