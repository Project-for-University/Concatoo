'use client'


import "../../public/global.css"
// import { SessionProvider } from "next-auth/react"
import 'flowbite';
import { Suspense } from "react";
import Loading from "./loading";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-orange-50">
        {/* <SessionProvider > */}
        {/* <Suspense fallback={<Loading />}> */}
        {children}
        {/* </Suspense> */}
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
