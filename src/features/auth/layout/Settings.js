import React, { useState } from 'react'
import { FaCcMastercard } from "react-icons/fa"
import { GiTakeMyMoney } from "react-icons/gi";

import useAuth from '../../../hooks/useAuth'
import BillingComponent from '../../../components/section/BillingComponent'
import PaymentComponent from '../../../components/section/PaymentComponent'
import { useGetUsersQuery } from '../../users/usersApiSlice'
import { useParams } from 'react-router-dom'

const Settings = () => {
    const { id } = useParams()

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })

    const { isManager, isAdmin } = useAuth()

    const [billing, setBilling] = useState(true)
    const [paymentDetails, setPaymentDetails] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const myDetails = () => {
        setBilling(true)
        setPaymentDetails(false)
        setIsActive(!isActive)
    }

    const myPaymentDetails = () => {
        setBilling(false)
        setPaymentDetails(true)
        setIsActive(!isActive)
    }

    return (
        <section className='flex flex-col mx-auto px-6 py-4'>
            <h1 className='text-white text-4xl'>Settings</h1>

            <div className='flex flex-row justify-center items-center gap-2 pt-6 pb-6'>
                <div onClick={myDetails} className={`${billing ? "bg-orange-500" : "bg-transparent"} cursor-pointer rounded flex flex-row justify-center items-center py-2 px-4 gap-2`}>
                    <GiTakeMyMoney />
                    <p className='text-white text-xs'>Plans and billing</p>
                </div>

                {isManager || isAdmin ? (
                    <div onClick={myPaymentDetails} className={`${paymentDetails ? "bg-orange-500" : "bg-transparent"} cursor-pointer rounded flex flex-row justify-center items-center py-2 px-4 gap-2`}>
                        <FaCcMastercard />
                        <p className='text-white text-xs'>Payment Details</p>
                    </div>
                ) : null}
            </div>

            {billing ? <BillingComponent /> : <PaymentComponent user={user} />}
        </section>
    )
}


export default Settings