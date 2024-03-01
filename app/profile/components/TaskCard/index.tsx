import { Task } from '@/app/common/types'
import MainButton from '@/components/MainButton'

export default function TaskCard({ task, typeOfTaskByDate }: { task: Task, typeOfTaskByDate: string }) {
    // Convert stored Date string to Date object
    task.date = new Date(task.date);
     
    const handleCancelTask = () => {
        console.log("Cancel task")
    }

    return (
        <div
            key={task.id}
            className="border-2 rounded-xl p-4 flex flex-col justify-between hover:bg-gray-100 hover:shadow-md transition duration-250 ease-in-out"
        >
            <div>
                <div className="flex items-center justify-end mb-6">
                    <p className={`text-center font-semibold py-1 px-2 rounded-lg ${task.status === "PENDING" && "text-orange-400 bg-orange-100"} ${task.status === "ACCEPTED" && "text-green-400 bg-green-100"}`}>{task.status.toLowerCase()}</p>
                </div>
                <div className="flex justify-center mb-6">
                    <div className="mr-4 pr-4 border-r-2 flex flex-col items-center">
                        <p className="font-medium">Date:</p>
                        <p>{task.date.getDate()}-{task.date.getMonth() + 1}-{task.date.getFullYear()}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-medium">Availability time:</p>
                        <p>{task.startHour}</p>
                        <p>{task.endHour}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="font-semibold text-md">Service details:</p>
                    <p className="font-medium text-sm">{task.solutionTitle}</p>
                    <p className="text-sm">{task.solutionDescription}</p>
                    <p className="text-sm">{task.masterFirstName}</p>
                </div>

                <p className="text-sm"> Category: <span className="font-semibold text-gray-500">{task.solutionCategoryName}</span></p>
                <p className="text-sm"> Subcategory: <span className="font-semibold text-gray-500">{task.solutionSubcategoryName}</span></p>
                <p className="text-sm">Type: <span className="font-semibold text-gray-500">{task.solutionType === "PRICE" ? "Price: " + task.solutionPrice + " euros" : "Verification"}</span></p>
            </div>

            {typeOfTaskByDate === "future" && <div className="flex justify-center mt-6">
                <MainButton text="Cancel task" handleOnClick={handleCancelTask} />
            </div>}
        </div>
    )
}
