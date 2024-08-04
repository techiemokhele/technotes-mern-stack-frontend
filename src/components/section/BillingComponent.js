import React from 'react'
import { GiTakeMyMoney } from "react-icons/gi";
import BillingPlanComponent from './BillingPlanComponent'

const BillingComponent = () => {
    return (
        <section className='flex flex-col bg-orange-800 py-6 px-4 rounded'>
            <div className='flex flex-row gap-2'>
                <GiTakeMyMoney size={30} />
                <h1 className='text-white text-2xl flex flex-row'>Plans and billing</h1>
            </div>
            <p className='text-white text-xs'>Manage your plan and billing details.</p>

            <div className='border-b-[1px] border-gray-200 w-full my-4'></div>

            <BillingPlanComponent />
        </section>
    )
}

export default BillingComponent
