"use client"
import { useEffect, useState } from "react"
import SearchButton from "../SearchButton"

export default function SearchFilter() {
    const [countyList, setCountyList] = useState([])
	const [cityList, setCityList] = useState([])
	const [categoryList, setCategoryList] = useState([])
	const [subcategoryList, setSubcategoryList] = useState([])	

    const [countyId, setCountyId] = useState(-1)
	const [cityId, setCityId] = useState(-1)
	const [categoryId, setCategoryId] = useState(-1)
	const [subcategoryId, setSubcategoryId] = useState(-1)

    useEffect(() => {
        // TODO: set properties if they exist in the URL

		fetch("http://localhost:8080/api/counties", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(data => {
				setCountyList(data)
			})

		fetch("http://localhost:8080/api/categories", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(data => {
				setCategoryList(data)
			})
	}, [])

    const displayCountyList = () => {
		return countyList.map((county: { id: number, name: string }, index) => {
			return (
				<option key={index} value={county.id}>{county.name}</option>
			)
		})
	}

	const displayCityList = () => {
		if(countyId != -1) {
			// We are using the countyId as the index in the array, so we need to subtract 1
			return countyList[countyId - 1].cities.map((city, index) => {
				return (
					<option key={index} value={city.id}>{city.name}</option>
				)
			})
		} else {
			return null
		}
	}

	const displayCategoryList = () => {
		return categoryList.map((category: { id: number, name: string }, index) => {
			return (
				<option key={index} value={category.id}>{category.name}</option>
			)
		})
	}

	const displaySubcategoryList = () => {
		if(categoryId != -1) {
			// We are using the categoryId as the index in the array, so we need to subtract 1
			return categoryList[categoryId - 1].subcategories.map((subcategory, index) => {
				return (
					<option key={index} value={subcategory.id}>{subcategory.name}</option>
				)
			})
		} else {
			return null
		}
	}

    return (
        <div className="mx-auto max-w-6xl flex justify-between items-center ">
					<div className="w-full mr-6">
						<label className="block mb-2 text-sm font-medium text-gray-900">County</label>
						<select
							className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:border-amber-300 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-amber-300 dark:focus:border-amber-300 dark:focus:outline-4"
							// value={county}
							onChange={(event) => setCountyId(event.target.value)}
						>
							<option value={-1} selected>Choose a county</option>
							{countyList && displayCountyList()}
						</select>
					</div>
					<div className="w-full mr-6">
						<label className="block mb-2 text-sm font-medium text-gray-900">City</label>
						<select
							className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:border-amber-300 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-amber-300 dark:focus:border-amber-300 dark:focus:outline-4"
							value={cityId}
							onChange={(event) => setCityId(event.target.value)}
						>
							<option value={-1} selected>Choose a city</option>
							{cityList && displayCityList()}
						</select>
					</div>
					<div className="w-full mr-6">
						<label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
						<select
							className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:border-amber-300 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-amber-300 dark:focus:border-amber-300 dark:focus:outline-4"
							value={categoryId}
							onChange={(event) => setCategoryId(event.target.value)}
						>
							<option value={-1} selected>Choose a category</option>
							{categoryList && displayCategoryList()}
						</select>
					</div>
					<div className="w-full mr-6">
						<label className="block mb-2 text-sm font-medium text-gray-900">Subcategory</label>
						<select
							className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:border-amber-300 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-amber-300 dark:focus:border-amber-300 dark:focus:outline-4"
							value={subcategoryId}
							onChange={(event) => setSubcategoryId(event.target.value)}
						>
							<option value={-1} selected>Choose a subcategory</option>
							{subcategoryList && displaySubcategoryList()}
						</select>
					</div>
					<div>
						<br/>
						<SearchButton
							countyId={countyId}
							cityId={cityId}
							categoryId={categoryId}
							subcategoryId={subcategoryId}
						/>
					</div>
				</div>
    )
}
