
import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
    name: "group",
    initialState: {
        selectedGroup: null,
        status: "idle",
        error: null,
    },
    reducers: {
        selectGroup: (state, action) => {
            state.selectedGroup = action.payload;
        },
        updateGroup: (state, action) => {
            const index = state.groups.findIndex(group => group.id === action.payload.id);
            if (index !== -1) {
                state.groups[index] = action.payload;
            }
        },
        deleteGroup: (state, action) => {
            state.groups = state.groups.filter(group => group.id !== action.payload);
        },
    },
});

export const { selectGroup, updateGroup, deleteGroup } = groupSlice.actions;

export default groupSlice.reducer;  

