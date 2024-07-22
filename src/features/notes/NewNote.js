import { useSelector } from 'react-redux'

import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

import LoadingContentComponent from '../../components/constant/LoadingContentComponent'

const NewNote = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewNoteForm users={users} /> : <LoadingContentComponent />;

    return content
}
export default NewNote