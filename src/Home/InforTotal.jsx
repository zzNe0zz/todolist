import React from 'react'
import {  Calendar,theme  } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function InforTotal() {
    const [value, setValue] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const nav=useNavigate()
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    let date = ""
    if(newValue.$M <10 ){

      if(newValue.$D<10){
         date = `${newValue.$y}-0${newValue.$M +1}-0${newValue.$D}`
      }
      if(newValue.$D>10){
         date = `${newValue.$y}-0${newValue.$M +1}-${newValue.$D}`
      }
    }
    if(newValue.$M >10){
      if(newValue.$D<10){
        date = `${newValue.$y}-${newValue.$M +1}-0${newValue.$D}`
     }
     if(newValue.$D>10){
        date = `${newValue.$y}-${newValue.$M +1}-${newValue.$D}`
     }
    }
    nav(`/home/search?date=${date}`)
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
   
  };
  return (
    <div style={wrapperStyle}>
         <Calendar fullscreen={false} onSelect={onSelect} style={{fontSize:"12px"}} />
    </div>
  )
}

export default InforTotal