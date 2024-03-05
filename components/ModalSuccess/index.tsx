import Image from "next/image";
import MainButton from "../MainButton";
import SuccessfullIcon from "@/public/successful_icon.png"

export default function ModalSuccess({ message, handleModalClose }) {
    return (
        <div
            className="w-full h-full bg-gray-800 bg-opacity-60 fixed top-0 left-0 z-50 flex items-center justify-center"
        >
            <div className="flex flex-col items-center w-full max-w-lg py-8 px-12 bg-white opacity-100 border rounded-xl shadow-gray-800">
                <p className="mt-8 mb-10">{message}</p>
                <Image
                    src={SuccessfullIcon}
                    alt="Successfull icon"
                    width={150}
                    height={150}
                    className="mx-auto mb-10"
                />
                <div className="flex justify-center">
                    <MainButton text="Close" handleOnClick={handleModalClose} />
                </div>
            </div>
        </div>
    )
}
