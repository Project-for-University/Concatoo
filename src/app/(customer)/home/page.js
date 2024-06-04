import Navbar from "../navbar/navbar"

export default function Pages() {
    return(
      <main class="flex-1 p-4">
      <Navbar/>
      <div class="grid grid-cols-3 gap-4 p-8">
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
    )
}