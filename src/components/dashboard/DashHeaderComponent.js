import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { MdCarRepair } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const links = {
    company: [
        { href: "#", label: "Create Note" },
        { href: "#", label: "View Notes" },
        { href: "#", label: "Settings" },
    ],
};

const DashHeaderComponent = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    return (
        <header className='flex flex-row justify-between w-full py-3 bg-gray-950 px-6'>
            <div className='flex flex-row justify-start items-start w-[25%]'>
                <Link to="/" className="text-md flex flex-row gap-1 items-center">
                    <MdCarRepair size={24} className='text-orange-500' />
                    <h1 className='text-[12px]'>Neo M. Auto Repairs</h1>
                </Link>
            </div>

            <div className='flex flex-row justify-center items-center w-[50%]'>
                <div className='flex flex-row'>
                    {goHomeButton && (
                        <Link href="/dash">
                            <span className="px-3 py-2 rounded-md text-sm font-normal text-white hover:text-orange-500 cursor-pointer ">
                                Home
                            </span>
                        </Link>
                    )}
                    {links.company.map((link, i) => (
                        <Link key={i} href={link.href}>
                            <span className="px-3 py-2 rounded-md text-sm font-normal text-white hover:text-orange-500 cursor-pointer ">
                                {link.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='flex flex-row justify-end items-center w-[5%] gap-2'>
                <FaBell size={20} className='text-white cursor-pointer hover:text-orange-500' />
                <CiLogout size={20} className='text-white cursor-pointer hover:text-orange-500' />
            </div>
        </header>
    )
}
export default DashHeaderComponent