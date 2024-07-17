const CustomTextInputComponent = ({ label, labelInfo, placeholder, id, name, type, value, onChange, className }) => {
    return (
        <div>
            <label className="form__label" htmlFor={id}>
                {label}: <span className="nowrap">{labelInfo}</span></label>
            <input
                className={className}
                id={id}
                name={name}
                type={type}
                autoComplete="off"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default CustomTextInputComponent