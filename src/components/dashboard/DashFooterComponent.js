import { FaUserTie } from 'react-icons/fa'
import { GrStatusGoodSmall } from 'react-icons/gr'

import useAuth from '../../hooks/useAuth'

const DashFooterComponent = () => {
    const { username, status } = useAuth()

    return (
        <footer className='flex flex-col w-full p-3 bg-gray-950'>
            <div className='flex flex-row justify-between items-center h-10 px-6'>
                <div className='w-1/2 flex flex-row items-center gap-2'>
                    <FaUserTie className='text-orange-500' />
                    <p className='text-md capitalize'>Current user: <span className='text-bold'>{username}</span></p>
                </div>
                <div className='w-1/2 flex flex-row items-center gap-2 justify-end'>
                    <GrStatusGoodSmall className='text-green-500' />
                    <p className='text-md capitalize'>User status:  <span className='text-bold'>{status}</span></p>
                </div>
            </div>
        </footer>
    )
}
export default DashFooterComponent