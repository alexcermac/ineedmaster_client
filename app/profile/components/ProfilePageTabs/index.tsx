export default function ProfilePageTabs({ activeTab, setActiveTab }) {

    return (
        <div className="w-full border-b-2 border-b-gray-200">
            <div className="mx-auto max-w-6xl mt-12">
                <div className="flex">
                    <p
                        className={`font-semibold ${activeTab === "futureTasks" ? "text-gray-800" : "text-gray-400"} hover:cursor-pointer hover:text-amber-500 mr-6`}
                        onClick={() => setActiveTab("futureTasks")}
                    >Future tasks</p>
                    <p
                        className={`font-semibold ${activeTab === "historyTasks" ? "text-gray-800" : "text-gray-400"}  text-gray-400 hover:cursor-pointer hover:text-amber-500 mr-6`}
                        onClick={() => setActiveTab("historyTasks")}
                    >History of tasks</p>
                </div>
            </div>
        </div>
    )
}
