import CardDetailAcara from "./cardDetailAcara"

export const dynamic = 'force-dynamic'

export default async function Component({ params }) {
    return (
        <CardDetailAcara param={params} />
    )
}
