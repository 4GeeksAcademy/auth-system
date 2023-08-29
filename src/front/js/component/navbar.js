import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='navbar navbar-light bg-light'>
      <div className='container'>
        <Link to='/'>
          <span className='navbar-brand mb-0 h1'>React Boilerplate</span>
        </Link>
        <div className='d-flex gap-2 align-items-center flex-wrap'>
          <Link to='/login'>
            <button className='btn btn-primary'>Login</button>
          </Link>
          <Link to='/signup'>
            <button className='btn btn-primary'>Signup</button>
          </Link>
          <Link to='/private'>
            <button className='btn btn-primary'>Private</button>
          </Link>
          <Link to='/demo'>
            <button className='btn btn-primary'>
              Check the Context in action
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
