import React from 'react'
import { Button, Modal, DatePicker, TimePicker } from "antd"
import { useState, useRef } from 'react';
import instance from "../Settings/SettingApi"
import {getCookie} from "../Settings/Function"
import {  useDispatch } from 'react-redux'
import {updateCount} from "../Settings/SliceRedux"
function BodyHeader(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueTime, setValueTime] = useState(null);
  const [valueDate, setValueDate] = useState(null);
  const [value, setValue] = useState(null);
  const inputElement = useRef();
  const dispatch = useDispatch()
  const onChangeTime = (time, timeString) => {
    setValue(time)
    setValueTime(timeString);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    let data = {
      title: inputElement.current.value,
      date: `${valueDate}T${valueTime}`,
      complete: false
    }
    let token = getCookie("User")
    console.log(token);
    try {
      let a = await instance.post("/tasks", {
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
    dispatch(updateCount())
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChangeDate = (date, dateString) => {
    setValueDate(dateString)

  };
  return (
    <div className='task'>
      <div className='task-header' style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Task</h1>
        <Button type="primary" color='#744be4' onClick={showModal}>Creat Task</Button>
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true} closable={true}>
        <input type="text" ref={inputElement} />
        <DatePicker onChange={onChangeDate} />
        <TimePicker value={value} onChange={onChangeTime} />
      </Modal>
    </div>
  )
}

export default BodyHeader