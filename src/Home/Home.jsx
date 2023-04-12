import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Body from './Body'
import "./Home.css"
function Home() {
  return (
    <div className='Home'>
      
        <div className='Home-main'>
              <div style={{width:"7%"}}><Menu></Menu></div>
             <div style={{width:"93%",padding:"20px",backgroundColor:"#f2f6fe",borderTopRightRadius:"30px",borderBottomRightRadius:"30px"}} >
              <div><Header></Header></div>
              <div><Body></Body></div>
             </div>
        </div>
    </div>
  )
}

export default Home