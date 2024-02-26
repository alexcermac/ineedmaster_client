"use client"
import { useEffect, useState } from 'react'
import { UserIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'
import SignOutButton from '@/components/SignOutButton'
import Modal from '@/components/Modal'

export default function Profile() {
    const router = useRouter()
    const [user, getUser, userLoading, userError] = useUserStore(state => [state.user, state.getUser, state.userLoading, state.userError])

    // const [modalMessage, setModalMessage] = useState("")
    const [displayModal, setDisplayModal] = useState(false)

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (userError) {
            console.log("userError: ", userError);
            
            setDisplayModal(true)
        }
    }, [userError])

    if (userLoading) {
        return (
            <div className="mx-auto max-w-6xl mt-8">
                <p>Loading</p>
            </div>
        )
    }

    return (
        <div>
            {displayModal && <Modal message={userError} handleModalClose={() => setDisplayModal(false)} />}
            <div className="mx-auto max-w-6xl mt-8">
                {/* <div className="mx-auto w-96 flex flex-col items-center">
                    <UserIcon className="w-24 h-w-24 border-4 p-2 rounded-full mb-4" />
                    <div className="flex">
                        <p className="mr-2 font-bold">Name:</p>
                        <p>{user && user.firstName} {user && user.lastName}</p>
                    </div>
                    <div className="flex">
                        <p className="mr-2 font-bold">Email:</p>
                        <p>{user && user.email}</p>
                    </div>
                    {user && user.phoneNumber && <div className="flex mb-4">
                        <p className="mr-2 font-bold">Phone number:</p>
                        <p>{user && user.phoneNumber}</p>
                    </div>}
                    <div>
                        <SignOutButton />
                    </div>
                </div> */}
                <div className="mx-auto flex justify-center items-center">
                    <UserIcon className="w-24 h-24 border-4 p-2 rounded-full mr-12" />
                    <div className="flex flex-col">
                        <div className="flex">
                            <p className="mr-2 font-bold">Name:</p>
                            <p>{user && user.firstName} {user && user.lastName}</p>
                        </div>
                        <div className="flex">
                            <p className="mr-2 font-bold">Email:</p>
                            <p>{user && user.email}</p>
                        </div>
                        {user && user.phoneNumber && <div className="flex mb-4">
                            <p className="mr-2 font-bold">Phone number:</p>
                            <p>{user && user.phoneNumber}</p>
                        </div>}
                        <div>
                            <SignOutButton />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* TODO: Tabs */}
            </div>
        </div>
    )
}