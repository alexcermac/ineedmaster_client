import { Task } from '@/app/common/types'
import ButtonErrorOutline from '@/components/ButtonErrorOutline';
import ButtonSuccess from '@/components/ButtonSuccess';

export default function TaskCardForMaster({ task, typeOfTaskByDate }: { task: Task, typeOfTaskByDate: string }) {
    // Convert stored Date string to Date object
    task.date = new Date(task.date);
     
    const handleAcceptTask = () => {
        console.log("Task accepted")
    }

    const handleCancelTask = () => {
        console.log("Cancel task")
    }

    return (
        <div
            key={task.id}
            className="border-2 rounded-xl p-4 flex flex-col justify-between hover:bg-gray-100 hover:shadow-md transition duration-250 ease-in-out"
        >
            <div>
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
                    <p className="font-semibold text-md">Detalii serviciu:</p>
                    <p className="font-medium text-sm">{task.solutionTitle}</p>
                    <p className="text-sm">{task.solutionDescription}</p>
                    <p className="text-sm">{task.masterFirstName}</p>
                </div>

                <p className="font-semibold text-sm text-gray-400 hover:cursor-pointer hover:underline">{task.categoryName}</p>
                <p className="font-semibold text-sm text-gray-400 hover:cursor-pointer hover:underline">{task.subcategoryName}</p>
                <p>{task.solutionType === "PRICE" ? "Price: " + task.solutionPrice + " euros" : "Verification"}</p>
            </div>

            {typeOfTaskByDate === "future" && <div className="flex justify-between mt-6">
                <ButtonSuccess text="Accept task" handleOnClick={handleAcceptTask} />
                <ButtonErrorOutline text="Cancel task" handleOnClick={handleCancelTask} />
            </div>}
        </div>
    )
}
