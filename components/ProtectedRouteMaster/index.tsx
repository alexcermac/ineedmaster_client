import { useUserStore } from "@/stores/userStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRouteMaster({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [user, userLoading] = useUserStore((state: any) => [state.user, state.userLoading])

    useEffect(() => {
        if(!user) {
            router.push("/login")
        }

        if(user && user?.role !== "ROLE_MASTER") {
            router.push("/")
        }
    }, [])
    
    if(userLoading)
        return <div>Loading...</div>
    
    return <>{children}</>
}
