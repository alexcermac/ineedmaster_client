"use client"
import create_solution_illustration from '@/public/create_solution_illustration.svg'
import Image from 'next/image'
import MainButton from '@/components/MainButton'
import DatePicker from "react-datepicker"
import { useEffect, useState } from 'react'

import "react-datepicker/dist/react-datepicker.css"
import Modal from '@/components/Modal'
import { useUserStore } from '@/stores/userStore'
import ModalSuccess from '@/components/ModalSuccess'
import { useRouter } from 'next/navigation'
import ProtectedRouteMaster from '@/components/ProtectedRouteMaster'

export default function CreateSolution() {
    const router = useRouter()
    const [user] = useUserStore((state: any) => [state.user])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("COST")
    const [startHour, setStartHour] = useState(new Date())
    const [endHour, setEndHour] = useState(new Date())
    const [countyList, setCountyList] = useState([])
    const [countyFetchError, setCountyFetchError] = useState(false)
    const [cityList, setCityList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [categoryFetchError, setCategoryFetchError] = useState(false)
    const [subcategoryList, setSubcategoryList] = useState([])

    const [countyId, setCountyId] = useState(-1)
	const [cityId, setCityId] = useState( -1)
	const [categoryId, setCategoryId] = useState(-1)
	const [subcategoryId, setSubcategoryId] = useState(-1)

    const [submitErrorMessage, setSubmitErrorMessage] = useState("")
    const [displaySuccessModal, setDisplaySuccessModal] = useState(false)

    useEffect(() => {
        fetchCountyList()
        fetchCategoryList()
    }, [])

    const fetchCountyList = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/counties`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(response => {
					if(response.status === 200) {
						return response.json()
					}
					throw new Error('Something went wrong')
				})
				.then(data => {
					setCountyList(data)
					return data
				})
		} catch (error) {
			setCountyFetchError(true)
		}
	}

	const fetchCategoryList = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/categories`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(response => {
					if(response.status === 200) {
						return response.json()
					}
					throw new Error('Something went wrong')
				})
				.then(data => {
					setCategoryList(data)
					return data
				})
		} catch (error) {
			setCategoryFetchError(true)
		}
	}

    const displayCountyList = () => {
		if(countyFetchError) {
			return <option>Failed to fetch data</option>
		}

		return countyList.map((county: { id: number, name: string }, index) => {
			return (
				<option key={index} value={county.id}>{county.name}</option>
			)
		})
	}

	const displayCityList = () => {
		if(countyFetchError) {
			return <option>Failed to fetch data</option>
		}

		if(countyList.length === 0) {
			return <option>Loading</option>
		}

		if(countyId != -1) {
			// We are using the countyId as the index in the array, so we need to subtract 1
            const selectedCounty = countyList[countyId - 1] as { id: number, name: string, cities: { id: number, name: string }[] }
            if (selectedCounty && selectedCounty.cities) {
                return selectedCounty.cities.map((city, index) => {
                    return (
                        <option key={index} value={city.id}>{city.name}</option>
                    )
                })
            } else {
                return null
            }
		} else {
			return null
		}
	}

	const displayCategoryList = () => {
		if(categoryFetchError) {
			return <option>Failed to fetch data</option>
		}

		return categoryList.map((category: { id: number, name: string }, index) => {
			return (
				<option key={index} value={category.id}>{category.name}</option>
			)
		})
	}

	const displaySubcategoryList = () => {
		if(categoryFetchError) {
			return <option>Failed to fetch data</option>
		}

		if(categoryList.length === 0) {
			return <option>Loading</option>
		}

		if(categoryId != -1) {
			// We are using the categoryId as the index in the array, so we need to subtract 1
            const selectedCategory = categoryList[categoryId - 1] as { id: number, name: string, subcategories: { id: number, name: string }[] }
            if(selectedCategory && selectedCategory.subcategories) {
                return selectedCategory.subcategories.map((subcategory, index) => {
                    return (
                        <option key={index} value={subcategory.id}>{subcategory.name}</option>
                    )
                })
            } else {
                return null
            }
		} else {
			return null
		}
	}

    const handleSubmit = async () => {
        const newSolution = {
            userId: user.id,
            title: title,
            description: description,
            type: type,
            price: 0,
            countyId: countyId,
            cityId: cityId,
            categoryId: categoryId,
            subcategoryId: subcategoryId,
            startHour: startHour.getHours() + ":" + (startHour.getMinutes() === 0 ? "00" : startHour.getMinutes()), // If minutes are 0, add 00 to the end of the string,
            endHour: endHour.getHours() + ":" + (endHour.getMinutes() === 0 ? "00" : endHour.getMinutes())
        }

        console.log("New solution: ", newSolution);

        if(countyId === -1) {
            setSubmitErrorMessage("Please select a county.")
            return
        }
        if(cityId === -1) {
            setSubmitErrorMessage("Please select a city.")
            return
        }
        if(categoryId === -1) {
            setSubmitErrorMessage("Please select a category.")
            return
        }
        if(subcategoryId === -1) {
            setSubmitErrorMessage("Please select a subcategory.")
            return
        }
        

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/solutions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(newSolution)
        })

        if(response.ok) {
            setDisplaySuccessModal(true)
        } else {
            console.log("Failed to create solution")
        }
    }

    return (
        <ProtectedRouteMaster>
        <div>
            {submitErrorMessage && <Modal message={submitErrorMessage} handleModalClose={() => setSubmitErrorMessage("")} />}
            {displaySuccessModal && <ModalSuccess message="Solution created successfully" handleModalClose={() => router.push("/profile")} />}
            <div className="mx-auto max-w-6xl mt-6">
                <div className="flex justify-between">
                    <div className="flex-grow mr-10">
                        <h1 className="font-semibold text-2xl mb-6">Create a new solution</h1>
                        <div className="flex flex-col mb-6">
                            <label className="font-medium text-md">Title</label>
                            <input type="text" className="border-2 rounded-xl py-1 px-4 hover:bg-gray-50 hover:shadow-sm transition duration-100 ease-in-out" value={title} onChange={(event) => setTitle(event.target.value)}/>
                        </div>
                        <div className="flex flex-col mb-10">
                            <label className="font-medium text-md">Description</label>
                            <textarea className="border-2 rounded-xl py-1 px-4 hover:bg-gray-50 hover:shadow-sm transition duration-100 ease-in-out" value={description} onChange={(event) => setDescription(event.target.value)}/>
                        </div>
                        <div className="flex justify-center mb-10">
                            <div className="border-r-2 pr-10 mr-10 start flex-1">
                                <div className="flex flex-col mb-4">
                                    <label className="font-medium text-md">Type</label>
                                    <select
                                        className="border-2 rounded-xl py-1 px-4 w-40 max-w-40 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={type}
                                        onChange={(event: any) => setType(event.target.value)}
                                    >
                                        <option value="COST">Cost</option>
                                        <option value="CHECK">Verification</option>
                                    </select>
                                    {/* If type is COST, display price input */ }
                                </div>
                                <div className="mb-4">
                                    <p className="font-medium text-md">Start hour</p>
                                    <DatePicker
                                        className="border-2 rounded-xl py-1 px-4 w-40 max-w-40 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        selected={startHour}
                                        onChange={(date: Date) => setStartHour(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-md">End hour</p>
                                    <DatePicker
                                        className="border-2 rounded-xl py-1 px-4 w-40 max-w-40 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        selected={endHour}
                                        onChange={(date: Date) => setEndHour(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col mb-4">
                                    <label className="font-medium text-md">County</label>
                                    <select
                                        className="border-2 rounded-xl py-1 px-4 w-60 max-w-60 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={countyId}
                                        onChange={(event: any) => {
                                            setCountyId(event.target.value)
                                            setCityId(-1)
                                        }}
                                    >
                                        <option value={-1} selected>Choose a county</option>
                                        {countyList && displayCountyList()}
                                    </select>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-medium text-md">City</label>
                                    <select
                                        className="border-2 rounded-xl py-1 px-4 w-60 max-w-60 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={cityId}
                                        onChange={(event: any) => setCityId(event.target.value)}
                                    >
                                        <option value={-1} selected>Choose a city</option>
                                        {(countyList.length > 0) && displayCityList()}
                                    </select>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-medium text-md">Category</label>
                                    <select
                                        className="border-2 rounded-xl py-1 px-4 w-60 max-w-60 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={categoryId}
                                        onChange={(event: any) => {
                                            setCategoryId(event.target.value)
                                            setSubcategoryId(-1)
                                        }}
                                    >
                                        <option value={-1} selected>Choose a category</option>
                                        {categoryList && displayCategoryList()}
                                    </select>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-medium text-md">Subcategory</label>
                                    <select
                                        className="border-2 rounded-xl py-1 px-4 w-60 max-w-60 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={subcategoryId}
                                        onChange={(event: any) => setSubcategoryId(event.target.value)}
                                    >
                                        <option value={-1} selected>Choose a subcategory</option>
                                        {(categoryList.length > 0) && displaySubcategoryList()}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center ">
                            <MainButton text="Create solution" handleOnClick={handleSubmit} />
                        </div>
                    </div>
                    <div className="flex-4">
                        <Image src={create_solution_illustration} alt="Create solution illustration" />
                    </div>
                </div>
            </div>
        </div>
        </ProtectedRouteMaster>
    )
}
