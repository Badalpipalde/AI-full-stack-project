import React from 'react'
import "../auth.form.scss"
import "../style/button.scss"
import {useNavigate , Link} from "react-router"

const Register = () => {

    const nevigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

  return (
     <main>
            <div className="form-container">
                <h1>Register</h1>
                <form  onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name="username" placeholder='Enter Username' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name="email" placeholder='John@gmail.com' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name="password" placeholder='Enter Password' />
                    </div>
                    <button className='button primary-button'>Register</button>
                </form>
                <p>Already have an Account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
  )
}

export default Register