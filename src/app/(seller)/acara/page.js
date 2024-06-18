import CardAcara from "./acaraCard";
import { cookies } from 'next/headers'






export default async function Acara() {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  // Fetch acaras
  const acarasResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/seller/acara/read_acara`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const acarasData = await acarasResponse.json();
  console.log(acarasData);

  return <CardAcara data={acarasData} />
}
