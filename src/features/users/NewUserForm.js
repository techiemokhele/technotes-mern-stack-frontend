import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

import { ROLES } from "../../config/roles"

import CustomTextInputComponent from "../../components/form/CustomTextInputComponent"
import CustomDropdownComponent from "../../components/form/CustomDropdownComponent"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

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
    const [roles, setRoles] = useState(["default"])

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
            setRoles(["default"])
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
        if (values.includes("default")) {
            setRoles(["default"]);
        } else {
            setRoles(values);
        }
    }

    const canSave = [roles.length && !roles.includes("default"), validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => ({
        value: role,
        label: role
    }))

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length && !roles.includes("default")) ? 'form__input--incomplete' : ''

    return (
        <section className="flex justify-center items-center">
            <div className="w-full max-w-2xl px-4 py-2">
                <form className="flex flex-col bg-orange-800 py-8 px-8 rounded-lg shadow-lg" onSubmit={onSaveUserClicked}>
                    <p className={`${errClass} text-center mb-4`}>{error?.data?.message}</p>

                    <div className="flex flex-row justify-between mb-6">
                        <h2 className="text-4xl font-bold">Add New User</h2>
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

                    <div className="flex flex-row justify-between w-full gap-4">
                        <div className="w-1/2">
                            <CustomTextInputComponent
                                id={username}
                                label={"Username"}
                                labelInfo={""}
                                name={username}
                                type={"text"}
                                placeholder="John Smith"
                                value={username}
                                onChange={onUsernameChanged}
                                className={`${validUserClass}`}
                            />
                        </div>

                        <div className="w-1/2">
                            <CustomTextInputComponent
                                id={password}
                                label={"Password"}
                                labelInfo={""}
                                name={password}
                                type={"password"}
                                placeholder="●●●●●●●●"
                                value={password}
                                onChange={onPasswordChanged}
                                className={`${validPwdClass}`}
                            />
                        </div>
                    </div>

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
