import React from 'react'
import "../auth.form.scss"
import "../style/button.scss"
import {useNavigate , Link} from "react-router"


const Login = () => {

    const nevigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form  onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name="email" placeholder='John@gmail.com' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name="password" placeholder='Enter Password' />
                    </div>

                    <button className='button primary-button'>Login</button>
                </form>
                <p>Don't have an Account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login