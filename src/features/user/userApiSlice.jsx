import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
    }),
    // Get user by id
    getUserById: builder.query({
      query: () => ({
        url: `/user/id`,
        method: "GET",
      }),
    }),
    // Edit User
    editUser: builder.mutation({
      query: (data) => ({
        url: `/user`,
        method: "PUT",
        body: data,
      }),
    }),
    // Delete User
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
