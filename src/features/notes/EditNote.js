import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useGetNotesQuery } from './notesApiSlice'

import EditNoteForm from './EditNoteForm'
import LoadingContentComponent from '../../components/constant/LoadingContentComponent'

const EditNote = () => {
    const { id } = useParams()
    const { username, isManager, isAdmin } = useAuth()

    const [loading, setLoading] = useState(true)
    const [hasAccess, setHasAccess] = useState(false)

    const { note } = useGetNotesQuery('notesList', {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        })
    })

    const { users } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            if (note || users?.length) {
                setHasAccess(true)
            } else if (!isManager || !isAdmin) {
                setHasAccess(false)
            } else if (note.username !== username) {
                setHasAccess(false)
            } else {
                setHasAccess(false)
            }
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [note, users, isManager, isAdmin, username])

    if (loading) {
        return <LoadingContentComponent />
    }

    if (!hasAccess) {
        return <LoadingContentComponent hasNoAccess={true} />
    }

    return <EditNoteForm note={note} users={users} />
}

export default EditNote