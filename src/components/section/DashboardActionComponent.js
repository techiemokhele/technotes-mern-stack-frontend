import { Link } from "react-router-dom";

const DashboardActionComponent = ({ title, description, to, backgroundImage }) => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`
    };

    return (

        <section
            className="card-image flex flex-col justify-end w-full h-full rounded-md py-2 px-2 cursor-pointer relative overflow-hidden group"
            style={backgroundStyle}
        >
            <Link to={`${to}`} className="block w-full pb-10 no-arrow">
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-0"></div>
                <div className="flex flex-col items-center justify-center gap-2 relative z-10 text-white transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                    <p className="text-md md:text-xl lg:text-2xl text-center font-bold">{title}</p>
                    <p className="text-[10px] md:text-sm lg:text-sm text-center">{description}</p>
                </div>
            </Link>
        </section>

    )
}

export default DashboardActionComponent