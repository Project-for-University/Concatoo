import Image from "next/image";

export default function Page() {
    return (
        <>


            <div className="bg-gray-50 antialiased dark:bg-gray-900">
                <main className="h-auto p-4 pt-20 md:ml-64">
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {/* <!-- detail acara --> */}
                        <div className="sm: rounded-lg border-2 border-dashed border-gray-300 md:h-72 lg:col-span-2 dark:border-gray-600">

                            <div className="rounded-lg md:relative lg:relative border border-gray-200 bg-white p-4 shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800">
                                <Image height={100} width={100} className="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                <h1>Deskripsi</h1>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quo nulla voluptatibus qui doloremque distinctio modi saepe placeat, dolorum odit.</p>
                            </div>

                        </div>
                        {/* <!-- akhir detail acara --> */}
                        <div className="rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600">
                            {/* <!-- order --> */}
                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-800">
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                                            </dl>
                                        </div>

                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                            <dd className="text-base font-bold text-gray-900 dark:text-white">$8,191.00</dd>
                                        </dl>
                                    </div>
                                </div>
                                {/* <!-- tiket --> */}
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-800">
                                    <p className="text-white">Tiket</p>
                                </div>
                                {/* <!-- akhir tiket --> */}
                            </div>
                            {/* <!-- order --> */}
                        </div>
                    </div>
                </main>
            </div>




        </>
    )
}