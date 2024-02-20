'use client'

import { useState } from "react"

export default function Login() {
    const [formError, setFormError] = useState("")

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        
        try {
            fetch('http://localhost:8080/api/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("token", data.token)
                })
        } catch (error:any) {
            setFormError(error)
        }
          
    }

    return (
        <div className="mx-auto mt-16 w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:border-gray-300">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-amber-400" placeholder="name@email.com" required={true} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-amber-400" required={true} />
                    </div>
                    <button type="submit" className="w-full bg-amber-300 border border-amber-300 hover:bg-amber-400  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                    </p>
                </form>
            </div>
      </div>
    )
}