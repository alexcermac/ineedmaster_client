import { Task } from '@/app/common/types'
import { limitTextSize } from '@/app/common/utils'
import MainButtonOutline from '@/components/MainButtonOutline'
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function TaskCard({ task, typeOfTaskByDate }: { task: Task, typeOfTaskByDate: string }) {
    // Convert stored Date string to Date object
    task.date = new Date(task.date);
    const [taskState, setTaskState] = useState<Task>(task)
     
    const handleCancelTask = async () => {
        const response = await fetch(`http://localhost:8080/api/tasks/${task.id}/customer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                status: "CANCELED"
            })
        })

        if(response.ok) {
            setTaskState({...taskState, status: "CANCELED"})
        }
    }

    return (
        <div
            key={taskState.id}
            className="border-2 rounded-xl p-4 flex flex-col justify-between hover:bg-gray-100 hover:shadow-md transition duration-250 ease-in-out"
        >
            <div>
                <div className="flex items-center justify-end mb-6">
                    <p className={`text-center font-semibold py-1 px-2 rounded-lg ${taskState.status === "PENDING" && "text-orange-400 bg-orange-100"} ${taskState.status === "ACCEPTED" && "text-green-400 bg-green-100"} ${(taskState.status === "DENIED" || taskState.status === "CANCELED") && "text-red-400 bg-red-100"}`}>{taskState.status.toLowerCase()}</p>
                </div>
                <div className="flex justify-center mb-6">
                    <div className="mr-4 pr-4 border-r-2 flex flex-col items-center">
                        <p className="font-medium">Date:</p>
                        <p>{taskState.date.getDate()}-{taskState.date.getMonth() + 1}-{taskState.date.getFullYear()}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-medium">Availability time:</p>
                        <p>{taskState.startHour}</p>
                        <p>{taskState.endHour}</p>
                    </div>
                </div>
                <div className="mb-6">
                    <p className="font-semibold text-md">Service details:</p>
                    <Link href={`http://localhost:3000/solution/${taskState.solutionId}`} className="font-medium text-sm hover:underline">{taskState.solutionTitle}</Link>
                    <p className="text-sm">{taskState.solutionDescription && limitTextSize(taskState.solutionDescription, 80)}</p>
                </div>
                <div>
                    {/* TODO: change <p> to a Link that redirects to Master's profile */}
                    <p className="text-sm">Master: {taskState.masterFirstName}</p>
                    <p className="text-sm">Category: <span className="font-semibold text-gray-500">{taskState.solutionCategoryName}</span></p>
                    <p className="text-sm">Subcategory: <span className="font-semibold text-gray-500">{taskState.solutionSubcategoryName}</span></p>
                    <p className="text-sm">Type: <span className="font-semibold text-gray-500">{taskState.solutionType === "PRICE" ? "Price: " + taskState.solutionPrice + " euros" : "Verification"}</span></p>
                </div>
            </div>

            {typeOfTaskByDate === "future" && (taskState.status !== "DENIED" && taskState.status !== "CANCELED") &&<div className="flex justify-center mt-6">
                <MainButtonOutline text="Cancel task" handleOnClick={handleCancelTask} />
            </div>}
        </div>
    )
}
