

import DashboardActionComponent from "../../components/section/DashboardActionComponent";
import DashboardBannerComponent from "../../components/section/DashboardBannerComponent";

import { notesImage, settingImage } from "../../data/imagesData";


const WelcomePage = () => {
    return (
        <section className="welcome flex flex-col gap-2">
            <DashboardBannerComponent />

            <div className="flex flex-row w-full gap-6">
                <div className="w-1/2">
                    <DashboardActionComponent
                        title="Add note"
                        description="Jot down ideas, make to-do lists and save for later"
                        to={"/dash/notes"}
                        backgroundImage={notesImage}
                    />
                </div>

                <div className="w-1/2">
                    <DashboardActionComponent
                        title="Settings"
                        description="Change platform and user settings"
                        to={"/dash/user"}
                        backgroundImage={settingImage}
                    />
                </div>
            </div>
        </section >
    );
};

export default WelcomePage;
