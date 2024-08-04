
import { useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { FaRegCheckCircle } from 'react-icons/fa';

import { billingPlanData } from '../../data/billingPlanData';
import CustomButtonComponent from '../constant/CustomButtonComponent';

const BillingPlanComponent = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(1);

    const handleSelection = (index) => {
        setSelectedItemIndex(index);
    };

    const handleMonthly = () => {
        console.log('monthly selected')
    }

    const handleYearly = () => {
        console.log('yearly selected')
    }

    return (
        <section className='flex flex-col md:flex-row lg:flex-row gap-2'>
            {billingPlanData.map((item, i) => (
                <div
                    key={i}
                    className={`w-full md:w-1/2 lg:w-1/2 flex flex-col px-3 py-4 rounded cursor-pointer hover:bg-gray-700 ${selectedItemIndex === i ? 'bg-gray-700' : 'bg-gray-800'}`}
                    onClick={() => handleSelection(i)}
                >
                    <div className='flex flex-row justify-between items-center pb-2'>
                        <h4 className='text-md font-bold text-orange-500 uppercase'>{item.name}</h4>
                        <div className='flex'>
                            {selectedItemIndex === i ? <FaRegCheckCircle color='#f97316' /> : <FaRegCircle />}
                        </div>
                    </div>
                    <h1 className='text-white text-2xl font-extrabold'>{item.currency}{item.price}/{item.recurrence}</h1>
                    <p className='text-white text-xs'>{item.description}</p>

                    <div className='flex flex-col pt-2 pb-3'>
                        {item.benefits.map((benefit, i) => (
                            <div key={i} className='flex flex-row gap-2 py-2 items-center'>
                                <FaRegCheckCircle color='#f97316' />
                                <p className='text-white text-xs'>{benefit}</p>
                            </div>
                        ))}
                    </div>

                    {selectedItemIndex === i && (
                        <div className='flex flex-col justify-between w-full gap-3'>
                            <CustomButtonComponent
                                type='button'
                                text={`Monthly: ${item.currency}${item.price}`}
                                onClick={handleMonthly}
                                outline={true}
                            />

                            <CustomButtonComponent
                                type='button'
                                text={`Yearly: ${item.currency}${(item.price * 12 * 0.9).toFixed(2)}`}
                                onClick={handleYearly}
                                outline={true}
                            />
                        </div>
                    )}
                </div>
            ))}
        </section>
    )
}

export default BillingPlanComponent
