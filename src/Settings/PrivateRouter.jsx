import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { getCookie } from './Function'
function PrivateRouter () {
    const auth = getCookie("User")
  return (
    auth?<Outlet></Outlet>:<Navigate to={"/"}></Navigate>
  )
}

export default PrivateRouter