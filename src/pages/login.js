import styles from '@/styles/Login.module.css'
import {useState} from "react";
import axios from "axios";

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [errorMessage, setErrorMessage] = useState(null)
    const onChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value)
    }

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value)
    }

    const changeStateShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage(null)
        const baseUrl = window.location.origin;
        const url = `${baseUrl}/api/login`
        const data = {
            username : username,
            password : password
        }
        await axios.post(url, data)
            .then(response => {
                location.href = "/"
            }).catch(err => {
                const {data} = err.response
                setErrorMessage(data.message)
            })
    }

    return (
        <div className={`${styles.loginWrapper} d-flex justify-content-center align-items-center`}>
            <div className="card text-center">
                <div className="card-header">
                    <h2>
                        RECRUITMENT
                    </h2>
                </div>
                <div className="card-body">
                    {
                        errorMessage &&  <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    }

                    <form onSubmit={onSubmit}>
                        <div className="row g-3 mb-3">
                        <div className='col-3 align-items-center'>
                                <label htmlFor="username" className="col-form-label">Username</label>
                            </div>
                            <div className='col-9'>
                                <input type="text" required={true} onChange={onChangeUsername} value={username} id="username" className="form-control"
                                       aria-labelledby="username"/>
                            </div>
                        </div>
                        <div className="row g-3 mb-3">
                            <div className='col-3 align-items-center'>
                                <label htmlFor="password" className="col-form-label">Password</label>
                            </div>
                            <div className='col-9'>
                                <div className="input-group mb-3">
                                    <input value={password} required={true} onChange={onChangePassword} type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Password"
                                           aria-label="password" aria-describedby="button-addon2"/>
                                        <button onClick={changeStateShowPassword} className="btn btn-outline-secondary" type="button"
                                                id="button-addon2"><i className="bi bi-eye-fill"></i>
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
