import { useSelector } from 'react-redux'

import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

import NoContentFoundComponent from '../../components/constant/NoContentFoundComponent'

const NewNote = () => {
    const users = useSelector(selectAllUsers)

    const content = !users?.length ? < NoContentFoundComponent /> : <NewNoteForm users={users} />;

    return content
}
export default NewNote