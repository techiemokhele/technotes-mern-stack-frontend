import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButtonComponent from "../constant/CustomButtonComponent";

const WelcomeBannerComponent = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <section className="flex justify-center public container m-auto space-y-4">
            <h1 className="text-6xl font-bold">Neo M. Auto Repair</h1>
            <div className="w-full flex flex-col gap-2">
                <p className="text-md"> Where every fix is custom-tailored to perfection</p>
                <p className="text-2xl">We pride ourselves on being the masters of maintenance. Trust your car with the professional service that ensures excellence and reliability on every ride.</p>
            </div>

            <div className="w-1/2 flex flex-row gap-4">
                <CustomButtonComponent
                    text="Contact Support"
                    onClick={() => handleNavigation('/contact-support')}
                    outline={true}
                    type="button"
                />

                <CustomButtonComponent
                    text="Employee Login"
                    onClick={() => handleNavigation('/login')}
                    outline={false}
                    type="button"
                />
            </div>

            <div className='flex flex-row gap-4 w-full pt-10'>
                <div className='flex flex-col justify-center h-20 px-4 items-start bg-gray-800 rounded-md hover:bg-orange-500 hover:text-white text-orange-500'>
                    <p className='uppercase text-[10px]'>we are open</p>
                    <p className='uppercase text-md'>mon - sat 9:00 - 17:00</p>
                </div>

                <div className='flex flex-col justify-center h-20 px-4 items-start bg-gray-800 rounded-md hover:bg-orange-500 hover:text-white text-orange-500'>
                    <p className='uppercase text-[10px]'>call us now</p>
                    <p className='uppercase text-md'>(+27)64 847 3363</p>
                </div>

                <div className='flex flex-col justify-center h-20 px-4 items-start bg-gray-800 rounded-md hover:bg-orange-500 hover:text-white text-orange-500'>
                    <p className='uppercase text-[10px]'>our address</p>
                    <p className='uppercase text-md'>Springs, GP 1559</p>
                </div>
            </div>
        </section>
    );
}

export default WelcomeBannerComponent;
