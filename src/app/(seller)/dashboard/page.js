'use client'


import Navbar from "./component/navbar"
import Sidebar from "./component/sidebar"

export default function Pages() {
    // const { data: session, status } = useSession()
    // console.log(status);
    // console.log(session);

    // const router = useRouter()

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push('/auth/login')
    //     }
    // }, [router, status]);
    return (
        <>
            <div>
                <Navbar />
                <div className="flex">
                    <Sidebar />
                    <div className="flex flex-cols-3 w-full mx-4 my-6">
                        <div className="mx-2">
                            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Acara</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            </a>
                        </div>
                        <div className="mx-2">
                            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Tiket</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            </a>
                        </div>
                        <div className="mx-2">
                            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="">dashboard</h1>
            {/* {status === 'authenticated' ? (
                <button onClick={() => signOut()} className="p-2 text-black ml-auto">Sign out</button>
            ) : (
                <div className="flex space-x-4 ml-auto">
                    <button className="rounded-lg hover:" onClick={() => signIn()}>Sign in</button>
                    <Link href="/auth/register">Register</Link>
                </div>
            )} */}
        </>
    )
}