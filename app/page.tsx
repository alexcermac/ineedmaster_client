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
import SearchFilter from "@/components/SearchFilter"
import { useEffect, useState } from "react"
import SolutionCard from "@/components/SolutionCard"
import Modal from "@/components/Modal"

export default function Home() {
	const [countyId, setCountyId] = useState(-1)
	const [cityId, setCityId] = useState(-1)
	const [categoryId, setCategoryId] = useState(-1)
	const [subcategoryId, setSubcategoryId] = useState(-1)

	const [last10Solutions, setLast10Solutions] = useState([])
	const [last10SolutionsLoaded, setLast10SolutionsLoaded] = useState(false)
	const [fetchSolutionsError, setFetchSolutionsError] = useState("")

	useEffect(() => {
		fetchLast10Solutions()
	}, [])

	const fetchLast10Solutions = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/solutions/last-10`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				setFetchSolutionsError("Network response was not ok")
				throw new Error('Network response was not ok')
			}

			const data = await response.json()
			setLast10Solutions(data)
			setLast10SolutionsLoaded(true)
		} catch (error: any) {
			setFetchSolutionsError(error.message);
		}
	}

	const displayLast10Solutions = () => {
		if(!last10SolutionsLoaded) {
			return <p>Loading services</p>
		}
		if(last10SolutionsLoaded && last10Solutions.length === 0) {
			return <p>No service found</p>
		}

		return (
			<div className="grid grid-cols-4 gap-8">
				{last10Solutions.map((solution, index) => {
					return <SolutionCard key={index} solution={solution} />
				})}
			</div>
		)
	}

	return (
		<div className="">
			{fetchSolutionsError && <Modal message="At the moment there are some problems with the backend. I am working on fixing them, until then the website will have a functional front end without being populated with data. Thank you for your understanding." 
				handleModalClose={() => setFetchSolutionsError("")}
				/>}
			<div className="mx-auto max-w-6xl flex justify-between items-center text-center lg:flex-auto lg:py-24 lg:text-left">
				<div>
					<div className="mb-8">
						<h1 className="font-bold text-5xl">Make your life easier</h1>
						<h1 className="font-bold text-5xl">with iNeedMaster</h1>
					</div>
					<div className="mb-12">
						<p>The platform that connects problems and solutions in a few seconds.</p>
					</div>
					<Link href="/search" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-900 whitespace-no-wrap bg-amber-300 border border-amber-300 rounded-md shadow-sm hover:bg-amber-400 focus:outline-none" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
						Search for services
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
				<SearchFilter countyIdProp={countyId} cityIdProp={cityId} categoryIdProp={categoryId} subcategoryIdProp={subcategoryId} />
			</div>
			<div className="mx-auto max-w-6xl mb-14">
				<p className="font-bold text-2xl mb-12">Main categories</p>
				<div className="flex justify-between">
					<Link
						href="/search?category=4&subcategory=11"
						className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-violet-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={construction_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Craftsman</p>
					</Link>
					<Link
						href="/search?category=2&subcategory=4"
						className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-green-200 p-3 rounded-3xl mb-4 hover:cursor-pointer"
							src={door_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Windows and doors</p>
					</Link>
					<Link
						href="/search?category=2&subcategory=5"
						className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-yellow-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={furniture_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Furniture</p>
					</Link>
					<Link
						href="/search?category=2&subcategory=6"
						className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-fuchsia-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={interior_designer_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Interior design</p>
					</Link>
					<Link
						href="/search?category=3&subcategory=7"
						className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-blue-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={iron_gate_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Gates</p>
					</Link>
					<Link
						href="/search?category=1&subcategory=1"
						className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-rose-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={thermics_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Thermal installations - air conditioning</p>
					</Link>
				</div>
			</div>
			<div className="mx-auto max-w-6xl">
				<p className="font-bold text-2xl mb-12">Last published services</p>
				{displayLast10Solutions()}
			</div>
		</div>
	)
}
