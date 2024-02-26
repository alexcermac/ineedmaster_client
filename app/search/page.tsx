"use client"
import { useEffect, useState } from "react";
import { Solution } from '@/app/common/types'
import Card from "./components/Card";
import SearchFilter from "@/components/SearchFilter";

const URL_BASE = "http://localhost:8080/api/solutions"

export default function Search({ searchParams }) {
    const [solutions, setSolutions] = useState([])

    useEffect(() => {
        const url = URL_BASE + searchParams.url

        try {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    console.log("DATA: ", data);
                    setSolutions(data)
                })
        } catch (error) {
            console.log("ERROR: ", error);
        }

    }, [searchParams])

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
                        <Card
                            solution={solution}
                            index={index}
                        />
                    )
                })}
            </div>
        )
    }
    
    return (
        <div className="mt-8">
            <div className="mb-14 py-12 bg-gray-200">
				<SearchFilter />
			</div>
            {displaySolutions()}
        </div>
    )
}
