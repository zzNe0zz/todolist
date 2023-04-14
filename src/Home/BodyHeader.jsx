import React from 'react'
import { Button, Modal, DatePicker, TimePicker ,Alert,Space } from "antd"
import { useState, useRef } from 'react';
import instance from "../Settings/SettingApi"
import {getCookie} from "../Settings/Function"
import {  useDispatch } from 'react-redux'
import {updateCount} from "../Settings/SliceRedux"
import { useTranslation } from 'react-i18next';

function BodyHeader(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueTime, setValueTime] = useState(null);
  const [valueDate, setValueDate] = useState(null);
  const [value, setValue] = useState(null);
  const inputElement = useRef();
  const dispatch = useDispatch()
  const { t } = useTranslation("task");
  const [openAl,setOpenAl] = useState(false)
  const [textAl,setTexAl] = useState("")
  const [checkTime,setCheckTime] = useState(false)
 function closeAl(){

 }
  const onChangeTime = (time, timeString) => {
    let timeNow = new Date
    let timeVlid =  timeNow.getTime() + 3600000
    let timePick = new Date(time)
  
   if(checkTime){
    if(timePick.getTime() < timeVlid ){
      setOpenAl(true)
      setTexAl("Thời gian phải lớn hơn thời gian hiện tại 1h")
      setValue(time)
    }
    if(timePick.getTime() > timeVlid){
      setValue(time)
      setValueTime(timeString);
      console.log(5);
      setOpenAl(false)
    }
   
    }
    if(!checkTime){
      setValue(time)
      setValueTime(timeString);
     
    }
   
   }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if(inputElement.current.value!== ""){
      let data = {
        title: inputElement.current.value,
        date: `${valueDate}T${valueTime}`,
        complete: false
      }
      let token = getCookie("User")
      try {
         await instance.post("/tasks", {
        data
        },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        )
       
      } catch (error) {
      
      }
      setIsModalOpen(false);
      dispatch(updateCount())
    }
    else if(inputElement.current.value=== ""){
      setOpenAl(true)
      setTexAl("Không được để trống tên công việc")
      inputElement.current.focus()
    }
   
    
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenAl(false)
  };
  const onChangeDate = (date, dateString) => {
    let a = new Date
    let dateNow = ""
   if(a.getMonth()<10){
      if(a.getDate()<10){
        dateNow = new Date(`${a.getFullYear()}-0${a.getMonth()+1}-0${a.getDate()}`)
      }
      else if(a.getDate() > 10){
        dateNow = new Date(`${a.getFullYear()}-0${a.getMonth()+1}-${a.getDate()}`)
      }
   }
   else if(a.getMonth()>10){
      if(a.getDate()<10){
        dateNow = new Date(`${a.getFullYear()}-${a.getMonth()+1}-0${a.getDate()}`)
    }
    else if(a.getDate() > 10){
        dateNow = new Date(`${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}`)
    }
   }
    let datePick = new Date(dateString)
   
    if(dateNow.getTime() > datePick.getTime()){
      setOpenAl(true)
      setTexAl("Không được chọn ngày cũ")
    }
    else if(dateNow.getTime() === datePick.getTime()){
      setCheckTime(true)
      setValueDate(dateString)
      setOpenAl(false)
    }
    else if(dateNow.getTime() < datePick.getTime() ){
      setValueDate(dateString)
      setOpenAl(false)
      setCheckTime(false)
    }
 
   

  };
  return (
    <div className='task'>
      <div className='task-header' style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{t("task")}</h1>
        <Button type="primary" color='#744be4' onClick={showModal}>{t("creat")}</Button>
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true} closable={true}>
        <input type="text" ref={inputElement} />
        <DatePicker onChange={onChangeDate} />
        <TimePicker value={value} onChange={onChangeTime} />
      </Modal>
     {
      openAl? <div className='alert'>    
      <Alert type="error"   description ={textAl} style={{height:"35px",padding:"5px"}} showIcon onClose={closeAl}/>
      </div>:""
     }
    </div>
  )
}

export default BodyHeader