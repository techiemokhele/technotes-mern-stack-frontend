import { useState } from 'react';

const CustomDropdownComponent = ({ label, id, name, multiple, size, value, onChange, data, className }) => {
    const [selectedOption, setSelectedOption] = useState("default");
    const [showOptions, setShowOptions] = useState(false);

    const handleClick = () => {
        setShowOptions(!showOptions);
    };

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== 'default') {
            setSelectedOption(selectedValue);
            setShowOptions(false);
        }
        onChange(e);
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="px-2" htmlFor={id}>
                {label}:
            </label>
            <select
                id={id}
                name={name}
                className={`bg-gray-800 py-2 px-3 rounded-md focus:outline-none ${showOptions ? "h-28" : "h-10"} ${className}`}
                multiple={multiple}
                size={size}
                value={selectedOption}
                onClick={handleClick}
                onChange={handleChange}
            >
                <option value="default" className='text-gray-400 text-sm'>
                    {selectedOption ? "Selected: " + selectedOption : ""}
                </option>

                {(showOptions || selectedOption === "default") && data.map((item, index) => (
                    <option key={index} value={item.value} className='pt-2'>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomDropdownComponent;
