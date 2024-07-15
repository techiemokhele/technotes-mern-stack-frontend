import { Link } from "react-router-dom";

const DashboardActionComponent = ({ title, description, type, to }) => {
    return (
        <section className={`w-full rounded-md py-2 px-4 ${type === "view" ? "bg-green-500" : "bg-orange-500"}`}>
            <Link to={`${to}`}>
                <div className="flex flex-col">
                    <p className="text-3xl">{title}</p>
                    <p className="text-sm">{description}</p>
                </div>
            </Link>
        </section>
    )
}

export default DashboardActionComponent