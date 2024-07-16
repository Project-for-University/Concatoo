import CardDetailAcara from "./cardDetailAcara"

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Concatoo',
    description: 'Jual Beli Tiket Acara',
  }
export default async function Component({ params }) {
    return (
        <CardDetailAcara param={params} />
    )
}
