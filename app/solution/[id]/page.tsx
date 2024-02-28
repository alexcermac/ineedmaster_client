"use client"
import { Solution } from '@/app/common/types'
import MainButton from '@/components/MainButton'
import NotFound from '@/components/NotFound'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

export default function SolutionById({ params: { id } }) {
    const [solution, setSolution] = useState<Solution | null>(null)
    const [dataFetchError, setDataFetchError] = useState("")
    const [dateOfTask, setDateOfTask] = useState(new Date())
    const [startHour, setStartHour] = useState(new Date())
    const [endHour, setEndHour] = useState(new Date())

    useEffect(() => {
        getSolution()
    }, [])

    const getSolution = async () => {
        const response = await fetch(`http://localhost:8080/api/solutions/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            const data = await response.json()
            console.log("data error: ", data)
            setDataFetchError(data.message)
        } else {
            const data = await response.json()
            setSolution(data)
        }
    }

    const handleSubmitButton = async () => {
        console.log("SUBMIT");
        
        // const response = await fetch(`http://localhost:8080/api/solutions`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         dateOfTask: dateOfTask,
        //         startHour: startHour,
        //         endHour: endHour,
        //     }),
        // })
        
        // if (!response.ok) {
        //     const data = await response.json()
        //     console.log("data error: ", data)
        //     setDataFetchError(data.message)
        // } else {
        //     const data = await response.json()
        //     setSolution(data)
        // }
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
        <div className="mx-auto max-w-6xl flex justify-between mt-12">
            <div>
                <p className="font-bold text-2xl pb-2 mb-4 border-b-2 border-gray-200">{solution?.title}</p>
                <p>{solution?.description}</p>
                <p>{solution?.countyName}</p>
                <p>{solution?.cityName}</p>
                <p>Availability</p>
                <p>Start hour: {solution?.startHour}</p>
                <p>End hour: {solution?.endHour}</p>
            </div>
            {/* <div className="bg-gray-100 px-10 py-12 rounded-lg"> */}
            <div className="border-2 border-gray-300 px-10 py-8 rounded-2xl">
                <div className="mb-4">
                    <p className="font-medium text-sm">Choose date</p>
                    <DatePicker
                        className="border-2 rounded-xl py-1 px-4 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                        selected={dateOfTask}
                        onChange={(date) => setDateOfTask(date)}
                    />
                </div>
                <div className="mb-4">
                    <p className="font-medium text-sm">Choose start hour</p>
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
                    <p className="font-medium text-sm">Choose end hour</p>
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
                    <MainButton text="Book" handleOnClick={handleSubmitButton} />
                </div>
            </div>
        </div>
    )
}