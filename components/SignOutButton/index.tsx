import { useUserStore } from "@/stores/userStore"
import { useRouter } from "next/navigation"

export default function SignOutButton() {
    const router = useRouter()
    const [logout] = useUserStore(state => [state.logout])

    const handleSignout = () => {
        logout()
        router.push("/")
    }

    return (
        <div onClick={handleSignout} className="inline-flex items-center justify-center px-4 py-1 text-base font-medium leading-6 text-gray-900 whitespace-no-wrap bg-amber-300 border-2 border-amber-300 rounded-md shadow-sm hover:bg-amber-400 hover:border-amber-400 focus:outline-none hover:cursor-pointer" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
            <p>Sign out</p>
        </div>
    )
}
