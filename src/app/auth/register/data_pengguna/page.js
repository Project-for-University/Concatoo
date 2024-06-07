'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';




export default function Pages(params) {
    return (
        <>
            <div >
                <h1>ini table pengguna</h1>
                <TabelPengguna />
            </div>
        </>
    )
}

function TabelPengguna() {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);


    useEffect(() => {

        async function fetchData() {
            const response = await fetch('/auth/register/data_pengguna/readPenagguna', {
                method: 'GET',

            });
            const users = await response.json();
            setData(users);
        }
        fetchData();
    }, []);

    async function DeletePengguna(id) {

        console.log(id);
        const response = await fetch(`/auth/register/data_pengguna/delete/${id}  `, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('berhasil hapus')
            // Redirect ke halaman /auth/register
            // window.location.reload()
            const response = await fetch('/auth/register/data_pengguna/readPenagguna', {
                method: 'GET',

            });
            const users = await response.json();
            setData(users);
            setMessage('berhasil hapus data')
        } else {
            // Tangani jika penghapusan gagal
            console.error('Gagal menghapus pengguna:');

        }



    }

    return (
        <>
            {message && <p>{message}</p>}
            <table className='border-collapse border border-slate-500'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 p-2'>Id</th>
                        <th className='border border-slate-600 p-2'>username</th>
                        <th className='border border-slate-600 p-2'>phone number</th>
                        <th className='border border-slate-600 p-2'>email</th>
                        <th className='border border-slate-600 p-2'>role</th>
                        <th className='border border-slate-600 p-2'>aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id_user}>
                            <td className='border border-slate-600 p-2'>{user.id_user}</td>
                            <td className='border border-slate-600 p-2'>{user.username}</td>
                            <td className='border border-slate-600 p-2'>{user.phonenumber}</td>
                            <td className='border border-slate-600 p-2'>{user.email}</td>
                            <td className='border border-slate-600 p-2'>{user.role}</td>
                            <td className='border border-slate-600 p-2'>
                                <div className='flex gap-4'>
                                    <button onClick={() => DeletePengguna(user.id_user)}>hapus</button>
                                    <Link href={`/auth/register/data_pengguna/update/${user.id_user}`}>Update</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
