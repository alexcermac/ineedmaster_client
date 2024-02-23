import Link from "next/link"
import MainButton from "../MainButton"
import MainButtonOutline from "../MainButtonOutline"


export default function Navbar() {

    const displayLeftSide = () => {
        if(false) {
            return (
                <div>
                    <p>User name</p>
                </div>
            )
        } else {
            return (
                <div className="flex">
                    <div className="mr-4">
                        <MainButton text="Login" linkTo="/login"/>
                    </div>
                    <MainButtonOutline text="Register" linkTo="/register/customer" />
                </div>
            )
        }
    }

    return (
        <div className="mx-auto py-2 flex justify-between items-center lg:max-w-6xl">
            <Link href="/">iNeedMaster</Link>
            {displayLeftSide()}
        </div>
    )
}
