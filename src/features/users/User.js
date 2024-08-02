import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useGetUsersQuery } from './usersApiSlice'

const User = ({ userId }) => {
    const navigate = useNavigate()

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)
        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        return (
            <tr className={`hover:bg-gray-500 ${user.active ? '' : 'bg-gray-800'}`}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>{user.username}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-white'>{userRolesString}</td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <button
                        className='text-white hover:text-orange-500'
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null
}

const memoizedUser = memo(User)

export default memoizedUser