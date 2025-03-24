import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    selectedChat: null,
    typingUsers: {},
    messageReactions: {},
    messageStatuses: {},
    fileUploads: {}
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.selectedChat = null;
      state.typingUsers = {};
      state.messageReactions = {};
      state.messageStatuses = {};
      state.fileUploads = {};
    },
    setTypingStatus: (state, action) => {
      const { userId, chatId, isTyping } = action.payload;
      if (!state.typingUsers[chatId]) {
        state.typingUsers[chatId] = {};
      }
      if (isTyping) {
        state.typingUsers[chatId][userId] = Date.now();
      } else {
        delete state.typingUsers[chatId][userId];
      }
    },
    addReaction: (state, action) => {
      const { messageId, reaction, userId } = action.payload;
      if (!state.messageReactions[messageId]) {
        state.messageReactions[messageId] = [];
      }
      state.messageReactions[messageId].push({ reaction, userId });
    },
    removeReaction: (state, action) => {
      const { messageId, userId } = action.payload;
      if (state.messageReactions[messageId]) {
        state.messageReactions[messageId] = state.messageReactions[messageId]
          .filter(reaction => reaction.userId !== userId);
      }
    },
    updateMessageStatus: (state, action) => {
      const { messageId, status } = action.payload;
      state.messageStatuses[messageId] = status;
    },
    setFileUpload: (state, action) => {
      const { messageId, file, progress } = action.payload;
      state.fileUploads[messageId] = { file, progress };
    },
    updateFileUploadProgress: (state, action) => {
      const { messageId, progress } = action.payload;
      if (state.fileUploads[messageId]) {
        state.fileUploads[messageId].progress = progress;
      }
    }
  }
});

export const {
  setMessages,
  addMessage,
  selectChat,
  clearChat,
  setTypingStatus,
  addReaction,
  removeReaction,
  updateMessageStatus,
  setFileUpload,
  updateFileUploadProgress
} = chatSlice.actions;

export default chatSlice.reducer;

export const selectMessages = (state) => state.chat.messages;
export const selectSelectedChat = (state) => state.chat.selectedChat;
export const selectTypingUsers = (state) => state.chat.typingUsers;
export const selectMessageReactions = (state) => state.chat.messageReactions;
export const selectMessageStatuses = (state) => state.chat.messageStatuses;
export const selectFileUploads = (state) => state.chat.fileUploads;