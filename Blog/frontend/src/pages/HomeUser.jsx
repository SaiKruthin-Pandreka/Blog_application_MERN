import React from 'react'
import NavUser from './NavUser'
import Blogs from './Blogs'
import SessionToken from '../auth/SessionToken.jsx'

function HomeUser() {
  return (
    <SessionToken>
      <div>
        <NavUser />
        <Blogs/>
      </div>
    </SessionToken>
  )
}

export default HomeUser