import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MdCarRepair } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaBell, FaHome, FaPlusCircle, FaClipboardList, FaUserPlus, FaUsers, FaCog } from 'react-icons/fa';

const links = {
    company: [
        { href: "/dash/notes/new", label: "Add Note", icon: <FaPlusCircle size={20} className='mr-2' /> },
        { href: "/dash/notes", label: "View Notes", icon: <FaClipboardList size={20} className='mr-2' /> },
        { href: "/dash/users/new", label: "Add User", icon: <FaUserPlus size={20} className='mr-2' /> },
        { href: "/dash/users", label: "View Users", icon: <FaUsers size={20} className='mr-2' /> },
        { href: "#", label: "Settings", icon: <FaCog size={20} className='mr-2' /> },
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
        <Link to="/dash" className="flex flex-row px-1 py-2 rounded-md text-sm font-normal text-white hover:text-orange-800 cursor-pointer">
            <FaHome size={20} className='mr-2 flex flex-row md:hidden lg:hidden' /> Home
        </Link>
    );

    const goHomeButton = pathname !== '/dash' && onGoHomeClicked();

    return (
        <>
            <header className='flex flex-row justify-between w-full py-3 bg-gray-950 px-6'>
                <div className='flex flex-row justify-start items-center w-[25%]'>
                    <Link to="/dash" className="text-md flex flex-row gap-1 items-center">
                        <MdCarRepair size={24} className='text-orange-500' />
                        <h1 className='text-[12px] hidden sm:inline'>Neo M. Auto Repairs</h1>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex flex-row justify-center items-center w-[50%]'>
                    {goHomeButton}
                    {links.company.map((link, i) => (
                        <Link
                            key={i}
                            to={link.href}
                            className={`px-3 py-2 rounded-md text-sm font-normal text-white ${pathname === link.href ? 'text-orange-500' : ''} hover:text-orange-800 cursor-pointer`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Navigation Toggle */}
                <button className='md:hidden text-white' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <div className='hidden md:flex lg:flex flex-row justify-end items-center w-[25%] gap-2'>
                    <FaBell size={20} className='text-white cursor-pointer hover:text-orange-800' />
                    <Link to="/">
                        <CiLogout size={20} className='text-white cursor-pointer hover:text-orange-800' />
                    </Link>
                </div>
            </header>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar Navigation */}
            <div ref={sidebarRef} className={`fixed top-0 right-0 w-64 h-full bg-gray-900 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-50`}>
                <div className='p-4'>
                    <Link to="/" className="text-md flex flex-row gap-1 items-center mb-6">
                        <MdCarRepair size={24} className='text-orange-500' />
                        <h1 className='text-[12px] text-white'>Neo M. Auto Repairs</h1>
                    </Link>

                    {goHomeButton}

                    {links.company.map((link, i) => (
                        <Link
                            key={i}
                            to={link.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex flex-row px-1 py-2 rounded-md text-sm font-normal text-white ${pathname === link.href ? 'text-orange-500' : ''} hover:text-orange-800 cursor-pointer`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}

                    <div className='absolute bottom-5'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row items-center gap-2'>
                                <FaBell size={20} className='text-white cursor-pointer hover:text-orange-800' />
                                <p className="text-sm font-normal text-white hover:text-orange-800 cursor-pointer">Notifications</p>
                            </div>

                            <Link to="/" className='flex flex-row gap-2'>
                                <CiLogout size={20} className='text-white cursor-pointer hover:text-orange-800' />
                                <p className="rounded-md text-sm font-normal text-white hover:text-orange-800 cursor-pointer">Logout</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashHeaderComponent;
