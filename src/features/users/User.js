import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersApiSlice';

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId));
    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`);
        const userRolesString = user.roles.toString().replaceAll(',', ', ');

        return (
            <tr className={`hover:bg-gray-500 ${user.active ? '' : 'bg-gray-800'}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{userRolesString}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                        className="text-white hover:text-orange-500"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        );
    } else return null;
}

export default User;