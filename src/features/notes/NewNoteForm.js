import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

import CustomTextInputComponent from "../../components/form/CustomTextInputComponent"
import CustomDropdownComponent from "../../components/form/CustomDropdownComponent"
import CustomTextareaComponent from "../../components/form/CustomTextAreaComponent"

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0]?.id || '')

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId(users[0].id)
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate, users])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => ({
        value: user.id,
        label: user.username
    }))

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    return (
        <section className="flex justify-center items-center">
            <div className="w-full max-w-2xl px-4 py-2">
                <form className="flex flex-col bg-orange-800 py-8 px-8 rounded-lg shadow-lg" onSubmit={onSaveNoteClicked}>
                    <p className={`${errClass} text-center mb-4`}>{error?.data?.message}</p>

                    <div className="flex flex-row justify-between mb-6">
                        <h2 className="text-4xl font-bold">Add New Note</h2>
                        <div className="flex items-center px-4">
                            <button
                                className="z-10"
                                title="Save"
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon className="size-8 cursor-pointer" icon={faSave} />
                            </button>
                        </div>
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
                </form>
                <div />
            </div>
        </section>
    )
}

export default NewNoteForm