import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import CustomTextInputComponent from "../../components/form/CustomTextInputComponent"
import CustomTextareaComponent from "../../components/form/CustomTextAreaComponent"
import CustomDropdownComponent from "../../components/form/CustomDropdownComponent"

const EditNoteForm = ({ note, users }) => {
    const [updateNote, {
        isLoading,
        isSuccess,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)
    const [showAlert, setShowAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (!title || !text) {
            setErrorMessage('Please fill out all fields before submitting.')
            setShowAlert(true)
        } else if (canSave) {
            try {
                const result = await updateNote({ id: note.id, user: userId, title, text, completed })
                console.log("Updated note response: ", result)
            } catch (error) {
                console.log('Notes Edit API Error: ', error)
                if (error?.data?.message === 'Duplicate note') {
                    setErrorMessage('Note already exists.')
                } else {
                    setErrorMessage(`${error.data?.message || error.message || 'Failed to update note'}`)
                }
                setShowAlert(true)
            }
        }
        setTimeout(() => setShowAlert(false), 3000)
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    useEffect(() => {
        if (error) {
            console.error('Mutation Error:', error)
        }
    }, [error])

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => ({
        value: user.id,
        label: user.username
    }))


    return (
        <section className="flex justify-center items-center">
            <div className="w-full max-w-2xl px-4 py-2">
                {showAlert && (
                    <div className={` ${errorMessage ? "border-red-400 text-red-700 bg-red-100" : "border-green-400 text-green-700 bg-green-100"}  border px-4 py-3 rounded relative mb-4`} role="alert">
                        <span className="block sm:inline">{errorMessage ? errorMessage : "Saving information..."}</span>
                    </div>
                )}
                <form className="flex flex-col bg-orange-800 py-2 pb-4 px-8 rounded-lg shadow-lg" onSubmit={e => e.preventDefault()}>
                    <div className="flex flex-col justify-between mb-6">
                        <div className="flex justify-end items-center gap-4 pb-4">
                            <button
                                className="z-10"
                                title="Save"
                                onClick={onSaveNoteClicked}
                            >
                                <FontAwesomeIcon className="size-8 cursor-pointer" icon={faSave} />
                            </button>

                            <button
                                className="z-10"
                                title="Delete"
                                onClick={onDeleteNoteClicked}
                            >
                                <FontAwesomeIcon className="size-8 cursor-pointer" icon={faTrashCan} />
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold">Edit Note:<br /> {note.title}</h2>
                    </div>

                    {title.length < 2 && <p className="text-red-500 mb-2 text-xs px-2">Add more than 2 characters</p>}
                    <CustomTextInputComponent
                        id={title}
                        label={"Title"}
                        labelInfo={""}
                        name={title}
                        type={"text"}
                        placeholder="Fix invoice for December 2024"
                        value={title}
                        onChange={onTitleChanged}
                    />

                    {text.length < 2 && <p className="text-red-500 mb-2 text-xs px-2">Add more than 2 characters</p>}
                    <CustomTextareaComponent
                        id={text}
                        label={"Note description"}
                        labelInfo={""}
                        name={text}
                        type={"text"}
                        placeholder="Write something about the note..."
                        value={text}
                        onChange={onTextChanged}
                        rows={4}
                    />

                    <CustomDropdownComponent
                        id="username"
                        name="username"
                        label="Assign to"
                        value={userId}
                        onChange={onUserIdChanged}
                        data={options}
                    />

                    <div className="flex flex-row items-center gap-4">
                        <label className="pt-4" htmlFor="user-active">
                            Is the work completed:
                        </label>
                        <input
                            className="size-4 mt-4"
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            checked={completed}
                            onChange={onCompletedChanged}
                        />
                    </div>

                    <div className="flex flex-row justify-between w-full pt-4 gap-4">
                        <div className="w-1/2 flex flex-col justify-center items-center gap-2 bg-gray-800 p-2 rounded-md">
                            <p className="text-xs">Created:<br />{created}</p>
                        </div>

                        <div className="w-1/2 flex flex-col justify-center items-center gap-2 bg-gray-800 p-2 rounded-md">
                            <p className="text-xs">Last Updated:<br />{updated}</p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default EditNoteForm