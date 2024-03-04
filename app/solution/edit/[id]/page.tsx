"use client"
import MainButton from '@/components/MainButton'
import DatePicker from "react-datepicker"
import { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import Modal from '@/components/Modal'
import { useUserStore } from '@/stores/userStore'
import ModalSuccess from '@/components/ModalSuccess'
import { useRouter } from 'next/navigation'
import ButtonErrorOutline from '@/components/ButtonErrorOutline'
import { convertDateToHourMinutesString, convertStringHourMinutesToDate } from '@/app/common/utils'
import { Solution } from '@/app/common/types'

export default function EditSolution({ params: { id } }: { params: { id: string } }) {
    const router = useRouter()
    const [user] = useUserStore(state => [state.user])

    const [solution, setSolution] = useState<Solution | null>(null)
    const [solutionFetchError, setSolutionFetchError] = useState("")

    const [countyList, setCountyList] = useState([])
    const [countyFetchError, setCountyFetchError] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [categoryFetchError, setCategoryFetchError] = useState(false)

    const [submitErrorMessage, setSubmitErrorMessage] = useState("")
    const [displaySuccessModal, setDisplaySuccessModal] = useState(false)

    useEffect(() => {
        fetchSolution()

        fetchCountyList()
        fetchCategoryList()
    }, [])

    const fetchSolution = async () => {
        const response = await fetch(`http://localhost:8080/api/solutions/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            const data = await response.json()
            setSolutionFetchError(data.message)
            console.log("Failed to fetch solution");
            
        } else {
            const data = await response.json()

            data.startHour = convertStringHourMinutesToDate(data.startHour)
            data.endHour = convertStringHourMinutesToDate(data.endHour)
            
            setSolution(data)
        }
    }

    const fetchCountyList = async () => {
		try {
			const response = await fetch("http://localhost:8080/api/counties", {
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
			const response = await fetch("http://localhost:8080/api/categories", {
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

		if(solution?.countyId != -1) {
			// We are using the countyId as the index in the array, so we need to subtract 1
			return countyList[solution?.countyId - 1].cities.map((city, index) => {
				return (
					<option key={index} value={city.id}>{city.name}</option>
				)
			})
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

		if(solution?.categoryId != -1) {
			// We are using the categoryId as the index in the array, so we need to subtract 1
			return categoryList[solution?.categoryId - 1].subcategories.map((subcategory, index) => {
				return (
					<option key={index} value={subcategory.id}>{subcategory.name}</option>
				)
			})
		} else {
			return null
		}
	}

    const handleSaveSubmit = async () => {
        const newSolution = {
            userId: solution.userId,
            title: solution.title,
            description: solution.description,
            type: solution.type,
            price: solution.price,
            countyId: solution.countyId,
            cityId: solution.cityId,
            categoryId: solution.categoryId,
            subcategoryId: solution.subcategoryId,
            startHour: convertDateToHourMinutesString(solution.startHour),
            endHour: convertDateToHourMinutesString(solution.endHour)
        }

        if(solution.countyId === -1) {
            setSubmitErrorMessage("Please select a county.")
            return
        }
        if(solution.cityId === -1) {
            setSubmitErrorMessage("Please select a city.")
            return
        }
        if(solution.categoryId === -1) {
            setSubmitErrorMessage("Please select a category.")
            return
        }
        if(solution.subcategoryId === -1) {
            setSubmitErrorMessage("Please select a subcategory.")
            return
        }
        

        const response = await fetch(`http://localhost:8080/api/solutions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(newSolution)
        })

        if(response.ok) {
            console.log("Service was updated successfully");
            
            setDisplaySuccessModal(true)
        } else {
            console.log("Failed to create solution")
        }
    }

    return (
        <div>
            {submitErrorMessage && <Modal message={submitErrorMessage} handleModalClose={() => setSubmitErrorMessage("")} />}
            {displaySuccessModal && <ModalSuccess message="Solution updated successfully" handleModalClose={() => router.push("/profile")} />}
            <div className="mx-auto max-w-6xl mt-8">
                <div className="flex justify-between">
                    <div className="mx-auto max-w-3xl flex-grow ">
                        <h1 className="font-semibold text-2xl mb-6">Edit your service</h1>
                        <div className="flex flex-col mb-6">
                            <label className="font-medium text-md">Title</label>
                            <input
                                type="text" className="border-2 rounded-xl py-1 px-4 hover:bg-gray-50 hover:shadow-sm transition duration-100 ease-in-out"
                                value={solution?.title}
                                onChange={(event) => setSolution({ ...solution, title: event.target.value })}
                            />
                        </div>
                        <div className="flex flex-col mb-10">
                            <label className="font-medium text-md">Description</label>
                            <textarea
                                type="text" className="border-2 rounded-xl py-1 px-4 hover:bg-gray-50 hover:shadow-sm transition duration-100 ease-in-out"
                                value={solution?.description}
                                onChange={(event) => setSolution({ ...solution, description: event.target.value })}/>
                        </div>
                        <div className="flex justify-center mb-14">
                            <div className="border-r-2 pr-10 mr-10 start flex-1">
                                <div className="flex flex-col mb-4">
                                    <label className="font-medium text-md">Type</label>
                                    <select
                                        type="text"
                                        className="border-2 rounded-xl py-1 px-4 w-40 max-w-40 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={solution?.type}
                                        onChange={(event) => setSolution({ ...solution, type: event.target.value })}
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
                                        selected={solution?.startHour}
                                        onChange={(date) => setSolution({ ...solution, startHour: date })}
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
                                        selected={solution?.endHour}
                                        onChange={(date) => setSolution({ ...solution, endHour: date })}
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
                                        type="text"
                                        className="border-2 rounded-xl py-1 px-4 w-60 max-w-60 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={solution?.countyId}
                                        onChange={(event) => {
                                            // setCountyId(event.target.value)
                                            // setCityId(-1)
                                            setSolution({ ...solution, countyId: event.target.value, cityId: -1})
                                        }}
                                    >
                                        <option value={-1} selected>Choose a county</option>
                                        {countyList && displayCountyList()}
                                    </select>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-medium text-md">City</label>
                                    <select
                                        type="text"
                                        className="border-2 rounded-xl py-1 px-4 w-60 max-w-60 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={solution?.cityId}
                                        // onChange={(event) => setCityId(event.target.value)}
                                        onChange={(event) => setSolution({...solution, cityId: event.target.value })}
                                    >
                                        <option value={-1} selected>Choose a city</option>
                                        {(countyList.length > 0) && displayCityList()}
                                    </select>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-medium text-md">Category</label>
                                    <select
                                        type="text" 
                                        className="border-2 rounded-xl py-1 px-4 w-60 max-w-60 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={solution?.categoryId}
                                        onChange={(event) => {
                                            // setCategoryId(event.target.value)
                                            // setSubcategoryId(-1)
                                            setSolution({ ...solution, categoryId: event.target.value, subcategoryId: -1 })
                                        }}
                                    >
                                        <option value={-1} selected>Choose a category</option>
                                        {categoryList && displayCategoryList()}
                                    </select>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-medium text-md">Subcategory</label>
                                    <select
                                        type="text"
                                        className="border-2 rounded-xl py-1 px-4 w-60 max-w-60 hover:bg-gray-50 hover:shadow-sm hover:cursor-pointer transition duration-150 ease-in-out"
                                        value={solution?.subcategoryId}
                                        // onChange={(event) => setSubcategoryId(event.target.value)}
                                        onChange={(event) => setSolution({ ...solution, subcategoryId: event.target.value })}
                                    >
                                        <option value={-1} selected>Choose a subcategory</option>
                                        {(categoryList.length > 0) && displaySubcategoryList()}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around">
                            <ButtonErrorOutline text="Delete service" linkTo="/profile" />
                            <MainButton text="Save changes" handleOnClick={handleSaveSubmit}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
