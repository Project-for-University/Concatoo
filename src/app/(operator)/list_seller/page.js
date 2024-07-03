import ListSeller from "./seller_tabel";
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
export default async function Table_seller(params) {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
    return (
        <ListSeller />
    )
}