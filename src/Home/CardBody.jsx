import React, { useState,useRef } from 'react'
import { Card, Button,Space,Pagination ,Modal,Popconfirm } from 'antd';
import {EditOutlined } from "@ant-design/icons"
import instance from "../Settings/SettingApi"
import { useEffect } from 'react';
import {useLocation  ,useNavigate} from "react-router-dom";
import {ssDate} from "../Settings/Function"
import {  useDispatch,useSelector } from 'react-redux'
import { updateData ,dataDrap} from '../Settings/SliceRedux'
import {getCookie,fixData,deleData,} from "../Settings/Function"
import { useTranslation } from 'react-i18next';
function CardBody() {
    const {t} = useTranslation("card")
    const [dataMap,setDataMap]=useState([])
    const [data,setData] =useState([])
    let   nav = useNavigate()
    let  userId  = useLocation();
    const inputElement = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataIP,setDataIP] = useState({})
    const dateTime = useRef()
    let [count,setCount]=useState(0)
    const dispatch = useDispatch()
    const token = getCookie("User")
    const coutData = useSelector((state)=>state.setData.count)
  async  function getAllTask(){
        try {
            let data = await instance.get("/tasks?pagination[page]=1&pagination[pageSize]=100")
            setData(data.data.data)
           
            if (userId.search) {
                let a=userId.search.slice(1).split("&")
                let page= a[0].slice(a[0].length-1)
                let pageSize = a[1].slice(a[1].length-1)
                let start = (page-1)*pageSize
                let end =   pageSize*page
                let fnData = data.data.data.reverse()
                setDataMap(fnData.slice(start,end))   
            }
            else if(!userId.search){
              let rv = data.data.data.reverse()
                setDataMap(rv.slice(0,4))
            
            }
            dispatch(updateData(data.data.data))
        } catch (error) {
            
        }
    }

    function Pag(page,pageSize){
        let start = (page-1)*pageSize
        let end =   pageSize*page
      setDataMap(data.slice(start,end));
      nav(`/home?pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
    }
 function showModal (){
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 async function success (value){
      let data = {
        complete : true
      }
    await fixData(data,value.id,token)
      setCount(count+1)

  }
  const handleOk = async ()=>{
    let data = {
      title:inputElement.current.value ,
      date: dateTime.current.value,
      complete: false
    }
   
   await fixData(data,dataIP.id,token)
    setIsModalOpen(false);
    setCount(count+1)
   
  }

  const confirm = async () => {
    
 await deleData(dataIP.id,token)
      setCount(count+1)
  };

    useEffect(() => {
        getAllTask()
    }, [coutData,count])

  return (
    <div style={{position:"relative"}} >
           <div className='card-body'>
           {
                dataMap.map(function(value,index){
                    return(
                        <div key={value.id}  onClick={()=>{setDataIP(value)}} onDragStart={()=>{dispatch(dataDrap(value));}}  className='card-body-item'>
        <Space direction="vertical" size={12}>
 
        <Card 
      size="small"
      title={value.attributes.title}
      extra={<Button ><EditOutlined onClick={showModal}/></Button>}
      style={{
        width: 300,
        border:"1px solid black",
      
      }}
      >
      <p>{t("date")} : {value.attributes.date?value.attributes.date.split("T")[0]:"Null"}</p>
      <p>{t("time")} : {value.attributes.date?value.attributes.date.split("T")[1].slice(0,8):"Null"} </p>
          <div style={{display:"flex",justifyContent:"space-around"}}>
              <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
          >
            <Button type="link" danger  style={{border:"1px solid #ff4d4f"}}>{t("delete")}</Button>
          </Popconfirm>

        <Button  onClick={()=>{success(value)}} type="text" style={{color:"#95e077",border:"1px solid #95e077"}} ><span >{t("complete")}</span></Button></div>
       {value.attributes.complete?
       <img src="https://media.istockphoto.com/id/1180422298/vi/vec-to/nhi%E1%BB%87m-v%E1%BB%A5-%C4%91%C3%A3-ho%C3%A0n-th%C3%A0nh-d%E1%BA%A5u-hi%E1%BB%87u-nhi%E1%BB%87m-v%E1%BB%A5-ho%C3%A0n-th%C3%A0nh-nh%C3%A3n-d%C3%A1n-ruy-b%C4%83ng-tr%C3%B2n-m%C3%A0u-%C4%91%E1%BB%8F-%C4%91en.jpg?s=1024x1024&w=is&k=20&c=J-R2yHtvsEVeDZ9DGVC_590pVqgaiphAWhVDMQ1UIhs=" alt="" />
       :ssDate(value.attributes.date)? 
       <img src="https://thumbs.dreamstime.com/b/mission-failed-black-stamp-mission-failed-black-stamp-isolated-white-background-97569927.jpg" alt="" />:
       ""
      }
    </Card>
    </Space>
                         </div>
                    )
                })
            }
           </div>
           <div style={{textAlign:"center",marginTop:"5px",}}>
           <Pagination defaultCurrent={1} total={data.length}  pageSize={4} onChange={Pag}/>
           </div>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true} closable={true}>
        <input type="text" ref={inputElement} defaultValue={dataIP?dataIP.attributes?dataIP.attributes.title?dataIP.attributes.title:"":"":""} />      
        <input type="datetime-local" name="" id=""  ref={dateTime} defaultValue={dataIP?dataIP.attributes?dataIP.attributes.date?dataIP.attributes.date.slice(0,dataIP.attributes.date.length-1):" ":"":"" }/>
      </Modal>
    </div>
  )
}

export default CardBody