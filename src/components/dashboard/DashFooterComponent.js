import { FaUserTie } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";


const DashFooterComponent = () => {
    return (
        <footer className='flex flex-col w-full p-3 bg-gray-950'>
            <div className="flex flex-row justify-between items-center h-10 px-6">
                <div className="w-1/2 flex flex-row items-center gap-2">
                    <FaUserTie className="text-white" />
                    <p className="text-md capitalize">Current user: </p>
                </div>
                <div className="w-1/2 flex flex-row items-center gap-2 justify-end">
                    <GrStatusGoodSmall className="text-white" />
                    <p className="text-md capitalize">User status: </p>
                </div>
            </div>
        </footer>
    )
}
export default DashFooterComponent