const CustomButtonComponent = ({ text, onClick, outline, type = "button", icon }) => {
    return (
        <button type={type} onClick={onClick} className={`py-2 px-4 rounded-md flex items-center justify-center text-white text-sm ${outline ? "bg-orange-500 border-none" : icon ? "gap-2" : "bg-transparent border 2 border-orange-500"}`}>
            {icon}{text}
        </button>
    )
}

export default CustomButtonComponent
