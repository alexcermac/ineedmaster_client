import Link from "next/link"
import MainButton from "../MainButton"


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
                <MainButton text="Login" linkTo="/login" />
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
