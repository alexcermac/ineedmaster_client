import { Task } from "@/app/common/types"
import { useEffect, useState } from "react"
import TaskCard from "../TaskCard"

export default function TasksGrid({ typeOfTasks }) {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            solutionTitle: "Task 1",
            solutionDescription: "Description 1",
            solutionType: "PRICE",
            solutionPrice: 100,
            masterFirstName: "Master 1",
            categoryName: "Category 1",
            subcategoryName: "Subcategory 1",
            date: "2022-01-01",
            time: "00:00",
            status: "PENDING",
            address: "strada abc",
        },
        {
            id: 2,
            solutionTitle: "Task 2",
            solutionDescription: "Description 2",
            solutionType: "CHECK",
            solutionPrice: 0,
            masterFirstName: "Master 2",
            categoryName: "Category 2",
            subcategoryName: "Subcategory 2",
            date: "2022-02-02",
            time: "01:01",
            status: "PENDING",
            address: "strada abc",
        }
    ])

    useEffect(() => {
        // TODO: fetch user's future tasks from the backend
        if(typeOfTasks === "futureTasks") {
            // TODO: fetch future tasks from db
        } else {
            // TODO: fetch history tasks from db
        }
    }, [])

    const displayTasks = () => {
        return tasks.map(task => {
            return <TaskCard task={task} />
        })
    }

    return (
        <div className="w-full">
            <div className="mx-auto max-w-6xl mt-8 grid grid-cols-3 gap-16">
                {displayTasks()}
            </div>
        </div>
    )
}
