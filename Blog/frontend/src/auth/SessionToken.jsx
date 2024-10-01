import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function SessionToken({ children }) {
  const user = sessionStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  return children
}

export default SessionToken