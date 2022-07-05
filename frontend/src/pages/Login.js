import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            console.log('jest sukces')
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))

    }

    if (isLoading)
        return <Spinner />

    return (
        <div>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please log in to get support</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>

            </section>
        </div>
    )
}

export default Login