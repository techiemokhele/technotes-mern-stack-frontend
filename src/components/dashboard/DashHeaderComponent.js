import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onGoHomeClicked = () => (
        <Link to="/dash" className="px-3 py-2 rounded-md text-sm font-normal text-white hover:text-orange-500 cursor-pointer">
            Home
        </Link>
    );

    const goHomeButton = pathname !== '/dash' && onGoHomeClicked();

    return (
        <>
            <header className='flex flex-row justify-between w-full py-3 bg-gray-950 px-6'>
                <div className='flex flex-row justify-start items-center w-[25%]'>
                    <Link to="/" className="text-md flex flex-row gap-1 items-center">
                        <MdCarRepair size={24} className='text-orange-500' />
                        <h1 className='text-[12px] hidden sm:inline'>Neo M. Auto Repairs</h1>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex flex-row justify-center items-center w-[50%]'>
                    {goHomeButton}
                    {links.company.map((link, i) => (
                        <Link key={i} to={link.href} className="px-3 py-2 rounded-md text-sm font-normal text-white hover:text-orange-500 cursor-pointer">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Navigation Toggle */}
                <button className='md:hidden text-white' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <div className='hidden md:flex lg:flex flex-row justify-end items-center w-[25%] gap-2'>
                    <FaBell size={20} className='text-white cursor-pointer hover:text-orange-500' />
                    <CiLogout size={20} className='text-white cursor-pointer hover:text-orange-500' />
                </div>
            </header>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar Navigation */}
            <div ref={sidebarRef} className={`fixed top-0 left-0 w-64 h-full bg-gray-900 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-50`}>
                <div className='p-4'>
                    <Link to="/" className="text-md flex flex-row gap-1 items-center mb-6">
                        <MdCarRepair size={24} className='text-orange-500' />
                        <h1 className='text-[12px] text-white'>Neo M. Auto Repairs</h1>
                    </Link>

                    {goHomeButton}

                    {links.company.map((link, i) => (
                        <Link key={i} to={link.href} className="block px-3 py-2 rounded-md text-sm font-normal text-white hover:text-orange-500 cursor-pointer">
                            {link.label}
                        </Link>
                    ))}

                    <div className='absolute bottom-5'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row items-center gap-2'>
                                <FaBell size={20} className='text-white cursor-pointer hover:text-orange-500' />
                                <p className="text-sm font-normal text-white hover:text-orange-500 cursor-pointer">Notifications</p>
                            </div>

                            <div className='flex flex-row gap-2'>
                                <CiLogout size={20} className='text-white cursor-pointer hover:text-orange-500' />
                                <p className="rounded-md text-sm font-normal text-white hover:text-orange-500 cursor-pointer">Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashHeaderComponent;