import { useUserStore } from "@/stores/userStore"
import { useRouter } from "next/navigation"

export default function ProtectedRouteMaster({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [user, userLoading] = useUserStore((state: any) => [state.user, state.userLoading])

    console.log("User role: ", user);
    

    if(userLoading)
        return <div>Loading...</div>

    if(!user) {
        router.push("/login")
    }

    if(user && user?.role === "MASTER") {
        return <>{children}</>
    } else {
        router.push("/")
        return null
    }
}
