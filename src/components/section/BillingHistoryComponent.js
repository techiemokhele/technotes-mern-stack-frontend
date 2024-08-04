import React, { useState } from 'react'
import { IoIosCloudDownload } from 'react-icons/io'

import { billingHistoryData } from '../../data/billingPlanData'

import CustomButtonComponent from '../constant/CustomButtonComponent'
import BillingHistoryDataComponent from './BillingHistoryDataComponent'
import NoContentFoundComponent from '../constant/NoContentFoundComponent'

const BillingHistoryComponent = () => {
    const [sortedData, setSortedData] = useState(billingHistoryData)
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' })

    const handleSort = (key) => {
        let direction = 'ascending'
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }

        const sorted = [...sortedData].sort((a, b) => {
            if (key === 'price') {
                if (direction === 'ascending') {
                    return a[key] - b[key]
                } else {
                    return b[key] - a[key]
                }
            } else if (key === 'paymentDate') {
                const dateA = new Date(a[key].split('-').reverse().join('-'))
                const dateB = new Date(b[key].split('-').reverse().join('-'))
                if (direction === 'ascending') {
                    return dateA - dateB
                } else {
                    return dateB - dateA
                }
            } else if (key === 'status') {
                const statusOrder = { 'completed': 1, 'pending': 2 }
                if (direction === 'ascending') {
                    return statusOrder[a[key]] - statusOrder[b[key]]
                } else {
                    return statusOrder[b[key]] - statusOrder[a[key]]
                }
            } else {
                if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                    if (direction === 'ascending') {
                        return a[key].localeCompare(b[key])
                    } else {
                        return b[key].localeCompare(a[key])
                    }
                } else {
                    return 0
                }
            }
        })

        setSortedData(sorted)
        setSortConfig({ key, direction })
    }

    return (
        <section className='flex flex-col'>
            <div className='flex flex-row justify-between items-center pb-10 py-6'>
                <h1 className='text-white text-lg'>Billing history</h1>
            </div>

            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                        {sortedData.length > 0 ? (
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-600'>
                                    <tr>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer' onClick={() => handleSort('id')}>Invoice</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer' onClick={() => handleSort('price')}>Amount</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer' onClick={() => handleSort('paymentDate')}>Date</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer' onClick={() => handleSort('status')}>Status</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Download</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-800 divide-y divide-gray-200'>
                                    {sortedData.map(bill => (
                                        <BillingHistoryDataComponent key={bill.id} bill={bill} />
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <NoContentFoundComponent />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BillingHistoryComponent
