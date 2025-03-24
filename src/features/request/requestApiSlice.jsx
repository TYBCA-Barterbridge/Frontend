import { apiSlice } from "../../app/api/apiSlice";

export const reqApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Accept a friend request
    acceptFriendRequest: builder.mutation({
      query: (req) => ({
        url: "/request/friend-request/accept",
        method: "PUT",
        body: req,
      }),
    }),

    // Decline a friend request
    declineFriendRequest: builder.mutation({
      query: (req) => ({
        url: "/request/friend-request/decline",
        method: "PUT",
        body: req,
      }),
    }),
  }),
});

// Export the API slice
export const {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} = reqApiSlice;
