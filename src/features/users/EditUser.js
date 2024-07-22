import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectUserById } from './usersApiSlice'

import EditUserForm from './EditUserForm'
import LoadingContentComponent from '../../components/constant/LoadingContentComponent'

const EditUser = () => {
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id))

    const content = user ? <EditUserForm user={user} /> : <LoadingContentComponent />;

    return content
}
export default EditUser