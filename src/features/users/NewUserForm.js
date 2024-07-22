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
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

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
        if (canSave) {
            await addNewUser({ username, password, roles });
        }
    }

    const options = Object.values(ROLES).map(role => ({
        key: role,
        value: role,
        label: role
    }))

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length && !roles.includes("Employee")) ? 'form__input--incomplete' : ''

    return (
        <section className="flex justify-center items-center">
            <div className="w-full max-w-2xl px-4 py-2">
                <form className="flex flex-col bg-orange-800 py-8 px-8 rounded-lg shadow-lg" onSubmit={onSaveUserClicked}>
                    <p className={`${errClass} text-center mb-4`}>{error ? error.data?.message : ''}</p>

                    <div className="flex flex-row justify-between mb-6 z-10">
                        <h2 className="text-4xl font-bold">Add New User</h2>
                        <div className="flex items-center px-4 z-10">
                            <button
                                type="submit"
                                className="z-10"
                                title="Save"
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon className="size-8 cursor-pointer" icon={faSave} />
                            </button>
                        </div>
                    </div>

                    <CustomTextInputComponent
                        id="username"
                        label="Username"
                        labelInfo={""}
                        name="username"
                        type={"text"}
                        placeholder="John Smith"
                        value={username}
                        onChange={onUsernameChanged}
                        className={`${validUserClass}`}
                    />

                    <CustomTextInputComponent
                        id="password"
                        label="Password"
                        labelInfo={""}
                        name="password"
                        type={"password"}
                        placeholder="●●●●●●●●"
                        value={password}
                        onChange={onPasswordChanged}
                        className={`${validPwdClass}`}
                    />

                    <CustomDropdownComponent
                        id="roles"
                        name="roles"
                        label="Assigned roles"
                        className={`${validRolesClass}`}
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
