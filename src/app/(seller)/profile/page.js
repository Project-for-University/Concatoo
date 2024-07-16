import FormProfile from "./Formprofile";
export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Concatoo',
    description: 'Jual Beli Tiket Acara',
  }
export default async function Profile(params) {
    return (
        <>
            <FormProfile />
        </>
    )
}