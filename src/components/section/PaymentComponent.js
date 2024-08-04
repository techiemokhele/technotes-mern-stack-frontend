import React from 'react'
import { FaCcMastercard } from "react-icons/fa";

import PaymentFormComponent from './PaymentFormComponent'

const PaymentComponent = () => {
    return (
        <section className='flex flex-col bg-orange-800 py-6 px-4 rounded'>
            <div className='flex flex-row gap-2'>
                <FaCcMastercard size={30} />
                <h1 className='text-white text-2xl flex flex-row'>Payment Method</h1>
            </div>
            <p className='text-white text-xs'>Update your billing details and address.</p>

            <PaymentFormComponent />
        </section>
    )
}

export default PaymentComponent
