import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

import { useAddNewUserMutation } from "./usersApiSlice"
import { ROLES } from "../../config/roles"
import { USER_REGEX, PWD_REGEX } from "../../config/regex"

import CustomTextInputComponent from "../../components/form/CustomTextInputComponent"
import CustomDropdownComponent from "../../components/form/CustomDropdownComponent"

const NewUserForm = () => {
    const [addNewUser, {
        isLoading,
        isSuccess,
        error,
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])
    const [showAlert, setShowAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (!username || !password || roles.length === 0) {
            setErrorMessage('Please fill out all fields before submitting.')
            setShowAlert(true)
        } else if (canSave) {
            try {
                const result = await addNewUser({ username, password, roles }).unwrap()
                console.log('Users API Response:', result)
            } catch (err) {
                console.error('Users API Error:', err)
                if (err?.data?.message === 'Duplicate username') {
                    setErrorMessage('User already exists.')
                } else {
                    setErrorMessage(`${err.data?.message || err.message || 'Unknown error'}`)
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

    const options = Object.values(ROLES).map(role => ({
        key: role,
        value: role,
        label: role
    }))

    return (
        <section className="flex justify-center items-center">
            <div className="w-full max-w-2xl px-4 py-2">
                {showAlert && (
                    <div className={` ${errorMessage ? "border-red-400 text-red-700 bg-red-100" : "border-green-400 text-green-700 bg-green-100"}  border px-4 py-3 rounded relative mb-4`} role="alert">
                        <span className="block sm:inline">{errorMessage ? errorMessage : "Saving information..."}</span>
                    </div>
                )}

                <form className="flex flex-col bg-orange-800 py-8 px-8 rounded-lg shadow-lg" onSubmit={onSaveUserClicked}>
                    <div className="flex flex-row justify-between mb-6 z-10">
                        <h2 className="text-4xl font-bold">Add New User</h2>
                        <div className="flex items-center px-4 z-10">
                            <button
                                type="submit"
                                className="z-10 text-white"
                                title="Save"
                            >
                                <FontAwesomeIcon className="h-8 w-8 cursor-pointer" icon={faSave} />
                            </button>
                        </div>
                    </div>

                    {username && !validUsername && <p className="text-red-500 mb-2 text-xs px-2">Invalid username format.</p>}
                    <CustomTextInputComponent
                        id="username"
                        label="Username"
                        labelInfo=""
                        name="username"
                        type="text"
                        placeholder="John Smith"
                        value={username}
                        onChange={onUsernameChanged}
                        className={`mb-4 ${!validUsername && 'border-red-500'}`}
                    />

                    {!validPassword && password && <p className="text-red-500 mb-2 text-xs px-2">Password needs to be 4 - 12 characters</p>}
                    <CustomTextInputComponent
                        id="password"
                        label="Password"
                        labelInfo=""
                        name="password"
                        type="password"
                        placeholder="●●●●●●●●"
                        value={password}
                        onChange={onPasswordChanged}
                        className={`mb-4 ${!validPassword && 'border-red-500'}`}
                    />

                    {!roles.length && <p className="text-red-500 mb-2 text-xs px-2">At least one role must be selected.</p>}
                    <CustomDropdownComponent
                        id="roles"
                        name="roles"
                        label="Assigned roles"
                        className={`mb-4 ${!roles.length && 'border-red-500'}`}
                        value={roles}
                        onChange={onRolesChanged}
                        data={options}
                    />
                </form>
            </div>
        </section>
    )
}

export default NewUserForm
