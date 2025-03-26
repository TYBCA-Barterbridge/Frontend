import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workshops: [],
  selectedWorkshop: null,
};

const workshopSlice = createSlice({
  name: 'workshop',
  initialState,
  reducers: {
    setWorkshops: (state, action) => {
      state.workshops = action.payload.workshops;
    },
    setSelectedWorkshop: (state, action) => {
      state.selectedWorkshop = action.payload.selectedWorkshop;
    },
    resetWorkshopState: (state) => {
      return initialState;
    },
    addWorkshop: (state, action) => {
      state.workshops.push(action.payload);
    },
    removeWorkshop: (state, action) => {
      state.workshops = state.workshops.filter((workshop) => workshop.id !== action.payload.id);
    }
  }
});

export const {
  setWorkshops,
  setSelectedWorkshop,
  resetWorkshopState,
  addWorkshop,
  removeWorkshop
} = workshopSlice.actions;

export default workshopSlice.reducer;
