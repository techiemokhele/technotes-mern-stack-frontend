import React from 'react'
import { IoIosCloudDownload } from 'react-icons/io';

import CustomButtonComponent from '../constant/CustomButtonComponent'
import BillingHistoryDataComponent from './BillingHistoryDataComponent';

const BillingHistoryComponent = () => {
    const handleFilter = () => {
        console.log('handle filter')
    }

    const handleDownloadAll = () => {
        console.log('handle download all')
    }

    return (
        <section className='flex flex-col'>
            <div className='flex flex-row justify-between items-center pb-4'>
                <h1 className='text-white text-lg'>Billing history</h1>

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
            </div>

            <BillingHistoryDataComponent />
        </section>
    )
}

export default BillingHistoryComponent
