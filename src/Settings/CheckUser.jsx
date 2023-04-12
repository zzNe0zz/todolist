import React, { useState,useEffect } from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { getCookie } from './Function'
import instance from './SettingApi'
function CheckUser () {
    const auth = getCookie("User")
    const [chechUs,setCheckUs] = useState(false)
  async  function check(){
        try {
        await instance.get("/users/me",
            {headers:{
                'Authorization':`Bearer ${auth}`
            }})
            setCheckUs(true)
        } catch (error) {
            setCheckUs(false)
        }
    }
 useEffect(() => {
        check()
    },[])
    
  return (
    chechUs?<Navigate to={"/home"}></Navigate>:<Outlet></Outlet>
  )
}

export default CheckUser