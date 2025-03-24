import { apiSlice } from "../../app/api/apiSlice";

export const groupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (formData) => ({
        url: "/group/create",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Groups"],
    }),
    updateGroup: builder.mutation({
      query: (formData) => ({
        url: "/group/update",
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Groups"],
    }),
    deleteGroup: builder.mutation({
      query: (group_id) => ({
        url: "/group/delete",
        method: "DELETE",
        body: { group_id },
      }),
      invalidatesTags: ["Groups"],
    }),
    addMember: builder.mutation({
      query: ({ group_id, members }) => ({
        url: "/group/add-member",
        method: "POST",
        body: { group_id, members },
      }),
      invalidatesTags: ["Groups"],
    }),
    removeMember: builder.mutation({
      query: ({ group_id, user_id }) => ({
        url: "/group/remove-member",
        method: "DELETE",
        body: { group_id, user_id },
      }),
      invalidatesTags: ["Groups"],
    }),
    leaveGroup: builder.mutation({
      query: ({ group_id }) => ({
        url: "/group/leave-group",
        method: "POST",
        body: { group_id },
      }),
    }),
  }), 
});

export const {
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useAddMemberMutation,
  useRemoveMemberMutation,
  useLeaveGroupMutation,
} = groupsApiSlice;