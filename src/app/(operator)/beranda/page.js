import Beranda from "./cardBeranda";
import { cookies } from 'next/headers'

export const metadata = {
    title: 'Concatoo',
    description: 'Jual Beli Tiket Acara',
  }
export default async function page(params) {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
    const resacara = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/operator/beranda/total_acara`)
    const total_acara = await resacara.json()
    const resseller = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/operator/beranda/total_seller`)
    const total_seller = await resseller.json()
    return (
        <Beranda total_seller={total_seller} total_acara={total_acara} />
    )
};
