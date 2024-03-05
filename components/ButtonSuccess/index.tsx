import Link from 'next/link'

export default function ButtonSuccess({ text, linkTo, handleOnClick }: { text: string, linkTo?: string, handleOnClick?: any }) {

    if(!linkTo) {
        return (
            <button
                onClick={handleOnClick}
                className="inline-flex items-center justify-center px-4 py-1 text-base font-medium leading-6 text-gray-900 whitespace-no-wrap bg-emerald-300 border-2 border-emerald-300 rounded-md shadow-sm hover:bg-emerald-400 hover:border-emerald-400 focus:outline-none"
                data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                {text}
            </button>
        )
    } else {
        return (
            <Link href={linkTo} className="inline-flex items-center justify-center px-4 py-1 text-base font-medium leading-6 text-gray-900 whitespace-no-wrap bg-emerald-300 border-2 border-emerald-300 rounded-md shadow-sm hover:bg-emerald-400 hover:border-emerald-400 focus:outline-none" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                {text}
            </Link>
        )
    }
}
