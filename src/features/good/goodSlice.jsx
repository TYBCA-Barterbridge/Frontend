import { createSlice } from "@reduxjs/toolkit";

const goodSlice = createSlice({
  name: "good",
  initialState: {
    good: [],
    selectedgood: null,
    selectedcategory: null,
    priceRange: [0, 100000],
    sortOption: "default",
    orderHistory: [],
    selectedOrder: null,
  },
  reducers: {
    setselectedgood: (state, action) => {
      state.selectedgood = action.payload.selectedgood;
    },
    setselectedcategory: (state, action) => {
      state.selectedcategory = action.payload.selectedcategory;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },

    setgoods: (state, action) => {
      const { good } = action.payload;
      state.good = good;
    },
    setselectedgood: (state, action) => {
      const { selectedgood } = action.payload;
      state.selectedgood = selectedgood;
    },
    addgood: (state, action) => {
      const { good } = action.payload;
      state.good.push(good);
    },
    removegood: (state, action) => {
      const { good } = action.payload;
      state.good = state.good.filter((item) => item.id !== good.id);
    },
    setorderHistory: (state, action) => {
      const { orderHistory } = action.payload;
      state.orderHistory = orderHistory;
    },
    setselectedOrder: (state, action) => {
      const { selectedOrder } = action.payload;
      state.selectedOrder = selectedOrder;
    },
  },
});

export const {
  setgoods,
  setselectedgood,
  addgood,
  removegood,
  setselectedcategory,
  setPriceRange,
  setSortOption,
  setorderHistory,
  setselectedOrder,
} = goodSlice.actions;

export default goodSlice.reducer;
