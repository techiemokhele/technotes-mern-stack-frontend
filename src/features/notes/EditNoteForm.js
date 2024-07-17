import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import CustomTextInputComponent from "../../components/form/CustomTextInputComponent"
import CustomTextareaComponent from "../../components/form/CustomTextAreaComponent"
import CustomDropdownComponent from "../../components/form/CustomDropdownComponent"

const EditNoteForm = ({ note, users }) => {

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

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
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => ({
        value: user.id,
        label: user.username
    }))


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    return (
        <section className="flex justify-center items-center">
            <div className="w-full max-w-2xl px-4 py-2">
                <form className="flex flex-col bg-orange-800 py-2 pb-4 px-8 rounded-lg shadow-lg" onSubmit={e => e.preventDefault()}>
                    <p className={`${errClass} text-center mb-6`}>{errContent}</p>

                    <div className="flex flex-col justify-between mb-6">
                        <div className="flex justify-end items-center gap-4 pb-4">
                            <button
                                className="z-10"
                                title="Save"
                                onClick={onSaveNoteClicked}
                                disabled={!canSave}
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

                    <CustomTextInputComponent
                        id={title}
                        label={"Title"}
                        labelInfo={""}
                        name={title}
                        type={"text"}
                        placeholder="Fix invoice for December 2024"
                        value={title}
                        onChange={onTitleChanged}
                        className={`${validTitleClass}`}
                    />

                    <CustomTextareaComponent
                        id={text}
                        label={"Note description"}
                        labelInfo={""}
                        name={text}
                        type={"text"}
                        placeholder="Write something about the note..."
                        value={text}
                        onChange={onTextChanged}
                        className={`${validTextClass}`}
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