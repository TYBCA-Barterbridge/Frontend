import { apiSlice } from "../../app/api/apiSlice"; // Import the existing apiSlice

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "/chat/sendMessage",
        method: "POST",
        body: message,
      }),
    }),

    joinGroup: builder.mutation({
      query: (group_id) => ({
        url: "/chat/joinGroup",
        method: "POST",
        body: { group_id },
      }),
    }),

    isTyping: builder.mutation({
      query: ({ group_id, isTyping }) => ({
        url: '/chat/isTyping',
        method: 'POST',
        body: { group_id, isTyping },
      }),
    }),

    fetchMessages: builder.mutation({
      query: (group_id) => ({
        url: "/chat/fetchMessages",
        method: "POST",
        body: group_id,
      }),
      invalidatesTags: ['Chat'],
    }),

    fetchMessagesbyGroup: builder.mutation({
      query: (group_id) => ({
        url: "/chat/fetchMessagesbyGroup",
        method: "POST",
        body: group_id,
        }),
    }),

    createGroup: builder.mutation({
      query: (groupData) => ({
        url: "/chat/createGroup",
        method: "POST",
        body: groupData,
      }),
    }),

    addUserToGroup: builder.mutation({
      query: (userData) => ({
        url: "/chat/addUserToGroup",
        method: "POST",
        body: userData,
      }),
    }),

    removeUserFromGroup: builder.mutation({
      query: (userData) => ({
        url: "/chat/removeUserFromGroup",
        method: "POST",
        body: userData,
      }),
    }),

    deleteGroup: builder.mutation({
      query: (group_id) => ({
        url: "/chat/deleteGroup",
        method: "POST",
        body: { group_id },
      }),
    }),

    uploadFile: builder.mutation({
      query: ({ file, messageId, group_id }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('messageId', messageId);
        formData.append('group_id', group_id);
        
        return {
          url: '/chat/uploadFile',
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
    }),

    addReaction: builder.mutation({
      query: ({ messageId, reaction, group_id }) => ({
        url: '/chat/addReaction',
        method: 'POST',
        body: { messageId, reaction, group_id },
      }),
    }),

    removeReaction: builder.mutation({
      query: ({ messageId, group_id }) => ({
        url: '/chat/removeReaction',
        method: 'POST',
        body: { messageId, group_id },
      }),
    }),

    updateMessageStatus: builder.mutation({
      query: ({ messageId, status, group_id }) => ({
        url: '/chat/updateMessageStatus',
        method: 'POST',
        body: { messageId, status, group_id },
      }),
    }),

    markMessageAsRead: builder.mutation({
      query: ({ messageId, group_id }) => ({
        url: '/chat/markAsRead',
        method: 'POST',
        body: { messageId, group_id },
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useJoinGroupMutation,
  useFetchMessagesMutation,
  useFetchMessagesbyGroupMutation,
  useIsTypingMutation,
  useCreateGroupMutation,
  useAddUserToGroupMutation,
  useRemoveUserFromGroupMutation,
  useDeleteGroupMutation,
  useUploadFileMutation,
  useAddReactionMutation,
  useRemoveReactionMutation,
  useUpdateMessageStatusMutation,
  useMarkMessageAsReadMutation,
} = chatApiSlice;