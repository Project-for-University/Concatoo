'use client'


import "../../public/global.css"
import { SessionProvider } from "next-auth/react"

import { Suspense } from "react";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <SessionProvider >
          <Suspense >
            {children}
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  )
}
