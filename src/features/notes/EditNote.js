import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectNoteById } from './notesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'

import EditNoteForm from './EditNoteForm'
import LoadingContentComponent from '../../components/constant/LoadingContentComponent'

const EditNote = () => {
    const { id } = useParams()

    const note = useSelector(state => selectNoteById(state, id))
    const users = useSelector(selectAllUsers)

    const content = note && users ? <EditNoteForm note={note} users={users} /> : <LoadingContentComponent />;

    return content
}
export default EditNote