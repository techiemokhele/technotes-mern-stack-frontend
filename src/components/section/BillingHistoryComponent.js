import React from 'react'
import { IoIosCloudDownload } from 'react-icons/io';

import { billingHistoryData } from '../../data/billingPlanData'

import CustomButtonComponent from '../constant/CustomButtonComponent'
import BillingHistoryDataComponent from './BillingHistoryDataComponent';
import NoContentFoundComponent from '../constant/NoContentFoundComponent';

const BillingHistoryComponent = () => {
    const handleFilter = () => {
        console.log('handle filter')
    }

    const handleDownloadAll = () => {
        console.log('handle download all')
    }

    return (
        <section className='flex flex-col'>
            <div className='flex flex-row justify-between items-center pb-10 py-6'>
                <h1 className='text-white text-lg'>Billing history</h1>

                {billingHistoryData.length > 0 && (
                    <div className='flex flex-row gap-2'>
                        <CustomButtonComponent
                            text='Filter'
                            onClick={handleFilter}
                        />

                        <CustomButtonComponent
                            icon={<IoIosCloudDownload />}
                            type='button'
                            outline={true}
                            text='Download all'
                            onClick={handleDownloadAll}
                        />
                    </div>
                )}
            </div>

            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                        {billingHistoryData.length > 0 ? (
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-600'>
                                    <tr>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Invoice</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Amount</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Date</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Status</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Download</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-800 divide-y divide-gray-200'>
                                    {billingHistoryData.map(bill => (
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
