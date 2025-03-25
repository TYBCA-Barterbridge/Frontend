import { apiSlice } from '../../app/api/apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard Statistics
    getDashboardStats: builder.query({
      query: () => ({
        url: '/admin/dashboard/stats',
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),

    // User Management
    getAllUsers: builder.query({
      query: () => ({
        url: '/admin/users',
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),

    // Trade Management
    getAllTrades: builder.query({
      query: () => ({
        url: '/admin/trades',
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),

    getTradeDetails: builder.query({
      query: ({ type, id }) => ({
        url: `/admin/trades/${type}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),

    // Workshop Management
    getPendingWorkshops: builder.query({
      query: () => ({
        url: '/admin/workshops/pending',
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),

    handleWorkshopApproval: builder.mutation({
      query: ({ workshopId, status, reason }) => ({
        url: `/admin/workshops/${workshopId}/approval`,
        method: 'PUT',
        body: { status, reason },
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetAllTradesQuery,
  useGetTradeDetailsQuery,
  useGetPendingWorkshopsQuery,
  useHandleWorkshopApprovalMutation,
} = adminApiSlice; 