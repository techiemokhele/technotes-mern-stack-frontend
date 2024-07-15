const CustomButtonComponent = ({ text, onClick, outline, type = "button" }) => {
    return (
        <button type={type} onClick={onClick} className={`py-2 px-4 rounded-md flex items-center justify-center text-white text-sm ${outline ? "bg-orange-500 border-none" : "bg-transparent border 2 border-orange-500"}`}>
            {text}
        </button>
    )
}

export default CustomButtonComponent
