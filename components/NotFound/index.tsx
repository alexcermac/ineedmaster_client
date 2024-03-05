import React from 'react'

export default function NotFound({ message }: { message: string }) {
    return (
        <div className="mx-auto max-w-6xl mt-8">
            <p>{message}</p>
        </div>
    )
}
