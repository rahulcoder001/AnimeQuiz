"use client"
import { SessionProvider } from "next-auth/react"

export function Provders({children}:{
    children:React.ReactNode,
}){
    return <SessionProvider>
        {children}
    </SessionProvider>
}