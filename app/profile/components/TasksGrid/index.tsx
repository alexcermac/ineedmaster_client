import { Task } from "@/app/common/types"
import { useEffect, useState } from "react"
import TaskCard from "../TaskCard"
import { useUserStore } from "@/stores/userStore"
import Modal from "@/components/Modal"
import TaskCardForMaster from "../TaskCardForMaster"

export default function TasksGrid({ typeOfTasks }) {
    const [user] = useUserStore(state => [state.user])

    const [tasks, setTasks] = useState<Task[]>([])
    const [typeOfTaskByDate, setTypeOfTaskByDate] = useState("")
    const [errorFetchingTasks, setErrorFetchingTasks] = useState("")

    useEffect(() => {
        if(user) {
            if(typeOfTasks === "futureTasks") {
                fetchFutureTasks()
            } else {
                fetchHistoryTasks()
            }
        }
    }, [user, typeOfTasks])

    const todayDate = new Date()
    const todayDateForQueryParameter = `date=${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`
    const role = user?.role.split("_")[1].toLowerCase()

    // TODO: create a single function for fetching tasks with many params
    const fetchFutureTasks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/tasks/${role}/${user.id}/future?${todayDateForQueryParameter}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (!response.ok) {
            setErrorFetchingTasks("Error fetching tasks.")
        } else {
            const data = await response.json()
            setTypeOfTaskByDate("future")
            setTasks(data)
        }
    }

    const fetchHistoryTasks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/tasks/${role}/${user.id}/old?${todayDateForQueryParameter}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (!response.ok) {
            setErrorFetchingTasks("Error fetching tasks.")
        } else {
            const data = await response.json()
            setTypeOfTaskByDate("history")
            setTasks(data)
        }
    }

    const displayTasks = () => {
        if(tasks.length === 0) {
            return (
                <div>
                    <p>No tasks found.</p>
                </div>
            )
        }

        if(user?.role === "ROLE_CUSTOMER") {
            return tasks.map((task, index) => {
                return <TaskCard task={task} typeOfTaskByDate={typeOfTaskByDate} key={index} />
            })
        } else if (user?.role === "ROLE_MASTER") {
            return tasks.map((task, index) => {
                return <TaskCardForMaster task={task} typeOfTaskByDate={typeOfTaskByDate} key={index} />
            })
        }
    }

    return (
        <div>
            {errorFetchingTasks && <Modal message={errorFetchingTasks} handleModalClose={() => setErrorFetchingTasks("")} />}
            <div className="w-full">
                <div className="mx-auto max-w-6xl mt-8 grid grid-cols-3 gap-16">
                    {displayTasks()}
                </div>
            </div>
        </div>
    )
}
