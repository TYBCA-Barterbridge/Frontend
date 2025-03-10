import { createSlice } from "@reduxjs/toolkit";

const goodSlice = createSlice({
    name: "good",
    initialState: {
        good: [],
        },
        reducers: {
            setgoods: (state, action)=>{
                const {good} = action.payload
                state.good = good
            }
    }
})

export const { setgoods } = goodSlice.actions;

export default goodSlice.reducer;