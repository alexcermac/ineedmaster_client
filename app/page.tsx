"use client"
import Link from "next/link"
import illustration from "../public/homepage_illustration.svg"
import construction_icon from "../public/categories/construction_icon.png"
import door_icon from "../public/categories/door_icon.png"
import furniture_icon from "../public/categories/furniture_icon.png"
import interior_designer_icon from "../public/categories/interior_designer_icon.png"
import iron_gate_icon from "../public/categories/iron_gate_icon.png"
import thermics_icon from "../public/categories/thermics_icon.png"
import Image from "next/image"
import SearchButton from "@/components/SearchButton"
import { useEffect, useState } from "react"

export default function Home() {
	const [countyList, setCountyList] = useState([])
	const [cityList, setCityList] = useState([])
	const [categoryList, setCategoryList] = useState([])
	const [subcategoryList, setSubcategoryList] = useState([])

	const [countyId, setCountyId] = useState(-1)
	const [cityId, setCityId] = useState(-1)
	const [categoryId, setCategoryId] = useState(-1)
	const [subcategoryId, setSubcategoryId] = useState(-1)

	useEffect(() => {
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
		<div className="">
			<div className="mx-auto max-w-6xl flex justify-between items-center text-center lg:flex-auto lg:py-24 lg:text-left">
				<div>
					<div className="mb-8">
						<h1 className="font-bold text-5xl">Fa-ti viata mai usoara</h1>
						<h1 className="font-bold text-5xl">cu iNeedMaster</h1>
					</div>
					<div className="mb-12">
						<p>Platforma care conecteaza problemele si solutiile in cateva secunde.</p>
					</div>
					<Link href="#" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-900 whitespace-no-wrap bg-amber-300 border border-amber-300 rounded-md shadow-sm hover:bg-amber-400 focus:outline-none" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
						Solutii in orasul tau
					</Link>
				</div>
				<div>
					<Image
						src={illustration}
						width={500}
						height={500}
						alt="Illustration of a person looking at a list of items on a clipboard"
					/>
				</div>
			</div>
			<div className="mb-14 py-12 bg-gray-200">
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
							<option selected>Choose a city</option>
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
							<option selected>Choose a category</option>
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
							<option selected>Choose a subcategory</option>
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
			</div>
			<div className="mx-auto max-w-6xl mb-14">
				<p className="font-bold text-2xl mb-12">Categorii principale</p>
				<div className="flex justify-between">
					<div className="flex flex-col items-center flex-1 text-center hover:cursor-pointer">
						<Image
							className="bg-violet-200 p-4 rounded-3xl mb-4"
							src={construction_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p>Meseriasi</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center hover:cursor-pointer">
						<Image
							className="bg-green-200 p-3 rounded-3xl mb-4"
							src={door_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p>Ferestre si usi</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center hover:cursor-pointer">
						<Image
							className="bg-yellow-200 p-4 rounded-3xl mb-4"
							src={furniture_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p>Mobilier</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center hover:cursor-pointer">
						<Image
							className="bg-fuchsia-200 p-4 rounded-3xl mb-4"
							src={interior_designer_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p>Amenajari interioare</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center hover:cursor-pointer">
						<Image
							className="bg-blue-200 p-4 rounded-3xl mb-4"
							src={iron_gate_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p>Feronerie</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center hover:cursor-pointer">
						<Image
							className="bg-rose-200 p-4 rounded-3xl mb-4"
							src={thermics_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p>Instalatii termice - aer conditionat</p>
					</div>
				</div>
			</div>
			<div className="mx-auto max-w-6xl">
				<p className="font-bold text-2xl mb-12">Cele mai noi anunturi</p>
				<div className="flex justify-between">
				</div>
				{/* TODO: Get last 10 records */}
			</div>
		</div>
	);
}
