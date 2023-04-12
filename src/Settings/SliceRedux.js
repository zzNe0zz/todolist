import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: [],
    count :0,
    
  }
  export const getData = createSlice({
    name: 'setData',
    initialState,
    reducers: {
      updateData: (state,actions) => {
    
        state.data = actions.payload
      },
      updateCount:(state)=>{
        state.count = state.count + 1
      }
    },
  })
  
  export const { updateData,updateCount } = getData.actions
  
  export default getData.reducer
  