import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdCarRepair } from 'react-icons/md'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'

import LoadingContentComponent from '../../components/constant/LoadingContentComponent'
import CustomTextInputComponent from '../../components/form/CustomTextInputComponent'
import CustomButtonComponent from '../../components/constant/CustomButtonComponent'

const Login = () => {
    const userRef = useRef(null)
    const errRef = useRef(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username || !password) {
            setErrMsg('Please fill out all fields before submitting.')
            setShowAlert(true)
        } else {
            try {
                const { accessToken } = await login({ username, password }).unwrap()
                dispatch(setCredentials({ accessToken }))
                setUsername('')
                setPassword('')
                navigate('/dash')
                setShowAlert(true)
            } catch (err) {
                if (!err.status) {
                    setErrMsg('No Server Response')
                } else if (err.status === 400) {
                    setErrMsg('Missing Username or Password')
                } else if (err.status === 401) {
                    setErrMsg('Unauthorized')
                } else {
                    setErrMsg(err.data?.message || 'An error occurred')
                }
                setShowAlert(true)
                if (errRef.current) {
                    errRef.current.focus()
                }
                setTimeout(() => setShowAlert(false), 3000)
            }
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    if (isLoading) return <LoadingContentComponent />

    return (
        <main className="flex flex-col md:flex-row lg:flex-row w-full h-screen">
            <div className="hidden md:block lg:block w-1/2">
                <img
                    src="https://images.unsplash.com/photo-1580014317999-e9f1936787a5?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="login-image"
                    className="w-full h-full object-cover"
                />
            </div>

            <form className="flex flex-col justify-center px-10 w-full h-screen md:w-1/2 lg:w-1/2 bg-orange-900">
                {showAlert && (
                    <div ref={errRef} className={` ${errMsg ? "border-red-400 text-red-700 bg-red-100" : "border-green-400 text-green-700 bg-green-100"} border px-4 py-3 rounded relative mb-8`} role="alert">
                        <span className="block sm:inline">{errMsg ? errMsg : "Signing you in..."}</span>
                    </div>
                )}

                <div className="flex flex-row gap-2 justify-center items-center">
                    <MdCarRepair size={32} className='text-orange-500' />
                    <h1 className="text-white text-3xl lg:text-4xl">Neo M. Auto Repair</h1>
                </div>

                <div className="flex flex-col pt-6 justify-center items-center">
                    <h4 className="text-white font-bold text-xl">Sign In to your account</h4>
                    <p className="text-xs text-white">Enter your details to proceed further</p>
                </div>

                <div className="flex flex-col pt-6">
                    <div className="flex flex-col w-full pb-6">
                        <CustomTextInputComponent
                            id="username"
                            label={"Username"}
                            labelInfo={""}
                            name="username"
                            type="text"
                            placeholder="John"
                            value={username}
                            onChange={handleUserInput}
                            inputref={userRef}
                        />

                        <CustomTextInputComponent
                            id="password"
                            label={"Password"}
                            labelInfo={""}
                            name="password"
                            type="password"
                            placeholder="●●●●●●●●"
                            value={password}
                            onChange={handlePwdInput}
                        />

                        <label htmlFor="persist" className="px-2 flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                id="persist"
                                checked={persist}
                                onChange={handleToggle}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            Trust this device?
                        </label>
                    </div>

                    <CustomButtonComponent
                        type="submit"
                        text="Sign In"
                        onClick={handleSubmit}
                        outline={true}
                    />
                </div>
            </form>
        </main>
    )
}

export default Login
