const CustomTextareaComponent = ({ label, labelInfo, placeholder, id, name, value, onChange, className, rows = 4 }) => {
    return (
        <div className='flex flex-col gap-2 relative'>
            <label className='text-md pl-2' htmlFor={id}>
                {label}: <span className='text-nowrap text-xs'>{labelInfo}</span>
            </label>
            <textarea
                className={`focus:outline-none bg-gray-800 rounded-md py-2 px-4 items-center text-xs mb-4 ${className}`}
                id={id}
                name={name}
                autoComplete='off'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
            />
        </div>
    )
}

export default CustomTextareaComponent