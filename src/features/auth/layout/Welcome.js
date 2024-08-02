import useAuth from '../../../hooks/useAuth'

import DashboardActionComponent from '../../../components/section/DashboardActionComponent'
import DashboardBannerComponent from '../../../components/section/DashboardBannerComponent'

import { mechanicImage, notesImage, rolesImage, settingImage, viewNotesImage } from '../../../data/imagesData'

const WelcomePage = () => {
    const { isManager, isAdmin } = useAuth()

    return (
        <section className='welcome pt-10 md:pt-0 lg:pt-0'>
            <DashboardBannerComponent />

            <div className='flex flex-row w-full gap-6'>
                <div className='w-1/2'>
                    <DashboardActionComponent
                        title='Add note'
                        description='Jot down ideas, make to-do lists'
                        to={'/dash/notes/new'}
                        backgroundImage={notesImage}
                    />
                </div>

                <div className='w-1/2'>
                    <DashboardActionComponent
                        title='View Notes'
                        description='See all of your notes'
                        to={'/dash/notes'}
                        backgroundImage={viewNotesImage}
                    />
                </div>
            </div>

            <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 w-full gap-4'>
                {(isManager || isAdmin) && <div className='w-full'>
                    <DashboardActionComponent
                        title='Create Employee'
                        description='Add a new employee'
                        to={'/dash/users/new'}
                        backgroundImage={rolesImage}
                    />
                </div>}

                {(isManager || isAdmin) && <div className='w-full'>
                    <DashboardActionComponent
                        title='Manage Employees'
                        description='See list of registered users'
                        to={'/dash/users'}
                        backgroundImage={mechanicImage}
                    />
                </div>}

                {(isManager || isAdmin) && <div className='w-full'>
                    <DashboardActionComponent
                        title='Settings'
                        description='Change platform settings'
                        to={'/dash/settings'}
                        backgroundImage={settingImage}
                    />
                </div>}
            </div>
        </section >
    )
}

export default WelcomePage
