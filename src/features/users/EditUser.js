import { useParams } from 'react-router-dom'

import { useGetUsersQuery } from './usersApiSlice'

import EditUserForm from './EditUserForm'
import LoadingContentComponent from '../../components/constant/LoadingContentComponent'

const EditUser = () => {
    const { id } = useParams()

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })

    if (!user) { <LoadingContentComponent hasNoAccess={true} /> }

    return user && <EditUserForm user={user} />
}
export default EditUser