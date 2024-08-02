import { Outlet } from 'react-router-dom'

import DashHeaderComponent from './DashHeaderComponent'
import DashFooterComponent from './DashFooterComponent'

const DashLayout = () => {
    return (
        <>
            <DashHeaderComponent />
            <div className='dash-container'>
                <Outlet />
            </div>
            <DashFooterComponent />
        </>
    )
}
export default DashLayout