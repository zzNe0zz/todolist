import React from 'react'
import{AppstoreAddOutlined,HomeOutlined,SettingOutlined,LogoutOutlined} from "@ant-design/icons"
import { Link ,useNavigate} from 'react-router-dom'

function Menu() {
  const nav=useNavigate()
  function SigOut(){
    document.cookie ="dataUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    document.cookie = "User=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    nav("/")
  }
  return (
    <div className='Menu'>
        <AppstoreAddOutlined style={{fontSize:"32px"}} />
        <ul>
            <Link to={"/home"}><li> <HomeOutlined   style={{fontSize:"28px"}}/></li></Link>
            <li> <SettingOutlined   style={{fontSize:"28px"}}/></li>
        </ul>
       <LogoutOutlined onClick={SigOut} style={{fontSize:"32px"}}/>
    </div>
  )
}

export default Menu