import MainButton from "../MainButton";


export default function Modal({ message, handleModalClose }) {
    return (
        <div
            className="w-full h-full bg-gray-800 bg-opacity-60 fixed top-0 left-0 z-50 flex items-center justify-center"
        >
            <div className="py-8 px-12 bg-white opacity-100 border rounded-xl shadow-gray-800">
                <p className="mt-8 mb-12">{message}</p>
                <div className="flex justify-center">
                    <MainButton text="Close" handleOnClick={handleModalClose} />
                </div>
            </div>
        </div>
    )
}
