import { cookies } from 'next/headers'

export default function Page() {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
    return '...'
}