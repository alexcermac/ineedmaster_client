"use client"
import { Solution } from '@/app/common/types'
import MainButton from '@/components/MainButton'
import MainButtonOutline from '@/components/MainButtonOutline'
import Modal from '@/components/Modal'
import NotFound from '@/components/NotFound'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

export default function SolutionById({ params: { id } }) {
    const router = useRouter()
    const [user] = useUserStore(state => [state.user])

    const [solution, setSolution] = useState<Solution | null>(null)
    const [dataFetchError, setDataFetchError] = useState("")
    const [dateOfTask, setDateOfTask] = useState(new Date())
    const [startHour, setStartHour] = useState(new Date())
    const [endHour, setEndHour] = useState(new Date())
    const [address, setAddress] = useState("")

    const [submitLoading, setSubmitLoading] = useState(false)
    const [errorDateBookingMessage, setErrorDateBookingMessage] = useState("")

    useEffect(() => {
        fetchSolution()
    }, [])

    const fetchSolution = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/solutions/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            const data = await response.json()
            setDataFetchError(data.message)
        } else {
            const data = await response.json()
            setSolution(data)
        }
    }

    const handleSubmitButton = async () => {
        const startHourAsDate = new Date(`01-01-1970 ${solution?.startHour}`)
        const endHourAsDate = new Date(`01-01-1970 ${solution?.endHour}`)

        if(!user) {
            setErrorDateBookingMessage("You must be logged in to book a task.")
            return
        }

        if (!address) {
            setErrorDateBookingMessage("Please complete the address field.")
            return 
        }

        const date = new Date()
        const yesterday = new Date(date.setDate(date.getDate() - 1))

        if (dateOfTask < yesterday) {
            setErrorDateBookingMessage("Invalid date. Please choose a valid date.")
            return
        }

        if(startHour.getHours() > endHour.getHours()
            || (startHour.getHours() === endHour.getHours() && startHour.getMinutes() === endHour.getMinutes())
            || (startHour.getHours() === endHour.getHours() && startHour.getMinutes() > endHour.getMinutes())
            || (startHour.getHours() < startHourAsDate.getHours())
            || (startHour.getHours() === startHourAsDate.getHours() && startHour.getMinutes() < startHourAsDate.getMinutes())
            || (startHour.getHours() > endHourAsDate.getHours())
            || (startHour.getHours() === endHourAsDate.getHours() && startHour.getMinutes() > endHourAsDate.getMinutes())
            || (endHour.getHours() > endHourAsDate.getHours())
            || (endHour.getHours() === endHourAsDate.getHours() && endHour.getMinutes() > endHourAsDate.getMinutes())
        ) {
            setErrorDateBookingMessage("Invalid booking hours. Please choose a valid interval.")
            return
        }

        setSubmitLoading(true)

        const newTask = {
            customerId: user.id,
            masterId: solution?.userId,
            solutionId: solution?.id,
            date: dateOfTask,
            startHour: startHour.getHours() + ":" + (startHour.getMinutes() === 0 ? "00" : startHour.getMinutes()), // If minutes are 0, add 00 to the end of the string
            endHour: endHour.getHours() + ":" + (endHour.getMinutes() === 0 ? "00" : endHour.getMinutes()),
            status: "PENDING",
            address: address
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(newTask),
        })
        
        if (!response.ok) {
            const data = await response.json()
            setDataFetchError(data.message)
        } else {
            const data = await response.json()
            router.push(`/profile`)
        }

        setSubmitLoading(false)
    }

    if(dataFetchError) {
        return <NotFound message={dataFetchError} />
    }

    if(!solution) {
        return (
            <div className="mx-auto max-w-6xl mt-8">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            {errorDateBookingMessage && <Modal message={errorDateBookingMessage} handleModalClose={() => setErrorDateBookingMessage("")} />}
            <div className="mx-auto max-w-6xl flex justify-between mt-12">
                <div className="mr-32">
                    <div className="mb-8">
                        <p className="font-bold text-2xl pb-2 mb-2 border-b-2 border-gray-200">{solution?.title}</p>
                        <p>{solution?.description}</p>
                    </div>
                    <div className="mb-8">
                        <p className="font-medium">Availability:</p>
                        <p>Start hour: {solution?.startHour}</p>
                        <p>End hour: {solution?.endHour}</p>
                    </div>

                    <div>
                        <p>County: {solution?.countyName}</p>
                        <p>City: {solution?.cityName}</p>
                        <p className="mb-2">Who provides this service?</p>
                        <MainButtonOutline text={"Profile of " + solution?.userFirstName} linkTo={`/profile/public/master/${solution?.userId}`} />
                    </div>
                </div>
                {/* <div className={`border-2 border-gray-300 px-10 py-8 rounded-2xl ${user.role === "ROLE_MASTER" ? "pointer-events-none bg-gray-300" : ""}`}> */}
                <div className={`border-2 border-gray-300 px-10 py-8 rounded-2xl ${user.role === "ROLE_MASTER" ? "pointer-events-none relative" : ""}`}>
                    {user.role === "ROLE_MASTER" && <div className="absolute top-0 bottom-0 left-0 right-0 z-50 rounded-2xl bg-gray-700 opacity-50"></div>}
                    <div className="flex flex-col mb-4">
                        <label className="font-medium text-sm" htmlFor="address">Enter address</label>
                        <input
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            className="border-2 rounded-xl py-1 px-4 hover:bg-gray-50 hover:shadow-sm transition duration-150 ease-in-out"
                        />
                    </div>
                    <div className="mb-4">
                        <p className="font-medium text-sm">Choose date</p>
                        <DatePicker
                            className="border-2 rounded-xl py-1 px-4 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                            selected={dateOfTask}
                            onChange={(date) => setDateOfTask(date)}
                        />
                    </div>
                    <p className="font-medium text-sm">Choose your availability time</p>
                    <div className="mb-4">
                        <p className="font-medium text-sm">Start hour</p>
                        <DatePicker
                            className="border-2 rounded-xl py-1 px-4 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                            selected={startHour}
                            onChange={(date) => setStartHour(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </div>
                    <div className="mb-10">
                        <p className="font-medium text-sm">End hour</p>
                        <DatePicker
                            className="border-2 rounded-xl py-1 px-4 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                            selected={endHour}
                            onChange={(date) => setEndHour(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </div>
                    <div className="flex justify-center">
                        <MainButton text="Book" handleOnClick={handleSubmitButton} submitLoading={submitLoading} />
                    </div>
                </div>
            </div>
        </div>
    )
}