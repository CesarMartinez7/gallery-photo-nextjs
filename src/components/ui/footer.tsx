"use client"
import { useEffect, useState } from "react"

export default function Footer (){
    const [date,setDate] = useState<string | null | number>(null)
    useEffect(() => {
        setDate(new Date().getFullYear())
    },[])

    return(
        <footer className="flex justify-center bg-gradient-to-t mt-10 from-zinc-900 to-transparent py-6 text-zinc-400">
            <p>Desarrollado por <strong className="font-semibold">@Cesar Martinez</strong> {date}</p>
        </footer>
    )
}