import React from 'react'
import "./Auth.css"
import { useRef ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../Settings/SettingApi';
import AlertErros from './Alert';
import {setCookie} from "../Settings/Function"
import {  useDispatch } from 'react-redux'

 function Sigin() {
      const inputUser =  useRef()
       const inputPass =  useRef() 
       const [alert,setAlert] = useState(false)
       const [textAl,setTextAl]= useState("")
       const nav = useNavigate()
       const dispatch = useDispatch()
     async  function login(){
    
        if(!inputUser.current.value|| !inputPass.current.value ){
                
          setAlert(true)
          setTextAl("Không được để trống ")
          inputUser.current.focus()
          setTimeout(()=>{setAlert(false)},1000)
  }
  else if(inputUser.current.value && inputPass.current.value){
                
    try {
     let t= await instance.post("/auth/local",{identifier:inputUser.current.value,password:inputPass.current.value})
     setCookie("User",t.data.jwt)
     setCookie("dataUser",JSON.stringify(t.data.user))
    //  dispatch(getUser(t.data.user))
     nav("/home")
    } catch (error) {
      inputUser.current.value = ""
      inputPass.current.value = ""
     setAlert(true)
     setTextAl("Mật khẩu hoặc tài khoản không đúng ")
     inputUser.current.focus()
      setTimeout(()=>{setAlert(false)},1000)
    }
             
}


       }
  return (
    <div className='form' >
         <div className='form-login'>          
                    <h2 >Login</h2>
                    <div className='form-info'>
                            <input type="text" required ref={inputUser} />
                            <p className='form-us'>UserName</p>
                    </div>
                    <div className='form-info'>
                            <input type="password" className='form-pw' required ref={inputPass} onKeyDown={(e)=>{if(e.key === "Enter"){login()}}}/>
                            <p className='form-pw'>Password</p>
                    </div>
                   <div style={{display:"flex",justifyContent:"space-between"}} >
                   <button onClick={login} >Submit</button>
                   <button onClick={()=> nav("/Sigup")} style={{width:"65%"}}>CreatAccount</button>
                  </div>
                   </div>
         {
        alert?<AlertErros textAl={textAl}></AlertErros>:""
       }
    </div>
  )
}

export default Sigin