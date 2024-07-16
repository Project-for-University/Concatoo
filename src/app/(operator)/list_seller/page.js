import ListSeller from "./seller_tabel";

export const metadata = {
    title: 'Concatoo',
    description: 'Jual Beli Tiket Acara',
  }
export const dynamic = 'force-dynamic'
export default async function Table_seller(params) {

    return (
        <ListSeller />
    )
}