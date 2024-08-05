import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LiaBusinessTimeSolid } from 'react-icons/lia'
import { MdSupportAgent } from 'react-icons/md'
import { FaMapLocationDot } from 'react-icons/fa6'

import CustomButtonComponent from '../constant/CustomButtonComponent'

const WelcomeBannerComponent = () => {
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path)
    }

    return (
        <section className='flex justify-center public container m-auto space-y-4'>
            <h1 className='text-4xl md:text-6xl lg:text-6xl font-bold'>Neo M. Auto Repair</h1>
            <div className='w-full flex flex-col gap-2'>
                <p className='text-[10px] md:text-md lg:text-lg'> Where every fix is custom-tailored to perfection</p>
                <p className='text-sm md:text-xl lg:text-2xl w-2/3 lg:w-4/3'>We pride ourselves on being the masters of maintenance. Trust your car with the professional service that ensures excellence and reliability on every ride.</p>
            </div>

            <div className='w-1/2 flex flex-row gap-4'>
                <CustomButtonComponent
                    text='Contact Support'
                    onClick={() => handleNavigation('/contact-us')}
                    outline={true}
                    type='button'
                />

                <CustomButtonComponent
                    text='Employee Login'
                    onClick={() => handleNavigation('/login')}
                    outline={false}
                    type='button'
                />
            </div>

            <div className='grid grid-cols-3 gap-4 w-full pt-10'>
                <div className='flex flex-col justify-center h-20 px-4 items-start bg-gray-800 rounded-md hover:bg-orange-500 hover:text-white text-orange-500'>
                    <LiaBusinessTimeSolid className='text-white size-6' />
                    <p className='uppercase text-[10px] pt-2'>we are open weekdays</p>
                    <p className='uppercase text-md'>9:00 - 17:00</p>
                </div>

                <div className='flex flex-col justify-center h-20 px-4 items-start bg-gray-800 rounded-md hover:bg-orange-500 hover:text-white text-orange-500'>
                    <MdSupportAgent className='text-white size-6' />
                    <p className='uppercase text-[10px] pt-2'>call us now</p>
                    <p className='uppercase text-md'>064 847 3363</p>
                </div>

                <div className='flex flex-col justify-center h-20 px-4 items-start bg-gray-800 rounded-md hover:bg-orange-500 hover:text-white text-orange-500'>
                    <FaMapLocationDot className='text-white size-6' />
                    <p className='uppercase text-[10px] pt-2'>our address</p>
                    <p className='uppercase text-md'>Springs, GP 1559</p>
                </div>
            </div>
        </section>
    )
}

export default WelcomeBannerComponent
