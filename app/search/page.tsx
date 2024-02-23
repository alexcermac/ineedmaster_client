"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Search({ searchParams }) {
    const router = useRouter()
    console.log("searchParams: ", searchParams);
    
    return (
        <div>
            <p>Search</p>
        </div>
    )
}
