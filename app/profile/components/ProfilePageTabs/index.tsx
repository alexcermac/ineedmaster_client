import { useUserStore } from "@/stores/userStore"

export default function ProfilePageTabs({ activeTab, setActiveTab }) {
    const [user] = useUserStore(state => [state.user])

    return (
        <div className="w-full border-b-2 border-b-gray-200">
            <div className="mx-auto max-w-6xl mt-12">
                <div className="flex">
                    <p
                        className={`font-semibold hover:cursor-pointer hover:text-amber-500 mr-6 py-2 px-4 rounded-t-lg ${activeTab === "futureTasks" ? "text-gray-800 bg-gray-200 hover:text-inherit hover:cursor-auto" : "text-gray-400"}`}
                        onClick={() => setActiveTab("futureTasks")}
                    >Future tasks</p>
                    <p
                        className={`font-semibold text-gray-400 hover:cursor-pointer hover:text-amber-500 mr-6 py-2 px-4 rounded-t-lg ${activeTab === "historyTasks" ? "text-gray-800 bg-gray-200 hover:text-inherit hover:cursor-auto" : "text-gray-400"}`}
                        onClick={() => setActiveTab("historyTasks")}
                    >Tasks history</p>
                    {user?.role === "ROLE_MASTER" && <p
                            className={`font-semibold text-gray-400 hover:cursor-pointer hover:text-amber-500 mr-6 py-2 px-4 rounded-t-lg ${activeTab === "services" ? "text-gray-800 bg-gray-200 hover:text-inherit hover:cursor-auto" : "text-gray-400"}`}
                            onClick={() => setActiveTab("services")}
                        >
                            Your services
                        </p>}
                </div>
            </div>
        </div>
    )
}
