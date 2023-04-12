import React, { useRef, useState } from 'react'
import "./Auth.css"
import instance from '../Settings/SettingApi';
import { useNavigate } from 'react-router-dom';
import AlertErros from './Alert';
function Siggup() {
       const inputUser =  useRef()
       const inputPass =  useRef()
       const inputEm = useRef()
       const [alert,setAlert] = useState(false)
       const [textAl,setTextAl]= useState("")
      const nav = useNavigate()
 async function creatUser (){
        if(!inputUser.current.value|| !inputPass.current.value || !inputEm.current.value){
                
                setAlert(true)
                setTextAl("Không được để trống ")
        }
        else if(inputUser.current.value && inputPass.current.value && inputEm.current.value){
                
               try {
                let t= await instance.post("/auth/local/register",{username:inputUser.current.value,email:inputEm.current.value,password:inputPass.current.value})
                nav("/Sigin")
               } catch (error) {
                setAlert(true)
                setTextAl("Tài khoản đã tồn tại ")
                console.log(error);
               }
                        
        }
}
  return (
    <div className='form form-sigup' >
         <div className='form-login'>
                    <h2>Siggup</h2>
                    <div className='form-info'>
                            <input type="text" required ref={inputUser}/>
                            <p className='form-us'>UserName</p>
                    </div>
                    <div className='form-info'>
                            <input type="text" required ref={inputEm}/>
                            <p className='form-us'>Email</p>
                    </div>
                    <div className='form-info'>
                            <input type="password"  className='form-pw' required ref={inputPass} />
                            <p className='form-pw'>Password</p>
                    </div>
                    <button onClick={creatUser}>Siggup</button>
                
         </div>
       {
        alert?<AlertErros textAl={textAl}></AlertErros>:""
       }
       
</div>
  )
}

export default Siggup