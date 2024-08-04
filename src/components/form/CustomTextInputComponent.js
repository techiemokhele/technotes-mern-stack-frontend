import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const CustomTextInputComponent = ({ label, labelInfo, placeholder, id, name, type, value, onChange, className, inputref, max, formatCardNumber, formatExpiryDate }) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        let inputValue = e.target.value

        if (formatCardNumber) {
            // Remove any non-digit characters
            inputValue = inputValue.replace(/\D/g, '')

            // Add spaces after every 4 digits
            inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ')

            // Limit to 19 characters (16 digits + 3 spaces)
            inputValue = inputValue.slice(0, 19)
        }

        if (formatExpiryDate) {
            inputValue = inputValue.replace(/[^\d/]/g, '')

            // Automatically insert slash after MM
            if (inputValue.length > 2 && !inputValue.includes('/')) {
                inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2)
            }

            // Limit to 7 characters (MM/YYYY)
            inputValue = inputValue.slice(0, 7)
        }


        onChange({
            ...e,
            target: {
                ...e.target,
                value: inputValue
            }
        })
    }

    return (
        <div className='flex flex-col gap-2 relative'>
            <label className='text-md pl-2' htmlFor={id}>
                {label}{label ? ":" : null} <span className='text-nowrap text-xs'>{labelInfo}</span>
            </label>
            <input
                className={`focus:outline-none bg-gray-800 rounded-md py-2 px-4 items-center text-xs mb-4 ${className}`}
                id={id}
                name={name}
                type={showPassword ? 'text' : type}
                autoComplete='off'
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                ref={inputref}
                maxLength={formatCardNumber ? 19 : max}
            />
            {type === 'password' && (
                <button
                    type='button'
                    className='absolute right-4 top-9 text-gray-400 hover:text-gray-600'
                    onClick={togglePasswordVisibility}
                >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
            )}
        </div>
    )
}

export default CustomTextInputComponent