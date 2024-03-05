import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from "next/navigation"

interface Props {
    countyId: number,
    cityId: number,
    categoryId: number,
    subcategoryId: number
}

export default function SearchButton({ countyId, cityId, categoryId, subcategoryId }: Props) {
    const router = useRouter()

    const handleClick = () => {
        let urlParams = ""
        
        if(countyId != -1) {
            urlParams += `county=${countyId}`
        } 
        if (cityId != -1) {
            urlParams += `&city=${cityId}`
        } 
        if (categoryId != -1) {
            urlParams += `&category=${categoryId}`
        } 
        if (subcategoryId != -1) {    
            urlParams += `&subcategory=${subcategoryId}`
        }

        router.push(`/search?${urlParams}`)
    }

    return (
        <div
            onClick={handleClick}
            className="flex items-center w-full px-4 py-1 hover:cursor-pointer bg-amber-300 border border-amber-300 rounded-md shadow-sm hover:bg-amber-400"
        >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <p className="ml-2">Search</p>
        </div>
    )
}
