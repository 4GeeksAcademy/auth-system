import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

const Private = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    actions.loadUser().catch((err) => {
      if (err.httpStatus === 401) return navigate('/login')
    })
  }, [])

  return (
    <div className='container'>
      <h1 className='text-center my-4'>Private</h1>
      {store.user !== null && (
        <h2 className='text-center my-4'>Welcome {store.user.email}</h2>
      )}
      {store.user === null && <h2 className='text-center my-4'>Loading...</h2>}
      <button
        className='btn btn-primary'
        onClick={() => {
          actions.logout()
          navigate('/')
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default Private
