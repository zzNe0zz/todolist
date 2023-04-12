import React from 'react'
import {SearchOutlined } from "@ant-design/icons"
import {getCookie} from "../Settings/Function"
import { useRef } from 'react'
import {useNavigate} from "react-router-dom"
function Header() {
  let data = JSON.parse(getCookie("dataUser"))
  let valueIP = useRef()
  const nav =useNavigate()
  function search (){
    setTimeout(()=>{
      nav(`/home/search?title=${valueIP.current.value}`)
    },1000)
  }
  return (
    <div className='Header'>
        <div className='search'>
            <SearchOutlined style={{paddingTop:"2px"}}/>
            <input type="text" ref={valueIP} onChange={search} />
        </div>
        <div className='avatar'>
                <img src="https://demoda.vn/wp-content/uploads/2022/01/avatar-den-trang-buon.jpg" alt="" />
                <span>{data.username}</span>
        </div>
    </div>
  )
}

export default Header