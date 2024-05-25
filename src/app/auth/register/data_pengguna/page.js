import { PrismaClient } from '@prisma/client'
import Link from 'next/link';
const prisma = new PrismaClient()

export default function Pages(params) {
    return (
        <>
            <h1>ini table pengguna</h1>
            <TabelPengguna />
        </>
    )
}

async function TabelPengguna() {
    const data = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            phonenumber: true,
            email: true,
            password: true,
            role: true
        },
        orderBy: { username: 'asc' }
    })
    console.log(data);
    if (data.length === 0) {
        return (
            <>
                <p>tidak ada data</p>
            </>
        )
    }

    return (
        <>
            <table className='text-white border-collapse border border-slate-500'>
                <thead>
                    <tr key="">
                        <th className='border border-slate-600 p-2'>Id</th>
                        <th className='border border-slate-600 p-2'>username</th>
                        <th className='border border-slate-600 p-2'>phone number</th>
                        <th className='border border-slate-600 p-2'>email</th>
                        <th className='border border-slate-600 p-2'>role</th>
                        <th className='border border-slate-600 p-2'>aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => {
                        return (

                            <tr key={user.id}>
                                <td className='border border-slate-600 p-2'>{user.id}</td>
                                <td className='border border-slate-600 p-2'>{user.username}</td>
                                <td className='border border-slate-600 p-2'>{user.phonenumber}</td>
                                <td className='border border-slate-600 p-2'>{user.email}</td>

                                <td className='border border-slate-600 p-2'>{user.role}</td>
                                <td className='border border-slate-600 p-2'>
                                    <div className='flex gap-4'>
                                        <Link href={`/auth/register/data_pengguna/delete/${user.id}`}>Delete</Link>
                                        <Link href={`/auth/register/data_pengguna/update/${user.id}`}>Update</Link>
                                    </div>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </>
    )
}