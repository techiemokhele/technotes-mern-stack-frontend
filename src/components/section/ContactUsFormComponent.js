import React, { useState } from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

import { sendEmail } from '../../hooks/emailService'
import CustomTextInputComponent from '../form/CustomTextInputComponent'
import CustomTextAreaComponent from '../form/CustomTextAreaComponent'
import CustomButtonComponent from '../constant/CustomButtonComponent'

const ContactUsFormComponent = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const [isSending, setIsSending] = useState(false)

    const services = [
        'Website design', 'UX design', 'User research',
        'Content creation', 'Strategy & consulting',
        'System performance', 'Site optimisation', 'Other'
    ]

    const handleSubmit = async () => {
        setIsSending(true)

        const templateParams = {
            firstName,
            lastName,
            email,
            phone,
            message,
            selectedService
        }

        try {
            await sendEmail(templateParams)
            alert('Message sent successfully!')
        } catch (error) {
            alert('Failed to send the message. Please try again.')
        } finally {
            setIsSending(false)
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className='flex flex-col bg-orange-800 rounded-md p-4'>
            <div className='flex flex-row w-full gap-2 md:gap-4 lg:gap-4 justify-between items-center'>
                <div className='w-1/2'>
                    <CustomTextInputComponent
                        id='firstName'
                        name='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        label='First name'
                        type='text'
                        placeholder='John'
                        max={50}
                    />
                </div>

                <div className='w-1/2'>
                    <CustomTextInputComponent
                        id='lastName'
                        name='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        label='Last name'
                        type='text'
                        placeholder='Smith'
                        max={50}
                    />
                </div>
            </div>

            <CustomTextInputComponent
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label='Email address'
                type='email'
                placeholder='example@company.com'
                max={200}
            />

            <CustomTextInputComponent
                id='phone'
                name='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label='Phone number'
                type='tel'
                placeholder='+27123456789'
                max={20}
            />

            <CustomTextAreaComponent
                id='message'
                name='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                label='Message'
                placeholder='Leave us a message...'
                rows={5}
            />

            <div className='flex flex-col pt-2 pb-6'>
                <h2 className='text-white text-lg px-2'>Services</h2>

                <div className='w-full grid grid-cols-2 pt-2'>
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className='flex flex-row gap-2 items-center pb-2 cursor-pointer'
                            onClick={() => setSelectedService(service)}
                        >
                            {selectedService === service ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                            <p className='text-white text-xs'>{service}</p>
                        </div>
                    ))}
                </div>
            </div>

            <CustomButtonComponent
                type='submit'
                text={isSending ? 'Sending...' : 'Send message'}
                disabled={isSending}
                outline={true}
            />
        </form>
    )
}

export default ContactUsFormComponent
