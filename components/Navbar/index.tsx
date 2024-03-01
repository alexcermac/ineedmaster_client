"use client"
import Link from "next/link"
import MainButton from "../MainButton"
import MainButtonOutline from "../MainButtonOutline"
import { useUserStore } from "@/stores/userStore"
import { useEffect } from "react"
import { UserIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
    const [user, getUser, userLoading] = useUserStore(state => [state.user, state.getUser, state.userLoading])

    useEffect(() => {
        getUser()
    }, []);

    const displayLeftSide = () => {
        if(user) {
            return (
                <Link href="/profile" className="flex items-center hover:bg-gray-100 rounded-md py-1 px-3">
                    <UserIcon className="w-8 h-w-8 bg-amber-200 p-1 rounded-full mr-2" />
                    <p>{user.firstName}</p>
                </Link>
            )
        } else {
            return (
                <div className="flex">
                    <div className="mr-4">
                        <MainButton text="Login" linkTo="/login" />
                    </div>
                    <MainButtonOutline text="Register" linkTo="/register/customer" />
                </div>
            )
        }
    }

    return (
        <div className="mx-auto py-2 flex justify-between items-center lg:max-w-6xl">
            <Link href="/">iNeedMaster</Link>
            {displayLeftSide()}
        </div>
    )
}
