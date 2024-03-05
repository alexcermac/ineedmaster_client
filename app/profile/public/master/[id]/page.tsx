"use client"
import { useEffect, useState } from "react"
import { UserMaster } from '@/app/common/types'
import { UserIcon } from '@heroicons/react/24/outline'
import SignOutButton from "@/components/SignOutButton"
import SolutionCard from "@/components/SolutionCard"

export default function ProfilePublicMaster({ params: { id } }) {
    const [masterInformation, setMasterInformation] = useState<UserMaster | null>(null)
    const [dataFetchError, setDataFetchError] = useState("")
    
    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/users/master/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            const data = await response.json()
            console.log("Data error: ", data);
            
            setDataFetchError(data.message)
        } else {
            const data = await response.json()
            setMasterInformation(data)
            console.log("Data: ", data);
            // setSolution(data)
        }
    }

    const displayServices = () => {
        if (!masterInformation) {
            return <p>Loading user profile</p>
        }

        return <div className="mx-auto max-w-6xl mt-8 grid grid-cols-3 gap-16">
            {masterInformation.solutions.map((solution, index) => {
                return <SolutionCard solution={solution} key={index} />
            })}
        </div>
    }

    return (
        <div>
            <div className="mx-auto max-w-6xl mt-8">
                <div className="mx-auto flex justify-center items-center mb-10">
                    <UserIcon className="w-24 h-24 border-4 p-2 rounded-full mr-12" />
                    <div className="flex flex-col">
                        <div className="flex">
                            <p className="mr-2 font-semibold">Name:</p>
                            <p>{masterInformation && masterInformation.firstName} {masterInformation && masterInformation.lastName}</p>
                        </div>
                        <div className="flex">
                            <p className="mr-2 font-semibold">Email:</p>
                            <p>{masterInformation && masterInformation.email}</p>
                        </div>
                        {masterInformation && masterInformation.phone && <div className="flex mb-4">
                            <p className="mr-2 font-semibold">Phone number:</p>
                            <p>{masterInformation && masterInformation.phone}</p>
                        </div>}
                    </div>
                </div>
                <div className="w-full border-t-2 border-t-gray-200">
                    <h3 className="mt-6 font-semibold text-xl">Services</h3>
                    {displayServices()}
                </div>
            </div>
        </div>
    )
}
