

import DashboardActionComponent from "../../components/section/DashboardActionComponent";
import DashboardBannerComponent from "../../components/section/DashboardBannerComponent";

import { mechanicImage, notesImage, rolesImage, settingImage, viewNotesImage } from "../../data/imagesData";


const WelcomePage = () => {
    return (
        <section className="welcome pt-10 md:pt-0 lg:pt-0">
            <DashboardBannerComponent />

            <div className="flex flex-row w-full gap-6">
                <div className="w-1/2">
                    <DashboardActionComponent
                        title="Add note"
                        description="Jot down ideas, make to-do lists"
                        to={"/dash/notes"}
                        backgroundImage={notesImage}
                    />
                </div>

                <div className="w-1/2">
                    <DashboardActionComponent
                        title="View Notes"
                        description="See all of your notes"
                        to={"/dash/notes"}
                        backgroundImage={viewNotesImage}
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 w-full gap-4">
                <div className="w-full">
                    <DashboardActionComponent
                        title="Employees"
                        description="See list of registered users"
                        to={"/dash/user"}
                        backgroundImage={mechanicImage}
                    />
                </div>

                <div className="w-full">
                    <DashboardActionComponent
                        title="User Roles"
                        description="Manage all user roles"
                        to={"/dash/user"}
                        backgroundImage={rolesImage}
                    />
                </div>

                <div className="w-full">
                    <DashboardActionComponent
                        title="Settings"
                        description="Change platform settings"
                        to={"/dash/user"}
                        backgroundImage={settingImage}
                    />
                </div>
            </div>
        </section >
    );
};

export default WelcomePage;
