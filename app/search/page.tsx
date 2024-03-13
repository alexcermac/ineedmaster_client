"use client"
import { useEffect, useState } from "react";
import { Solution } from '@/app/common/types'
import SolutionCard from "@/components/SolutionCard";
import SearchFilter from "@/components/SearchFilter";
import { useSearchParams } from 'next/navigation'

const URL_BASE = `${process.env.NEXT_PUBLIC_URL_PREFIX}/api/solutions`

// export default function Search({ searchParams }: { searchParams: URLSearchParams }) {
export default function Search() {
    // const urlParams = new URLSearchParams(searchParams)
    const searchParams = useSearchParams()

    const [solutions, setSolutions] = useState([])
    const [countyId, setCountyId] = useState(-1)
    const [cityId, setCityId] = useState(-1)
    const [categoryId, setCategoryId] = useState(-1)
    const [subcategoryId, setSubcategoryId] = useState(-1)

    useEffect(() => {
        // const urlParams = URL_BASE + searchParams.urlParams

        // const urlForApiCall = buildUrlForApiCall(urlParams)
        const urlForApiCall = buildUrlForApiCall()
        console.log("URL for API call", urlForApiCall)

        setFiltersFromUrl()

        try {
            fetch(urlForApiCall, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    setSolutions(data)
                })
        } catch (error) {
        }

    }, [searchParams])

    const setFiltersFromUrl = () => {
		// if(urlParams.get('county') === null) {
		if(searchParams.get('county') === null) {
			return
		}

		// const countyId = urlParams.get('county')
		const countyId = searchParams.get('county')
		// const cityId = urlParams.get('city')
		const cityId = searchParams.get('city')
		// const categoryId = urlParams.get('category')
		const categoryId = searchParams.get('category')
		// const subcategoryId = urlParams.get('subcategory')
		const subcategoryId = searchParams.get('subcategory')

		if(countyId) {
			setCountyId(parseInt(countyId))
		}
		if(cityId) {
			setCityId(parseInt(cityId))
		}
		if(categoryId) {
			setCategoryId(parseInt(categoryId))
		}
		if(subcategoryId) {
			setSubcategoryId(parseInt(subcategoryId))
		}
	}

    // const buildUrlForApiCall = (urlParams: URLSearchParams) => {
    const buildUrlForApiCall = () => {
        let url = URL_BASE

        if (searchParams.get('county')) {
            url += `/county/${searchParams.get('county')}`
        }
        if (searchParams.get('city')) {
            url += `/city/${searchParams.get('city')}`
        }
        if (searchParams.get('category')) {
            url += `/category/${searchParams.get('category')}`
        }
        if (searchParams.get('subcategory')) {
            url += `/subcategory/${searchParams.get('subcategory')}`
        }

        return url
    }

    const displaySolutions = () => {
        if (solutions.length === 0) {
            return (
                <div className="mx-auto max-w-6xl">
                    <p>No solutions found.</p>
                </div>
            )
        }

        return (
            <div className="mx-auto max-w-6xl grid grid-cols-4 gap-6">
                {solutions.map((solution: Solution, index) => {
                    return (
                        <SolutionCard
                            solution={solution}
                            key={index}
                        />
                    )
                })}
            </div>
        )
    }
    
    return (
        <div className="mt-8">
            <div className="mb-14 py-12 bg-gray-200">
                <SearchFilter countyIdProp={countyId} cityIdProp={cityId} categoryIdProp={categoryId} subcategoryIdProp={subcategoryId} />
			</div>
            {displaySolutions()}
        </div>
    )
}
