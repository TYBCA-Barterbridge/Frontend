import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
    name: "skill",
    initialState: {
        skill: [],
        selectedskill: null,
        orderHistory: [],
        selectedOrder: null,
        },
        reducers: {
            setskills: (state, action)=>{
                const {skill} = action.payload
                state.skill = skill
            },
            setselectedskill: (state,action)=>{
                const {selectedskill} = action.payload
                state.selectedskill = selectedskill
            },
            addskill: (state,action)=>{
                const {skill} = action.payload
                state.skill.push(skill)
            },
            removeskill: (state, action) => {
                const { skill } = action.payload;
                state.skill = state.skill.filter((item) => item.id !== skill.id);
            },
            setorderHistory: (state, action) => {
                const { orderHistory } = action.payload;
                state.orderHistory = orderHistory;
            },
            setselectedOrder: (state, action) => {
                const { selectedOrder } = action.payload;
                state.selectedOrder = selectedOrder;
            }
        }
})

export const { setskills, setselectedskill, addskill, removeskill, setorderHistory, setselectedOrder } = skillSlice.actions;

export default skillSlice.reducer;