import Link from 'next/link'

export default function MainButton({ text, linkTo, handleOnClick, submitLoading }: { text: string, linkTo?: string, handleOnClick?: any, submitLoading?: boolean | null }) {

    if(!linkTo) {
        return (
            <button
                onClick={() => !submitLoading && handleOnClick()}
                className={`inline-flex items-center justify-center px-4 py-1 text-base font-medium leading-6 text-gray-900 whitespace-no-wrap bg-amber-300 border-2 border-amber-300 rounded-md shadow-sm hover:bg-amber-400 hover:border-amber-400 focus:outline-none ${submitLoading && "cursor-not-allowed bg-gray-300 border-gray-300 hover:bg-gray-400 hover:border-gray-400"}`}
                data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                {text}
            </button>
        )
    } else {
        return (
            <Link href={linkTo} className="inline-flex items-center justify-center px-4 py-1 text-base font-medium leading-6 text-gray-900 whitespace-no-wrap bg-amber-300 border-2 border-amber-300 rounded-md shadow-sm hover:bg-amber-400 hover:border-amber-400 focus:outline-none" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                {text}
            </Link>
        )
    }
}
