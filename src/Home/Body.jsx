import React, { useState } from 'react'
import InforTotal from './InforTotal'
import BodyHeader from './BodyHeader'
import { useSelector } from 'react-redux'
import { ssDate } from '../Settings/Function'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
function Body() {
  const {t} = useTranslation("info")
  const[count,setCount]=useState(0)
  const data = useSelector((state) => state.setData.data)
  let dataComplete = data.filter(function(value,index){
    if( value.attributes.complete ){
      return value
    }
  })
let dataFail = data.filter(function(value,index){
  if( ssDate(value.attributes.date) === true && value.attributes.complete === false){
    return value
  }
})
let taskWait = data.filter(function(value,index){
  if( ssDate(value.attributes.date) === false && value.attributes.complete === false){
    return value
  }
})
  return (
    <div style={{display:"flex"}}>
       <div className='body-left' >
           <div className='body-left-search'>
            <BodyHeader setCount={setCount} count={count}></BodyHeader>
            </div>
         <div className='body-left-conten'>
          <Outlet></Outlet>
          </div>
       </div>
        <div className='info-total'>
            <InforTotal></InforTotal>
            <div style={{display:"flex",justifyContent:"space-around",padding:"5px"}}>
            <div className='box-nb' style={{background:"#ecf3ff"}}><p>{t("total")}</p><p>{data.length}</p></div>
            <div  className='box-nb' style={{background:"#ffefe2"}}><p>{t("complete")}</p> <p>{dataComplete.length}</p></div>
            <div  className='box-nb' style={{background:"#f1ecff"}}><p>{t("pending")}</p> <p>{taskWait.length}</p></div>
            <div  className='box-nb' style={{background:"#ff5555"}}><p>{t("fail")}</p> <p>{dataFail.length}</p></div>
            </div>
        </div>
    </div>
  )
}

export default Body