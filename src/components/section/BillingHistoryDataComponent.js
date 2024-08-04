/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { IoIosEye } from "react-icons/io";
import { FcPaid } from 'react-icons/fc'

import { formatDate } from '../../libs/utils'

const BillingHistoryDataComponent = ({ bill }) => {
    const navigate = useNavigate()

    let [loading, setLoading] = useState(true)

    const handleRowClick = () => {
        navigate('/dash/settings/bill-details', { state: { bill } })
    }

    return (
        <tr className='hover:bg-gray-500'>
            <td className='px-6 py-4 whitespace-nowrap'>{bill.name} - {formatDate(bill.purchaseDate)}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{bill.currency}{bill.price}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{bill.purchaseDate}</td>
            <td className={`px-6 py-4 whitespace-nowrap capitalize`}>
                <span className={`inline-flex px-2 py-1 rounded-full items-center gap-2 ${bill.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`}>
                    {bill.status === 'completed' ? <FcPaid /> : (
                        <ClipLoader
                            color={'#fff'}
                            loading={loading}
                            size={10}
                            aria-label='Loading Spinner'
                            data-testid='loader'
                        />
                    )}
                    {bill.status === 'completed' ? 'Paid' : bill.status}
                </span>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
                {bill.status === 'completed' ? (
                    <button onClick={handleRowClick} className='flex flex-row items-center gap-2 text-orange-500 hover:text-orange-700'>
                        <IoIosEye color='#fff' />
                        View
                    </button>
                ) : <span className='hover:text-red-500 text-gray-500'>Unavailable</span>}
            </td>
        </tr>
    )
}

export default BillingHistoryDataComponent
