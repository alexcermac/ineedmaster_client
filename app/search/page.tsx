"use client"

import { useEffect, useState } from "react";

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

    }, [])
    
    return (
        <div>
            <p>Search</p>
        </div>
    )
}
