import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: [],
    count :0,
    dataDrap:""
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
      },
      dataDrap:(state,actions)=>{
        state.dataDrap = actions.payload
      }
    },
  })
  
  export const { updateData,updateCount,dataDrap } = getData.actions
  
  export default getData.reducer
  