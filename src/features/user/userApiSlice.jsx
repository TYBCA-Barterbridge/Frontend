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
     // Search for users
     searchUsers: builder.query({
      query: (name) => `/user/search?name=${name}`,
  }),

  // Send a friend request
  sendFriendRequest: builder.mutation({
      query: (Request) => ({
      url: `/user/friend-request`,
          method: 'POST',
          body: Request,
      }),
  }),

  // Fetch pending friend requests
  fetchFriendRequests: builder.query({
      query: () => ({
          url: `/user/friend-requests`,
          method: 'GET',
      })
  }),

  fetchFriends: builder.query({
      query: () => ({
          url: `/user/friends`,
          method: 'GET',
      }),
  }),
  
  removeFriend: builder.mutation({
      query: (data) => ({
          url: `/user/remove-friend`,
          method: 'DELETE',
          body: data,
      })
  }), 

  // Update user bio
  updateBio: builder.mutation({
      query: ( bio ) => ({
          url: `/user/bio`,
          method: 'PUT',
          body: bio ,
      }),
  }),

  // Update user profile picture
  updateProfile: builder.mutation({
      query: (formData) => ({
          url: `/user/profile`,
          method: 'PUT',
          body: formData,
      }),
  }),

  // Update user username
  updateUsername: builder.mutation({
      query: ({ username }) => ({
          url: `/user/username`,
          method: 'PUT',
          body: { username },
      }),
      invalidatesTags: ['User'],
  }),

  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useSearchUsersQuery,
  useSendFriendRequestMutation,
  useFetchFriendRequestsQuery,
  useFetchFriendsQuery,
  useRemoveFriendMutation,
  useUpdateBioMutation,
  useUpdateProfileMutation,
  useUpdateUsernameMutation,
} = userApiSlice;
