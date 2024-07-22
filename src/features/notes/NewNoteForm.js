import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

import { useAddNewNoteMutation } from "./notesApiSlice"

import CustomTextInputComponent from "../../components/form/CustomTextInputComponent"
import CustomDropdownComponent from "../../components/form/CustomDropdownComponent"
import CustomTextareaComponent from "../../components/form/CustomTextAreaComponent"

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0]?.id || '')
    const [showAlert, setShowAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

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
        if (!title || !text || !userId) {
            setErrorMessage('Please fill out all fields before submitting')
            setShowAlert(true);
        }
        else if (canSave) {
            try {
                const result = await addNewNote({ user: userId, title, text })
                console.log('Notes API Response: ', result)
            } catch (error) {
                console.log('Notes API Error: ', error)
                if (error?.data?.message === "Duplicate note created") {
                    setErrorMessage('Duplicate note created')
                } else {
                    setErrorMessage(`${error?.data?.message || error.message || 'Failed to add new note'}`)
                }
                setShowAlert(true)
            }
        }
        setTimeout(() => setShowAlert(false), 3000)
    }

    useEffect(() => {
        if (error) {
            console.error('Mutation Error:', error)
        }
    }, [error])

    const options = users.map(user => ({
        key: user.id,
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

                <form className="flex flex-col bg-orange-800 py-8 px-8 rounded-lg shadow-lg" onSubmit={onSaveNoteClicked}>
                    <div className="flex flex-row justify-between mb-6">
                        <h2 className="text-4xl font-bold">Add New Note</h2>
                        <div className="flex items-center px-4">
                            <button
                                type="submit"
                                className="z-10"
                                title="Save"
                            >
                                <FontAwesomeIcon className="size-8 cursor-pointer" icon={faSave} />
                            </button>
                        </div>
                    </div>

                    {title && title.length < 2 && <p className="text-red-500 mb-2 text-xs px-2">Add more than 2 characters</p>}
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

                    {text && text.length < 2 && <p className="text-red-500 mb-2 text-xs px-2">Add more than 2 characters</p>}
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
                </form>
                <div />
            </div>
        </section>
    )
}

export default NewNoteForm