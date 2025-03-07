import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const { store, actions } = useContext(Context)

  const navigate = useNavigate()

  const passwordMatch = password && password2 && password !== password2

  const handleSignup = (e) => {
    e.preventDefault()
    actions
      .signup(email, password)
      .then((res) => navigate('/login'))
      .catch((err) => console.log(err))
  }

  return (
    <div className='container'>
      <h1 className='text-center my-4'>Signup</h1>

      <form
        className='mx-auto'
        style={{ maxWidth: '800px' }}
        onSubmit={handleSignup}
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

        <div className='form-floating mb-3'>
          <input
            type='password'
            className='form-control'
            id='password2'
            placeholder='Password2'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <label htmlFor='password'>Confirm password</label>
        </div>

        {passwordMatch && (
          <div className='alert alert-danger' role='alert'>
            Both passwords must be the same
          </div>
        )}

        <button type='submit' className='btn btn-primary'>
          Signup
        </button>
      </form>
    </div>
  )
}

export default Signup
