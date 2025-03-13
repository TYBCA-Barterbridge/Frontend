import { createSlice } from "@reduxjs/toolkit";

const goodSlice = createSlice({
    name: "good",
    initialState: {
        good: [],
        selectedgood: null
        },
        reducers: {
            setgoods: (state, action)=>{
                const {good} = action.payload
                state.good = good
            },
            setselectedgood: (state,action)=>{
                const {selectedgood} = action.payload
                state.selectedgood = selectedgood
            },
            addgood: (state,action)=>{
                const {good} = action.payload
                state.good.push(good)
            },
            removegood: (state, action) => {
                const { good } = action.payload;
                state.good = state.good.filter((item) => item.id !== good.id);
            }
    }
})

export const { setgoods, setselectedgood, addgood, removegood } = goodSlice.actions;

export default goodSlice.reducer;