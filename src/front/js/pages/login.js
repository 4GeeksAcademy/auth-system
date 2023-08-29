import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { store, actions } = useContext(Context)

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    actions
      .login(email, password)
      .then((res) => navigate('/private'))
      .catch((err) => console.log(err))
  }

  return (
    <div className='container'>
      <h1 className='text-center my-4'>Login</h1>

      <form
        className='mx-auto'
        style={{ maxWidth: '800px' }}
        onSubmit={handleLogin}
      >
        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='floatingInput'
            placeholder='name@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='floatingInput'>Email address</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
        </div>

        <button type='submit' className='btn btn-primary'>
          Log in
        </button>
      </form>
    </div>
  )
}

export default Login
