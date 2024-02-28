import { Solution } from '@/app/common/types'
import MainButton from '@/components/MainButton'
import Image from 'next/image'
import construction_icon from "../../../../public/categories/construction_icon.png"
import Link from 'next/link'

export default function Card({ solution }: { solution: Solution }, index: number) {
    return (
        <div
            key={index}
            className="border-2 rounded-xl py-2 px-4 hover:bg-gray-100 hover:shadow-md transition duration-250 ease-in-out"
        >
            <Image
                className="mx-auto mb-4"
                src={construction_icon}
                alt={solution.title}
                width={120}
                height={120}
            />
            <Link href={`/solution/${solution.id}`} className="font-semibold text-lg hover:underline">{solution.title}</Link>
            <p className="font-normal text-gray-600 text-md">{solution.description}</p>
            <p className="font-normal text-gray-400 text-sm mt-4">Category: {solution.categoryName}</p>
            <p className="font-normal text-gray-400 text-sm mb-6">Subcategory: {solution.subcategoryName}</p>
            <div className="flex justify-between items-center">
                {solution.type === "COST"
                ? <p className="text-right">Price: {solution.price} euros</p>
                : <p className="text-right">Inspection</p>}
                <MainButton text="Details" linkTo={`/solution/${solution.id}`} />
            </div>
        </div>
    )
}
