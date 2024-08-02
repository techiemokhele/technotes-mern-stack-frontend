import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useGetNotesQuery } from './notesApiSlice'

const Note = ({ noteId }) => {
    const navigate = useNavigate()

    const { note } = useGetNotesQuery('notesList', {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        })
    })

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className='hover:bg-gray-500'>
                <td className='px-6 py-4 whitespace-nowrap'>
                    {note.completed
                        ? <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>Completed</span>
                        : <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>Open</span>
                    }
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{created}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{updated}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{note.title}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{note.username}</td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <button
                        className='text-orange-500 hover:text-orange-800'
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote