import React from 'react'
import '../style/form.scss'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <main>

        <div className='form-container'>

            <h1> Login </h1>

            <form> 
        
                <input type="text" name='username' placeholder='Enter username' />

                <input type="text" name='email' placeholder='Enter email' />

                <button type='submit'>Login</button>

            </form>

            <p>Don't have an Account? <Link to='/register'>Register</Link> </p>

        </div>

    </main>
  )
}

export default Login
