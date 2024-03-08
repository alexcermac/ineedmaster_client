import { useUserStore } from "@/stores/userStore"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [user, userLoading] = useUserStore((state: any) => [state.user, state.userLoading])

    if(userLoading)
        return <div>Loading...</div>

    if(!user) {
        router.push("/login")
    }

    return <>{children}</>
}
