import { useEffect, useState } from "react"

export const UseSocket = () => {

    const [socket,setSocket] = useState<WebSocket | null>(null)
    {
           useEffect(()=>
           {
               const ws = new WebSocket("ws://localhost:8080")
               ws.onopen = () => {
                    setSocket(ws)
                   console.log("Connected")
               }
               ws.onclose = () => {
                setSocket(null)
                   console.log("Disconnected")
               }

               return () => {
                   ws.close()
               }
           },[])
    }
    return socket;
}