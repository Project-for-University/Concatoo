
import { cookies } from 'next/headers'
import CardAcaraHasilSearch from './card_hasil_search';
import Navbar from '../navbar/navbar';


export default async function Search_acara() {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
    return (
        <main className="flex-1 ">

            <Navbar />
            <CardAcaraHasilSearch />

        </main>
    )
}






