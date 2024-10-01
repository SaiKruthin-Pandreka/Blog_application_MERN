import React, { useState, useEffect } from 'react'
import * as jwt_decode from 'jwt-decode'

function Profile() {
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const tk = sessionStorage.getItem('token')
    const decodedUser = jwt_decode.jwtDecode(tk)
    setUser(decodedUser)
  }, [])

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Profile</h1>
      <p className="mb-4">Name: {user.name}</p>
      <p className="mb-4">Email: {user.email}</p>
    </div>
  )
}

export default Profile