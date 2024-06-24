import CardDashboard from "./card"
import { cookies } from 'next/headers'


export default async function Page() {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
    const restiket = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seller/dashboard/total_tiket`)
    const total_tiket = await restiket.json()
    const resacara = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seller/dashboard/total_acara`)
    const total_acara = await resacara.json()
    return (
        <CardDashboard total_acara={total_acara} total_tiket={total_tiket} />
    )
}