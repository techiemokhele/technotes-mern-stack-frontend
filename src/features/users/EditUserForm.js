import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import CustomTextInputComponent from "../../components/form/CustomTextInputComponent"
import CustomDropdownComponent from "../../components/form/CustomDropdownComponent"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
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
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => ({
        value: role,
        label: role
    }))

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    return (
        <section className="flex justify-center items-center">
            <div className="w-full max-w-2xl px-4 py-2">
                <form className="flex flex-col bg-orange-800 px-8 py-2 pb-4 rounded-lg shadow-lg" onSubmit={e => e.preventDefault()}>
                    <p className={`${errClass} text-center mb-6`}>{errContent}</p>

                    <div className="flex flex-col justify-between mb-6">
                        <div className="flex justify-end items-center gap-4 pb-4">
                            <button
                                className="z-10"
                                title="Save"
                                onClick={onSaveUserClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon className="size-8 cursor-pointer" icon={faSave} />
                            </button>

                            <button
                                className="z-10"
                                title="Delete"
                                onClick={onDeleteUserClicked}
                            >
                                <FontAwesomeIcon className="size-8 cursor-pointer" icon={faTrashCan} />
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold">Edit User</h2>
                    </div>

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

                    <CustomDropdownComponent
                        id="roles"
                        name="roles"
                        label="Assigned roles"
                        className={`${validRolesClass}`}
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