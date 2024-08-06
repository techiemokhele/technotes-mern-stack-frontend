import React from 'react'
import { IoLogoWhatsapp } from 'react-icons/io'
import { MdAttachEmail } from 'react-icons/md'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaPhoneVolume } from 'react-icons/fa'
import { FaMapLocationDot } from 'react-icons/fa6'

import ContactUsFormComponent from '../../../components/section/ContactUsFormComponent'

const ContactUs = () => {
    return (
        <main className='flex flex-col mx-auto container py-6'>
            <div className='flex flex-col justify-center items-center pb-6'>
                <h1 className='text-white text-4xl'>Contact our team</h1>

                <div className='flex flex-col leading-none justify-center items-center py-6'>
                    <p className='text-white text-xs text-center'>Got any question about the product? We're here to help.</p>
                    <p className='text-white text-xs text-center'>Chat to our friendly team on weekdays from 8am to 5pm and response in less than an hour.</p>
                </div>
            </div>

            <div className='w-full flex flex-col-reverse md:flex-row lg:flex-row gap-0 md:gap-6 lg:gap-6'>
                {/* contact form */}
                <div className='w-full md:w-1/2 lg:w-1/2 px-10'>
                    <ContactUsFormComponent />
                </div>

                {/* contact details */}
                <div className='hidden md:block lg:block w-full md:w-2/6 lg:w-2/6 flex-col gap-4'>
                    <div className='w-full flex flex-col'>
                        <h4 className='text-white text-xl'>Chat with us</h4>
                        <p className='text-white text-xs pb-4'>Speak to our friendly team via live chat.</p>

                        <div className='flex flex-col gap-3'>
                            <a href="mailto:neomokhele23@gmail.com" className='flex flex-row gap-2 items-center cursor-pointer'>
                                <MdAttachEmail />
                                <p className='text-white text-[10px] underline'>Shoot us an email</p>
                            </a>

                            <a
                                href="https://wa.me/+27648473363?text=I'm%20interested%20in%20talking%20to%20you%20about%20Neo%20M%20Auto%20Repairs%20Website"
                                className='flex flex-row gap-2 items-center'
                            >
                                <IoLogoWhatsapp />
                                <p className='text-white text-[10px] underline'>Start a chat on WhatsApp</p>
                            </a>

                            <div className='flex flex-row gap-2 items-center'>
                                <FaFacebookSquare />
                                <p className='text-white text-[10px] underline'>Message us on Facebook</p>
                            </div>

                            <div className='flex flex-row gap-2 items-center'>
                                <FaSquareXTwitter />
                                <p className='text-white text-[10px] underline'>Message us on X</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col pt-4'>
                        <h4 className='text-white text-xl'>Call us</h4>
                        <p className='text-white text-xs pb-4'>Call our team weekdays from 8am to 5pm.</p>

                        <div className='flex flex-col gap-3'>
                            <a href="tel:+27648473363" className='flex flex-row gap-2 items-center cursor-pointer'>
                                <FaPhoneVolume />
                                <p className='text-white text-[10px] underline'>+27 64 847 3363</p>
                            </a>
                        </div>
                    </div>

                    <div className='w-full flex flex-col pt-4'>
                        <h4 className='text-white text-xl'>Visit us</h4>
                        <p className='text-white text-xs pb-4'>Chat to us in person at our Gauteng HQ.</p>

                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-row gap-2 items-center cursor-pointer'>
                                <FaMapLocationDot />
                                <p className='text-white text-[10px] underline'>Springs, Gauteng, South Africa 1559</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ContactUs
