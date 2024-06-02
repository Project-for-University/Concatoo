'use client'


import "../../public/global.css"
import { SessionProvider } from "next-auth/react"



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <SessionProvider >
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
