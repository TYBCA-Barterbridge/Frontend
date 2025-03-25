import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: null,
  selectedTrade: null,
  selectedWorkshop: null,
  workshops: [],
  isUserModalOpen: false,
  isTradeModalOpen: false,
  isWorkshopModalOpen: false,
  isDeleteModalOpen: false,
  isApprovalModalOpen: false,
  modalType: null, // 'delete', 'approve', 'reject'
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setWorkshops: (state, action) => {
      state.workshops = action.payload;
    },
    removeWorkshop: (state, action) => {
      state.workshops = state.workshops.filter(workshop => workshop.workshop_id !== action.payload);
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setSelectedTrade: (state, action) => {
      state.selectedTrade = action.payload;
    },
    setSelectedWorkshop: (state, action) => {
      state.selectedWorkshop = action.payload;
    },
    openUserModal: (state) => {
      state.isUserModalOpen = true;
    },
    closeUserModal: (state) => {
      state.isUserModalOpen = false;
      state.selectedUser = null;
    },
    openTradeModal: (state) => {
      state.isTradeModalOpen = true;
    },
    closeTradeModal: (state) => {
      state.isTradeModalOpen = false;
      state.selectedTrade = null;
    },
    openWorkshopModal: (state) => {
      state.isWorkshopModalOpen = true;
    },
    closeWorkshopModal: (state) => {
      state.isWorkshopModalOpen = false;
      state.selectedWorkshop = null;
    },
    openDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.selectedUser = null;
    },
    openApprovalModal: (state, action) => {
      state.isApprovalModalOpen = true;
      state.modalType = action.payload;
    },
    closeApprovalModal: (state) => {
      state.isApprovalModalOpen = false;
      state.selectedWorkshop = null;
      state.modalType = null;
    },
    resetAdminState: (state) => {
      return initialState;
    },
  },
});

export const {
  setSelectedUser,
  setSelectedTrade,
  setSelectedWorkshop,
  removeWorkshop,
  openUserModal,
  closeUserModal,
  openTradeModal,
  closeTradeModal,
  openWorkshopModal,
  closeWorkshopModal,
  openDeleteModal,
  closeDeleteModal,
  openApprovalModal,
  closeApprovalModal,
  setWorkshops,
  resetAdminState,
} = adminSlice.actions;

export default adminSlice.reducer; 