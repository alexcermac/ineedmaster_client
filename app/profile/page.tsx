"use client"
import { useEffect, useState } from 'react'
import { UserIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'
import SignOutButton from '@/components/SignOutButton'
import Modal from '@/components/Modal'
import ProfilePageTabs from './components/ProfilePageTabs'
import TasksGrid from './components/TasksGrid'
import ServicesGrid from './components/ServicesGrid'

export default function Profile() {
    const router = useRouter()
    const [user, getUser, userLoading, userError] = useUserStore(state => [state.user, state.getUser, state.userLoading, state.userError])

    const [activeTab, setActiveTab] = useState("futureTasks")
    const [displayModal, setDisplayModal] = useState(false)

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if(!userLoading) {
            if (userError) {
                setDisplayModal(true)
            }
        }
    }, [userError])

    const displayContentOfSelectedTab = () => {
        if (activeTab === "futureTasks") {
            return <TasksGrid typeOfTasks="futureTasks" />
        } else if (activeTab === "historyTasks") {
            return <TasksGrid typeOfTasks="historyTasks" />
        } else if (activeTab === "services") {
            return <ServicesGrid />
        }
    }

    if (userLoading) {
        return (
            <div className="mx-auto max-w-6xl mt-8">
                <p>Loading</p>
            </div>
        )
    }

    if(!user) {
        return (
            <div>
                <p>Loading user informations...</p>
            </div>
        )
    }

    return (
        <div>
            {displayModal && <Modal message={userError} handleModalClose={() => setDisplayModal(false)} />}
            {/* TODO: handle display by role */}
            <div className="mx-auto max-w-6xl mt-8">
                <div className="mx-auto flex justify-center items-center">
                    <UserIcon className="w-24 h-24 border-4 p-2 rounded-full mr-12" />
                    <div className="flex flex-col">
                        <div className="flex">
                            <p className="mr-2 font-semibold">Name:</p>
                            <p>{user && user.firstName} {user && user.lastName}</p>
                        </div>
                        <div className="flex">
                            <p className="mr-2 font-semibold">Email:</p>
                            <p>{user && user.email}</p>
                        </div>
                        {user && user.phoneNumber && <div className="flex mb-4">
                            <p className="mr-2 font-semibold">Phone number:</p>
                            <p>{user && user.phoneNumber}</p>
                        </div>}
                        <div>
                            <SignOutButton />
                        </div>
                    </div>
                </div>
            </div>
            <ProfilePageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {displayContentOfSelectedTab()}
        </div>
    )
}