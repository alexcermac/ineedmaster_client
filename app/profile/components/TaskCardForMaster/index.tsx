import { Task } from '@/app/common/types'
import ButtonErrorOutline from '@/components/ButtonErrorOutline';
import ButtonSuccess from '@/components/ButtonSuccess';
import MainButtonOutline from '@/components/MainButtonOutline';
import { useState } from 'react';

export default function TaskCardForMaster({ task, typeOfTaskByDate }: { task: Task, typeOfTaskByDate: string }) {
    // Convert stored Date string to Date object
    task.date = new Date(task.date);
    const [taskState, setTaskState] = useState<Task>(task)
     
    const handleAcceptTask = async () => {
        const response = await fetch(`http://localhost:8080/api/tasks/${task.id}/master`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                status: "ACCEPTED"
            })
        })

        if(response.ok) {
            setTaskState({...taskState, status: "ACCEPTED"})
        }
    }

    const handleDenyTask = async () => {
        const response = await fetch(`http://localhost:8080/api/tasks/${task.id}/master`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                status: "DENIED"
            })
        })

        if(response.ok) {
            setTaskState({...taskState, status: "DENIED"})
        }
    }

    const handleCancelTask = async () => {
        const response = await fetch(`http://localhost:8080/api/tasks/${task.id}/master`, {
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
            <div className="flex items-center justify-end mb-6">
                <p className={`text-center font-semibold py-1 px-2 rounded-lg ${taskState.status === "PENDING" && "text-orange-400 bg-orange-100"} ${taskState.status === "ACCEPTED" && "text-green-400 bg-green-100"} ${(taskState.status === "DENIED" || taskState.status === "CANCELED") && "text-red-400 bg-red-100"}`}>{taskState.status.toLowerCase()}</p>
            </div>
            <div>
                <div className="flex justify-center mb-6">
                    <div className="mr-4 pr-4 border-r-2 flex flex-col items-center">
                        <p className="font-medium">Datee:</p>
                        <p>{taskState.date.getDate()}-{taskState.date.getMonth() + 1}-{taskState.date.getFullYear()}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-medium">Availability time:</p>
                        <p>{taskState.startHour}</p>
                        <p>{taskState.endHour}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="font-semibold text-md">Detalii serviciu:</p>
                    <p className="font-medium text-sm">{taskState.solutionTitle}</p>
                    <p className="text-sm">{taskState.solutionDescription}</p>
                    <p className="text-sm">{taskState.masterFirstName}</p>
                </div>

                <p className="font-semibold text-sm text-gray-400 hover:cursor-pointer hover:underline">{taskState.categoryName}</p>
                <p className="font-semibold text-sm text-gray-400 hover:cursor-pointer hover:underline">{taskState.subcategoryName}</p>
                <p>{taskState.solutionType === "PRICE" ? "Price: " + taskState.solutionPrice + " euros" : "Verification"}</p>
            </div>

            {typeOfTaskByDate === "future" && (taskState.status === "PENDING")
                ? <div className="flex justify-between mt-6">
                    <ButtonSuccess text="Accept task" handleOnClick={handleAcceptTask} />
                    <ButtonErrorOutline text="Deny task" handleOnClick={handleDenyTask} />
                </div>
                : (taskState.status !== "CANCELED" && taskState.status !== "DENIED") && <div className="flex justify-center mt-6">
                    <MainButtonOutline text="Cancel task" handleOnClick={handleCancelTask} />
                </div>}
        </div>
    )
}
