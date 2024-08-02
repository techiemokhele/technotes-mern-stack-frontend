import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomTextInputComponent from '../form/CustomTextInputComponent'
import CustomButtonComponent from '../constant/CustomButtonComponent'
import { CARDCVV_REGEX, CARDEXP_REGEX, CARDNAME_REGEX, CARDNO_REGEX, CITY_REGEX, CODE_REGEX, COUNTRY_REGEX, EMAIL_REGEX, PROVINCE_REGEX, STRADD_REGEX } from '../../config/regex'

const PaymentFormComponent = () => {
    const navigate = useNavigate()

    const [cardName, setCardName] = useState('')
    const [cardExp, setCardExp] = useState('')
    const [cardNo, setCardNo] = useState('')
    const [cardCvv, setCardCvv] = useState('')
    const [email, setEmail] = useState('')
    const [strAdd, setStrAdd] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [code, setCode] = useState('')
    const [country, setCountry] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'))
            setEmail(user.email)
            setStrAdd(user.address)
            setCity(user.city)
            setProvince(user.province)
            setCode(user.code)
            setCountry(user.country)
            setCardName(user.cardName)
            setCardExp(user.cardExp)
            setCardNo(user.cardNo)
            setCardCvv(user.cardCvv)
        }
    }, [])

    const handleCancel = () => {
        navigate(-1)
    }

    const validateForm = () => {
        const cardNameRegex = CARDNAME_REGEX
        const cardExpRegex = CARDEXP_REGEX
        const cardNoRegex = CARDNO_REGEX
        const cvvRegex = CARDCVV_REGEX
        const emailRegex = EMAIL_REGEX
        const addressRegex = STRADD_REGEX
        const cityRegex = CITY_REGEX
        const provinceRegex = PROVINCE_REGEX
        const codeRegex = CODE_REGEX
        const countryRegex = COUNTRY_REGEX

        if (!cardNameRegex.test(cardName)) {
            setAlertMessage('Invalid card name')
            setAlertType('error')
            return false
        } else if (!cardExpRegex.test(cardExp)) {
            setAlertMessage('Invalid card expiration date')
            setAlertType('error')
            return false
        } else if (!cardNoRegex.test(cardNo.replace(/\s+/g, ''))) {
            setAlertMessage('Invalid card number')
            setAlertType('error')
            return false
        }
        else if (!cvvRegex.test(cardCvv)) {
            setAlertMessage('Invalid card cvv')
            setAlertType('error')
            return false
        } else if (!emailRegex.test(email)) {
            setAlertMessage('Invalid email address')
            setAlertType('error')
            return false
        } else if (!addressRegex.test(strAdd)) {
            setAlertMessage('Invalid street address')
            setAlertType('error')
            return false
        } else if (!cityRegex.test(city)) {
            setAlertMessage('Invalid city name')
            setAlertType('error')
            return false
        } else if (!provinceRegex.test(province)) {
            setAlertMessage('Invalid province')
            setAlertType('error')
            return false
        } else if (!codeRegex.test(code)) {
            setAlertMessage('Invalid postal code')
            setAlertType('error')
            return false
        } else if (!countryRegex.test(country)) {
            setAlertMessage('Invalid country')
            setAlertType('error')
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            setIsLoading(true)
            setAlertMessage('Saving payment details...')
            setAlertType('info')

            const userData = {
                cardName, cardExp, cardNo, cardCvv, email, address: strAdd, city, province, code, country
            }
            localStorage.setItem('user', JSON.stringify(userData))

            setTimeout(() => {
                setIsLoading(false)
                setAlertMessage('Details saved successful!')
                setAlertType('success')

                setTimeout(() => {
                    navigate('/dash')
                }, 2500)
            }, 2500)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='border-b-[1px] border-gray-200 w-full my-4'></div>

                {/* Card details */}
                <div className='flex flex-col md:flex-row lg:flex-row w-full'>
                    <div className='flex flex-col w-full md:w-1/2 lg:w-1/2'>
                        <p className='text-white text-lg'>Card details</p>
                    </div>

                    <div className='flex flex-col w-full pt-6 md:pt-0 lg:pt-0'>
                        <div className='flex flex-row w-full gap-4'>
                            <div className='w-full'>
                                <CustomTextInputComponent
                                    label='Name of card'
                                    type='text'
                                    placeholder='Enter card name'
                                    value={cardName}
                                    name='cardName'
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                            </div>
                            <div className='w-1/4'>
                                <CustomTextInputComponent
                                    label='Expiry'
                                    type='text'
                                    placeholder='06/2024'
                                    value={cardExp}
                                    name='cardExp'
                                    onChange={(e) => setCardExp(e.target.value)}
                                    max={7}
                                    formatExpiryDate={true}
                                />
                            </div>
                        </div>

                        <div className='flex flex-row w-full gap-4'>
                            <div className='w-full'>
                                <CustomTextInputComponent
                                    label='Card number'
                                    type='tel'
                                    placeholder='5105 1051 0510 5100'
                                    value={cardNo}
                                    name='cardNo'
                                    onChange={(e) => setCardNo(e.target.value)}
                                    formatCardNumber={true}
                                />
                            </div>
                            <div className='w-1/4'>
                                <CustomTextInputComponent
                                    label='CVV'
                                    type='tel'
                                    placeholder='●●●'
                                    value={cardCvv}
                                    name='cardCvv'
                                    onChange={(e) => setCardCvv(e.target.value)}
                                    max={3}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='border-b-[1px] border-gray-200 w-full my-4'></div>

                {/* Email */}
                <div className='flex flex-col md:flex-row lg:flex-row w-full'>
                    <div className='flex flex-col w-full md:w-1/2 lg:w-1/2'>
                        <p className='text-white text-lg'>Email address</p>
                        <p className='text-white text-xs'>Invoice will be sent to this email address.</p>
                    </div>

                    <div className='flex flex-col w-full pt-6 md:pt-0 lg:pt-0'>
                        <div className='flex flex-row w-full gap-4'>
                            <div className='w-full'>
                                <CustomTextInputComponent
                                    label=''
                                    type='email'
                                    placeholder='example@company.com'
                                    value={email}
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='border-b-[1px] border-gray-200 w-full my-4'></div>

                {/* Street */}
                <div className='flex flex-col md:flex-row lg:flex-row w-full'>
                    <div className='flex flex-col w-full md:w-1/2 lg:w-1/2'>
                        <p className='text-white text-lg'>Physical address</p>
                    </div>

                    <div className='flex flex-col w-full pt-6 md:pt-0 lg:pt-0'>
                        <div className='flex flex-row w-full gap-4'>
                            <div className='w-1/2'>
                                <CustomTextInputComponent
                                    label='Street address'
                                    type='text'
                                    placeholder='100 Smith Street'
                                    value={strAdd}
                                    name='strAdd'
                                    onChange={(e) => setStrAdd(e.target.value)}
                                />
                            </div>

                            <div className='w-1/2'>
                                <CustomTextInputComponent
                                    label='City'
                                    type='text'
                                    placeholder='Johannesburg'
                                    value={city}
                                    name='city'
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='flex flex-row w-full gap-4'>
                            <div className='w-full'>
                                <CustomTextInputComponent
                                    label='State/Province'
                                    type='text'
                                    placeholder='Gauteng'
                                    value={province}
                                    name='province'
                                    onChange={(e) => setProvince(e.target.value)}
                                />
                            </div>

                            <div className='w-1/4'>
                                <CustomTextInputComponent
                                    label='Code'
                                    type='tel'
                                    placeholder='1559'
                                    value={code}
                                    name='code'
                                    onChange={(e) => setCode(e.target.value)}
                                    max={5}
                                />
                            </div>
                        </div>

                        <div className='flex flex-row w-full gap-4'>
                            <div className='w-full'>
                                <CustomTextInputComponent
                                    label='Country'
                                    type='text'
                                    placeholder='South Africa'
                                    value={country}
                                    name='country'
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {alertMessage && (
                    <div className={`p-4 text-sm rounded-lg mt-4 ${alertType === 'error' ? 'bg-red-100 text-red-700' :
                        alertType === 'success' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                        }`} role="alert">
                        {alertMessage}
                    </div>
                )}

                <div className='flex flex-row gap-4 justify-end items-end mt-4'>
                    <CustomButtonComponent
                        text='Cancel'
                        outline={false}
                        onClick={handleCancel}
                        type='button'
                    />

                    <CustomButtonComponent
                        text={isLoading ? 'Processing...' : 'Save'}
                        outline={true}
                        onClick={() => { }}
                        type='submit'
                        disabled={isLoading}
                    />
                </div>
            </form>
        </>
    )
}

export default PaymentFormComponent