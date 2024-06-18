import CardAcara from "./acaraCard";







export default async function Acara() {

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
