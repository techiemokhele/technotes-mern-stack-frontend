import React, { useState } from 'react'
import { FaCcMastercard } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";

import DetailsComponent from '../../../components/section/DetailsComponent';
import PaymentComponent from '../../../components/section/PaymentComponent';

const Settings = () => {
    const [details, setDetails] = useState(true);
    const [paymentDetails, setPaymentDetails] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const myDetails = () => {
        setDetails(true)
        setPaymentDetails(false)
        setIsActive(!isActive)
    }

    const myPaymentDetails = () => {
        setDetails(false)
        setPaymentDetails(true)
        setIsActive(!isActive)
    }

    return (
        <section className='flex flex-col mx-auto px-6 py-4'>
            <h1 className='text-white text-3xl'>Settings</h1>

            <div className='flex flex-row justify-center items-center gap-2 pt-6 pb-6'>
                <div onClick={myDetails} className={`${details ? " bg-orange-500" : "bg-transparent"} cursor-pointer rounded flex flex-row justify-center items-center py-2 px-4 gap-2`}>
                    <FaCcMastercard color='#fff' />
                    <p className='text-white text-xs'>Personal details</p>
                </div>

                <div onClick={myPaymentDetails} className={`${paymentDetails ? " bg-orange-500" : "bg-transparent"} cursor-pointer rounded flex flex-row justify-center items-center py-2 px-4 gap-2`}>
                    <FaUserTie />
                    <p className='text-white text-xs'>Payment Details</p>
                </div>
            </div>

            {details ? <DetailsComponent /> : <PaymentComponent />}
        </section>
    )
}

export default Settings
