import { Task } from '@/app/common/types'
import ButtonErrorOutline from '@/components/ButtonErrorOutline';
import ButtonSuccess from '@/components/ButtonSuccess';
import MainButtonOutline from '@/components/MainButtonOutline';
import Link from 'next/link';
import { useState } from 'react';

export default function TaskCardForMaster({ task, typeOfTaskByDate }: { task: Task, typeOfTaskByDate: string }) {
    // Convert stored Date string to Date object
    task.date = new Date(task.date);
    const [taskState, setTaskState] = useState<Task>(task)
     
    const handleAcceptTask = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/tasks/${task.id}/master`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/tasks/${task.id}/master`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/tasks/${task.id}/master`, {
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
                {/* <p>{</p> */}
                <p className={`text-center font-semibold py-1 px-2 rounded-lg ${taskState.status === "PENDING" && "text-orange-400 bg-orange-100"} ${taskState.status === "ACCEPTED" && "text-green-400 bg-green-100"} ${(taskState.status === "DENIED" || taskState.status === "CANCELED") && "text-red-400 bg-red-100"}`}>{taskState.status.toLowerCase()}</p>
            </div>
            <div>
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
                    <p className="font-semibold text-md">Booked service:</p>
                    {/* <p className="font-medium text-sm">{taskState.solutionTitle}</p> */}
                    <Link href={`http://localhost:3000/solution/${taskState.solutionId}`} className="font-medium text-sm hover:underline">{taskState.solutionTitle}</Link>
                    {/* <p className="text-sm">{taskState.solutionDescription}</p> */}
                </div>
                <div className="mt-4 mb-4">
                    <p className="text-sm">Address: {taskState.address}</p>
                    <p className="font-semibold text-sm text-gray-400 hover:cursor-pointer hover:underline">{taskState.solutionCategoryName}</p>
                    <p className="font-semibold text-sm text-gray-400 hover:cursor-pointer hover:underline">{taskState.solutionSubcategoryName}</p>
                    <p>{taskState.solutionType === "PRICE" ? "Price: " + taskState.solutionPrice + " euros" : "Verification"}</p>
                </div>
                
                <div>
                    <p className="text-sm">Created by <span className="font-semibold">{taskState.customerFirstName} {taskState.customerLastName}</span></p>
                    <p className="text-sm">Phone number: <span className="font-semibold">{taskState.customerPhoneNumber}</span></p>
                </div>
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
