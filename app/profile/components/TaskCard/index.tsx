import { Task } from '@/app/common/types'
import MainButton from '@/components/MainButton'

export default function TaskCard({ task }: { task: Task }) {
    const handleCancelTask = () => {
        console.log("Cancel task")
    }

    return (
        <div
            key={task.id}
            className="border-2 rounded-xl py-2 px-4 flex flex-col justify-between hover:bg-gray-100 hover:shadow-md transition duration-250 ease-in-out"
        >
            <div>
                <div className="flex justify-center mb-6">
                    <div className="mr-4 pr-4 border-r-2">
                        <p className="font-medium">Date:</p>
                        <p>{task.date}</p>
                    </div>
                    <div>
                        <p className="font-medium">Time:</p>
                        <p>{task.time}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="font-semibold text-md">Detalii serviciu:</p>
                    <p className="font-medium text-sm">{task.solutionTitle}</p>
                    <p className="text-sm">{task.solutionDescription}</p>
                    <p className="text-sm">{task.masterFirstName}</p>
                </div>

                <p className="font-semibold text-sm text-gray-400 hover:cursor-pointer hover:underline">{task.categoryName}</p>
                <p className="font-semibold text-sm text-gray-400 hover:cursor-pointer hover:underline">{task.subcategoryName}</p>
                <p>{task.solutionType === "PRICE" ? "Price: " + task.solutionPrice + " euros" : "Verification"}</p>
            </div>

            <div className="flex justify-center mt-6">
                <MainButton text="Cancel task" handleOnClick={handleCancelTask} />
            </div>
        </div>
    )
}
