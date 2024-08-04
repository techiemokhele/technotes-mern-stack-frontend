import { useEffect, useRef, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useRefreshMutation } from './authApiSlice'
import { selectCurrentToken } from './authSlice'
import usePersist from '../../hooks/usePersist'

import LoadingContentComponent from '../../components/constant/LoadingContentComponent'

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response = 
                    await refresh()
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }
            if (!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading')
        content = <LoadingContentComponent />

    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <div className='flex flex-col h-screen justify-center items-center mx-28'>
                <h1 className='text-white text-center text-xl'>
                    {`${error?.data?.message} - `}
                    Oops, seems like you are not authenticated to use the platform yet.
                    Please contact your administrator or rather
                </h1>
                <Link to='/login' className='text-white bg-orange-500 px-4 py-2 rounded mt-6'>Please login again</Link>
            </div>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}
export default PersistLogin