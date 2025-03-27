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
      query: (user_id) => ({
        url: `/user/${user_id}`,
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

    // Fetch friends
    fetchFriends: builder.query({
      query: () => ({
        url: `/user/friends`,
        method: 'GET',
      })
    }),

    // Remove friend
    removeFriend: builder.mutation({
      query: (friendId) => ({
        url: `/user/friend-request/${friendId}`,
        method: 'DELETE',
      })
    }),

    // Update bio
    updateBio: builder.mutation({
      query: (bio) => ({
        url: `/user/bio`,
        method: 'PUT',
        body: { bio },
      })
    }),

    // Update profile picture
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: `/user/profile`,
        method: 'PUT',
        body: formData,
      })
    }),

    // Update username
    updateUsername: builder.mutation({
      query: (username) => ({
        url: `/user/username`,
        method: 'PUT',
        body: { username },
      })
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useEditUserMutation,
  useSearchUsersQuery,
  useSendFriendRequestMutation,
  useFetchFriendRequestsQuery,
  useFetchFriendsQuery,
  useRemoveFriendMutation,
  useUpdateBioMutation,
  useUpdateProfileMutation,
  useUpdateUsernameMutation,
} = userApiSlice;
