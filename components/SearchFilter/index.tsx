"use client"
import { useEffect, useState } from "react"
import SearchButton from "../SearchButton"

interface Props {
	countyIdProp: number
	cityIdProp: number
	categoryIdProp: number
	subcategoryIdProp: number
}

export default function SearchFilter({ countyIdProp, cityIdProp, categoryIdProp, subcategoryIdProp }: Props) {
// export default function SearchFilter() {
// export default function SearchFilter({ countyId, cityId, categoryId, subcategoryId, setCountyId, setCityId, setCategoryId, setSubcategoryId }: Props) {
    const [countyList, setCountyList] = useState([])
	const [cityList, setCityList] = useState([])
	const [categoryList, setCategoryList] = useState([])
	const [subcategoryList, setSubcategoryList] = useState([])

	const [countyFetchError, setCountyFetchError] = useState(false)
	const [categoryFetchError, setCategoryFetchError] = useState(false)

    const [countyId, setCountyId] = useState(-1)
	const [cityId, setCityId] = useState( -1)
	const [categoryId, setCategoryId] = useState(-1)
	const [subcategoryId, setSubcategoryId] = useState(-1)

    useEffect(() => {
		fetchCountyList()
		fetchCategoryList()
	}, [])

	useEffect(() => {
		if(countyList.length > 0 && categoryList.length > 0) {
			setCountyId(countyIdProp)
			setCityId(cityIdProp)
			setCategoryId(categoryIdProp)
			setSubcategoryId(subcategoryIdProp)
		}
	}, [countyList, categoryList])

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
			if(selectedCounty && selectedCounty.cities) {
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

    return (
        <div className="mx-auto max-w-6xl flex justify-between items-center ">
			<div className="w-full mr-6">
				<label className="block mb-2 text-sm font-medium text-gray-900">County</label>
				<select
					className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:border-amber-300 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-amber-300 dark:focus:border-amber-300 dark:focus:outline-4"
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
			<div className="w-full mr-6">
				<label className="block mb-2 text-sm font-medium text-gray-900">City</label>
				<select
					className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:border-amber-300 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-amber-300 dark:focus:border-amber-300 dark:focus:outline-4"
					value={cityId}
					onChange={(event: any) => setCityId(event.target.value)}
				>
					<option value={-1} selected>Choose a city</option>
					{(countyList.length > 0) && displayCityList()}
				</select>
			</div>
			<div className="w-full mr-6">
				<label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
				<select
					className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:border-amber-300 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-amber-300 dark:focus:border-amber-300 dark:focus:outline-4"
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
			<div className="w-full mr-6">
				<label className="block mb-2 text-sm font-medium text-gray-900">Subcategory</label>
				<select
					className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:border-amber-300 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-amber-300 dark:focus:border-amber-300 dark:focus:outline-4"
					value={subcategoryId}
					onChange={(event: any) => setSubcategoryId(event.target.value)}
				>
					<option value={-1} selected>Choose a subcategory</option>
					{(categoryList.length > 0) && displaySubcategoryList()}
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
