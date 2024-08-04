import React from 'react'
import { useLocation } from 'react-router-dom'

import { formatDate } from '../../../libs/utils'
import NoContentFoundComponent from '../../../components/constant/NoContentFoundComponent'
import { masterCard, paypal, visa } from '../../../data/imagesData'

const BillDetails = () => {
    const location = useLocation()
    const bill = location.state?.bill

    if (!bill) {
        return <NoContentFoundComponent />
    }

    const taxRate = 0.10

    const subtotal = bill.price
    const tax = subtotal * taxRate
    const total = subtotal + tax

    return (
        <main className='flex flex-col m-6'>
            <div className='flex flex-col px-6 py-4 bg-orange-800 rounded-md'>
                {/* bill header */}
                <div className='flex flex-col-reverse md:flex-row lg:flex-row'>
                    <div className='w-full md:w-1/2 lg:w-1/2 flex flex-col gap-3'>
                        <h1 className='text-white text-4xl'>Thank you for your order!</h1>
                        <p className='text-white text-sm'>
                            Thank you for your valued purchase. We sincerely appreciate your trust in our
                            products/services and are delighted to have you as our customer. Your support
                            drives our commitment to excellence.
                        </p>
                    </div>

                    <div className='w-full md:w-1/2 lg:w-1/2 pb-8 md:pb-0 lg:pb-0 flex flex-col justify-end items-end'>
                        <p className='text-sm font-extrabold'>Order #:
                            <span className="font-normal"> 000{bill.id}</span>
                        </p>
                        <p className='text-sm font-extrabold'>Status:
                            <span className="font-normal capitalize"> {bill.status}</span>
                        </p>
                        <p className='text-sm font-extrabold'>Date:
                            <span className="font-normal"> {formatDate(bill.purchaseDate, true)}</span>
                        </p>
                    </div>
                </div>

                <div className='border-b-[1px] border-gray-200 w-full my-6'></div>

                {/* bill information */}
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-col gap-1'>
                        <h4 className='text-white text-3xl'>
                            <span className='text-sm bg-gray-800 p-1 rounded-full'>x1 </span>
                            {bill.name}
                        </h4>
                        <p className='text-white text-xs'>
                            {bill.name === 'Basic Plan'
                                ? "Includes up to 10 users + 20GB data"
                                : bill.name === 'Standard Plan'
                                    ? "Includes up to 20 users + 40GB data"
                                    : "Unlimited users and unlimited data"
                            }
                        </p>
                    </div>

                    <div className='flex flex-col'>
                        <h4 className='text-white text-xl font-extrabold'>{bill.currency}{bill.price}</h4>
                    </div>
                </div>

                <div className='border-b-[1px] border-gray-200 w-full my-6'></div>

                {/* bill calculation */}
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-white text-nd'>Subtotal</p>
                        <p className='text-white text-sm'>{bill.currency}{subtotal.toFixed(2)}</p>
                    </div>

                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-white text-nd'>Tax (10%)</p>
                        <p className='text-white text-sm'>{bill.currency}{tax.toFixed(2)}</p>
                    </div>

                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-white text-nd'>Total</p>
                        <p className='text-white text-xl'>{bill.currency}{total.toFixed(2)}</p>
                    </div>
                </div>

                <div className='border-b-[1px] border-gray-200 w-full my-6'></div>

                <div className='flex flex-col bg-gray-600 rounded-md px-4 py-2 mb-4'>
                    <div className='flex flex-row justify-between items-center'>
                        <h4 className='text-white text-xl'>Payment details</h4>

                        <img
                            src={bill.paymentMethodBrand === 'Visa' ? visa : bill.paymentMethodBrand === 'MasterCard' ? masterCard : paypal}
                            alt='payment-logo'
                            className='w-20 h-14 object-contain'
                        />
                    </div>

                    <div className='flex flex-col pt-4 pb-2 gap-2'>
                        <div className='flex flex-row justify-between items-center'>
                            <p className='text-white text-sm'>Payment Number</p>
                            <p className='text-white text-sm font-extrabold'>#{bill.paymentMethodId}</p>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <p className='text-white text-sm'>Payment Date</p>
                            <p className='text-white text-sm font-extrabold'>{formatDate(bill.paymentDate, true)}</p>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <p className='text-white text-sm'>Payment Method</p>
                            <p className='text-white text-sm font-extrabold'>{bill.paymentMethodBrand}</p>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <p className='text-white text-sm'>Payment Amount</p>
                            <p className='text-white text-sm font-extrabold'>{bill.currency}{total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <p className='text-white text-sm'>
                    If you have any questions or require further assistance,
                    our dedicated support team is always here to help.  We look forward
                    to serving you again in the future.
                </p>
            </div>
        </main>
    )
}

export default BillDetails