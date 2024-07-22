import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectNoteById } from './notesApiSlice';

const Note = ({ noteId }) => {
    const note = useSelector(state => selectNoteById(state, noteId));
    const navigate = useNavigate();

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
        const handleEdit = () => navigate(`/dash/notes/${noteId}`);

        console.log(note.id)

        return (
            <tr className="hover:bg-gray-500">
                <td className="px-6 py-4 whitespace-nowrap">
                    {note.completed
                        ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                        : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Open</span>
                    }
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{created}</td>
                <td className="px-6 py-4 whitespace-nowrap">{updated}</td>
                <td className="px-6 py-4 whitespace-nowrap">{note.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{note.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                        className="text-orange-500 hover:text-orange-800"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        );
    } else return null;
}

export default Note;