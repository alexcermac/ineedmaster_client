"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterCustomer() {
    const router = useRouter()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const role = "ROLE_CUSTOMER"
    const [formError, setFormError] = useState("")

    const handleSubmit = (event: any) => {
        event.preventDefault()

        if(password !== confirmPassword) {
            setFormError("Passwords do not match")
            return
        }
        
        try {
            fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password, phoneNumber, role }),
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("token", data.token)
                    router.push("/profile")
                })
        } catch (error:any) {
            setFormError(error)
        }
    }
    
    return (
        <div className="mx-auto my-16 w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:border-gray-300">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Create a new customer account
                </h1>
                <p>
                    You want to provide services? <Link href="/register/master" className="text-amber-500 hover:underline dark:text-primary-500">Create an account</Link> and get customers.
                </p>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                        <input
                            type="text" name="first-name" id="first-name" placeholder="your first name"
                            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-amber-400"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                        <input
                            type="text" name="last-name" id="last-name" placeholder="your last name"
                            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-amber-400"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input
                            type="email" name="email" id="email" placeholder="name@email.com"
                            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-amber-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input
                            type="password" name="password" id="password" placeholder="••••••••"
                            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-amber-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                        <input
                            type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-amber-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                        <input
                            type="text" name="email" id="email" placeholder="071234567890"
                            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-amber-400"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required={true}
                        />
                    </div>
                    <button type="submit" className="w-full bg-amber-300 border border-amber-300 hover:bg-amber-400  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                    </p>
                </form>
            </div>
      </div>
    )
}
