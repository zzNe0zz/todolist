import React from 'react'
import {Alert,Space } from 'antd';
function AlertErros(props) {
  return (
    <div className='Alert'>
               
     <Space
     direction="vertical"
     style={{
     width: '100%',
     }}
     >
     
     <Alert
     message={props.textAl}
     type="error"
     showIcon
     />
     </Space>
  

</div>
  )
}

export default AlertErros