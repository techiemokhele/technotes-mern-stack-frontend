

import DashboardActionComponent from "../../components/section/DashboardActionComponent";
import DashboardBannerComponent from "../../components/section/DashboardBannerComponent";

const WelcomePage = () => {
    return (
        <section className="welcome flex flex-col gap-2">
            <DashboardBannerComponent />

            <div className="flex flex-row w-full gap-6">
                <div className="w-1/2">
                    <DashboardActionComponent
                        type="view"
                        title="Add note"
                        description="Jot down ideas, make to-do lists and save for later."
                        to={"/dash/notes"}
                    />
                </div>

                <div className="w-1/2">
                    <DashboardActionComponent
                        type="settings"
                        title="Settings"
                        description="Change platform and user settings"
                        to={"/dash/user"}
                    />
                </div>
            </div>
        </section >
    );
};

export default WelcomePage;
