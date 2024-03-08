import { useUserStore } from "@/stores/userStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRouteMaster({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [user, userLoading] = useUserStore((state: any) => [state.user, state.userLoading])

    useEffect(() => {
        if(!user) {
            router.push("/login")
            // return null
        }

        if(user && user?.role !== "MASTER") {
            router.push("/")
        }
    }, [])
    
    if(userLoading)
        return <div>Loading...</div>
    

    // if(user && user?.role === "MASTER") {
        return <>{children}</>
    // }
    // if(user && user?.role === "MASTER") {
    //     return <>{children}</>
    // } else {
    //     router.push("/")
    //     return null
    // }
}
