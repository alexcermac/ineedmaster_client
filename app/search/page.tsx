"use client"
import { useEffect, useState } from "react";
import { Solution } from '@/app/common/types'
import SolutionCard from "@/components/SolutionCard";
import SearchFilter from "@/components/SearchFilter";

const URL_BASE = `${process.env.NEXT_PUBLIC_URL_PREFIX}/api/solutions`

export default function Search({ searchParams }) {
    const urlParams = new URLSearchParams(searchParams)

    const [solutions, setSolutions] = useState([])
    const [countyId, setCountyId] = useState(-1)
    const [cityId, setCityId] = useState(-1)
    const [categoryId, setCategoryId] = useState(-1)
    const [subcategoryId, setSubcategoryId] = useState(-1)

    useEffect(() => {
        // const urlParams = URL_BASE + searchParams.urlParams

        const urlForApiCall = buildUrlForApiCall(urlParams)
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
		if(urlParams.get('county') === null) {
			return
		}

		const countyId = urlParams.get('county')
		const cityId = urlParams.get('city')
		const categoryId = urlParams.get('category')
		const subcategoryId = urlParams.get('subcategory')

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

    const buildUrlForApiCall = (urlParams: URLSearchParams) => {
        let url = URL_BASE

        if (urlParams.get('county')) {
            url += `/county/${urlParams.get('county')}`
        }
        if (urlParams.get('city')) {
            url += `/city/${urlParams.get('city')}`
        }
        if (urlParams.get('category')) {
            url += `/category/${urlParams.get('category')}`
        }
        if (urlParams.get('subcategory')) {
            url += `/subcategory/${urlParams.get('subcategory')}`
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
