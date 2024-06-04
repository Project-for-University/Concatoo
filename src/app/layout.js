'use client'


import "../../public/global.css"
import { SessionProvider } from "next-auth/react"
import 'flowbite';



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
