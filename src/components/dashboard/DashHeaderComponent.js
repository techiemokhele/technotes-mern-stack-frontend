import { Link } from 'react-router-dom';
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
    return (
        <header className='flex flex-row justify-between w-full p-3 bg-gray-950'>
            <div className='flex flex-row justify-center items-start w-[22%]'>
                <Link to="/dash" className="text-md flex flex-row gap-1 items-center">
                    <MdCarRepair size={24} className='text-orange-500' />
                    <h1 className='text-[12px]'>Neo M. Auto Repairs</h1>
                </Link>
            </div>

            <div className='flex flex-row justify-center items-start w-[70%]'>
                <nav className="dash-header__nav">
                    <div className='flex flex-row'>
                        {links.company.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <span className="px-3 py-2 rounded-md text-sm font-normal text-white hover:text-orange-500 cursor-pointer ">
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>

            <div className='flex flex-row justify-end items-center w-[10%] gap-2'>
                <FaBell size={20} className='text-white cursor-pointer hover:text-orange-500' />
                <CiLogout size={20} className='text-white cursor-pointer hover:text-orange-500' />
            </div>
        </header>
    )
}
export default DashHeaderComponent