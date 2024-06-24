import CardAcara from "./acaraCard";
import { cookies } from 'next/headers'






export default async function Acara() {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  // Fetch acaras

  return <CardAcara />
}
