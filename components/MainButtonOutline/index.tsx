import Link from 'next/link'
import React from 'react'

export default function MainButtonOutline({ text, linkTo }: { text: string, linkTo:string }) {
    return (
        <Link href={linkTo} className="inline-flex items-center justify-center px-4 py-1 text-base font-medium leading-6 text-gray-900 whitespace-no-wrap bg-white border-2 border-amber-300 rounded-md shadow-sm hover:bg-amber-400 hover:border-amber-400 focus:outline-none" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
            {text}
        </Link>
    )
}