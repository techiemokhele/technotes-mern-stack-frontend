import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { ROLES } from "../../config/roles"
import { USER_REGEX, PWD_REGEX } from "../../config/regex"

import CustomTextInputComponent from "../../components/form/CustomTextInputComponent"
import CustomDropdownComponent from "../../components/form/CustomDropdownComponent"

const EditUserForm = ({ user }) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)
    const [showAlert, setShowAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (!validUsername || !validPassword) {
            setErrorMessage('Please fill out all fields before submitting.')
            setShowAlert(true)
        } try {
            if (password) {
                const result = await updateUser({ id: user.id, username, password, roles, active })
                console.log("Updated user response: ", result)
            } else {
                const result = await updateUser({ id: user.id, username, roles, active })
                console.log("Updated user response: ", result)
            }
        } catch (error) {
            console.log('Users Edit API Error: ', error)
            if (error?.data?.message === 'Duplicate user') {
                setErrorMessage('User already exists.')
            } else {
                setErrorMessage(`${error.data?.message || error.message || 'Failed to update user'}`)
            }
            setShowAlert(true)
        }
        setTimeout(() => setShowAlert(false), 3000)
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
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

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    return (
        <section className="flex justify-center items-center">
            <div className="w-full max-w-2xl px-4 py-2">
                {showAlert && (
                    <div className={` ${errorMessage ? "border-red-400 text-red-700 bg-red-100" : "border-green-400 text-green-700 bg-green-100"}  border px-4 py-3 rounded relative mb-4`} role="alert">
                        <span className="block sm:inline">{errorMessage ? errorMessage : "Saving information..."}</span>
                    </div>
                )}

                <form className="flex flex-col bg-orange-800 px-8 py-2 pb-4 rounded-lg shadow-lg" onSubmit={e => e.preventDefault()}>
                    <div className="flex flex-col justify-between mb-6">
                        <div className="flex justify-end items-center gap-4 py-4">
                            <button
                                type="submit"
                                className="z-10 text-white"
                                title="Save"
                                onClick={onSaveUserClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon className="h-8 w-8 cursor-pointer" icon={faSave} />
                            </button>

                            <button
                                type="button"
                                className="z-10 text-white"
                                title="Delete"
                                onClick={onDeleteUserClicked}
                            >
                                <FontAwesomeIcon className="h-8 w-8 cursor-pointer" icon={faTrashCan} />
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold">Edit User</h2>
                    </div>

                    {!validUsername && <p className="text-red-500 mb-2 text-xs px-2">Required, no spaces & symbols</p>}
                    <CustomTextInputComponent
                        id="username"
                        label="Username"
                        labelInfo=""
                        name="username"
                        type="text"
                        placeholder="John"
                        value={username}
                        onChange={onUsernameChanged}
                    />

                    {!password.length === 0 && !validPassword && <p className="text-red-500 mb-2 text-xs px-2">Password needs to be 4 - 12 characters</p>}
                    <CustomTextInputComponent
                        id="password"
                        label="Password"
                        labelInfo=""
                        name="password"
                        type="password"
                        placeholder="●●●●●●●●"
                        value={password}
                        onChange={onPasswordChanged}
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

                    <div className="flex flex-row items-center gap-4">
                        <label className="pt-4" htmlFor="user-active">
                            Remain Active:
                        </label>
                        <input
                            className="size-4 mt-4"
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default EditUserForm
