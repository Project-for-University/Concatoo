
import CardDashboard from "./card"
import { cookies } from 'next/headers'


export default async function Page() {

    const cookieStore = cookies()
    const theme = cookieStore.get('theme')

    return (
        <CardDashboard />
    )
}