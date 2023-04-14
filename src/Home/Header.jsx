import React from 'react'
import {SearchOutlined  } from "@ant-design/icons"
import {getCookie,deleData} from "../Settings/Function"
import { useRef } from 'react'
import {useNavigate} from "react-router-dom"
import { Space, Switch } from 'antd';
import { useTranslation } from 'react-i18next' 
import { useSelector ,useDispatch} from 'react-redux'
import {updateCount} from "../Settings/SliceRedux"
function Header() {
  let data = JSON.parse(getCookie("dataUser"))
  let valueIP = useRef()
  const nav =useNavigate()
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const dataDrag = useSelector((state)=> state.setData.dataDrap)
  function selectNN (value){
    if(value){
      i18n.changeLanguage("vn")
    }
    if(!value){
      i18n.changeLanguage("en")
    }
  }
  function search (){
    setTimeout(()=>{
      nav(`/home/search?title=${valueIP.current.value}`)
    },1000)
  }
 async function testDrag(){
    let cookies = getCookie("User")
  await deleData(dataDrag.id,cookies)
    dispatch(updateCount())
  }
  return (
    <div className='Header' onDrop={testDrag} onDragOver={(e)=> e.preventDefault()}>
        <div className='search'>
            <SearchOutlined style={{paddingTop:"2px"}}/>
            <input type="text" ref={valueIP} onChange={search} />
        </div>
        <div>
            <Space direction="vertical">
        <Switch checkedChildren="VN" unCheckedChildren="EN" defaultChecked onChange={selectNN} />      
            </Space>
        </div>
        <div className='avatar'>
                <img src="https://demoda.vn/wp-content/uploads/2022/01/avatar-den-trang-buon.jpg" alt="" />
                <span>{data.username}</span>
        </div>
    </div>
  )
}

export default Header