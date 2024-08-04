import { useGetUsersQuery } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

import NoContentFoundComponent from '../../components/constant/NoContentFoundComponent'

const NewNote = () => {
    const { users } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    const content = !users?.length ? < NoContentFoundComponent /> : <NewNoteForm users={users} />

    return content
}
export default NewNote