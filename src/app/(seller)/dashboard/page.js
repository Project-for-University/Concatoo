
import CardDashboard from "./card"

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Concatoo',
    description: 'Jual Beli Tiket Acara',
  }
export default async function Page() {
    return (
        <CardDashboard />
    )
}