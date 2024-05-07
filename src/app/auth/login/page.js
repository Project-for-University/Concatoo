function Login() {
    return (
        <div className="max-w-lg h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <p className="text-rose-600"><a>Daftar</a></p>
                    </div>


                    <form id="" className="max-w-md mx-auto" action="/login">

                        <div className="relative z-0 w-full mb-5 group">
                            <label for="email" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Phone Number</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label for="confirm_password" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                        </div>
                        <button type="submit" className="w-full text-white bg-gradient-to-r from-rose-300 to-rose-600 hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-blue-800">Masuk</button>
                        <p className="pt-2 text-rose-600 text-center text-sm"><a>Forgot Password</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login