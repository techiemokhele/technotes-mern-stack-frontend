import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const CustomTextInputComponent = ({ label, labelInfo, placeholder, id, name, type, value, onChange, className, inputref }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col gap-2 relative">
            <label className="text-md pl-2" htmlFor={id}>
                {label}: <span className="text-nowrap text-xs">{labelInfo}</span>
            </label>
            <input
                className={`focus:outline-none bg-gray-800 rounded-md py-2 px-4 items-center text-xs mb-4 ${className}`}
                id={id}
                name={name}
                type={showPassword ? "text" : type}
                autoComplete="off"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                inputref={inputref}
            />
            {type === "password" && (
                <button
                    type="button"
                    className="absolute right-4 top-9 text-gray-400 hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
            )}
        </div>
    );
};

export default CustomTextInputComponent;