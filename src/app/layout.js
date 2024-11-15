'use client'


import "../../public/global.css"
import { SessionProvider } from "next-auth/react"

import { Suspense } from "react";
import Script from 'next/script'
// import "../../public/custom_flowbite.css"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" /> */}
        <link rel="icon" href="/asset/logo.png" sizes="any" />
        <SessionProvider >
          <Suspense >
            {children}
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
          </Suspense>
        </SessionProvider>


      </body>
    </html>
  )
}
