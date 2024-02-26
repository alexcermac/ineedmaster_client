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

export default function Home() {
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
				<SearchFilter />
			</div>
			<div className="mx-auto max-w-6xl mb-14">
				<p className="font-bold text-2xl mb-12">Categorii principale</p>
				<div className="flex justify-between">
					<div className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-violet-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={construction_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Meseriasi</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-green-200 p-3 rounded-3xl mb-4 hover:cursor-pointer"
							src={door_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Ferestre si usi</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-yellow-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={furniture_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Mobilier</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-fuchsia-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={interior_designer_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Amenajari interioare</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-blue-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={iron_gate_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Feronerie</p>
					</div>
					<div className="flex flex-col items-center flex-1 text-center">
						<Image
							className="bg-rose-200 p-4 rounded-3xl mb-4 hover:cursor-pointer"
							src={thermics_icon}
							width={80}
							height={80}
							alt="Construction icon"
						/>
						<p className="hover:cursor-pointer hover:underline">Instalatii termice - aer conditionat</p>
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
