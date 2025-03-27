import { apiSlice } from "../../app/api/apiSlice";

export const goodApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGood: builder.query({
      query: () => ({
        url: "/good/all",
        method: "GET",
      }),
    }),
    getGoodbyUser: builder.query({
      query: () =>({
        url: "/good/user",
        method: "GET",
      })
    }),
    getGoodById: builder.query({
      query: (goodId) => ({
        url: `/good/${goodId}/details`,
        method: "GET",
      })
    }),
    createGood: builder.mutation({
      query: (data) => ({
        url: "/good/add",
        method: "POST",
        body: data,
      }),
    }),
    updateGood: builder.mutation({
      query: (data) => ({
        url: `/good/update`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteGood: builder.mutation({
      query: (good_id) => ({
        url: `/good/delete`,
        method: "DELETE",
        body: { good_id }
      }),
      invalidatesTags: ["Good"],
    }),
    fetchGoodExchangeRequests: builder.query({
      query: () => ({
        url: "/good/exchange/fetch",
        method: "GET",
      }),
    }),
    respondtogoodexchange: builder.mutation({
      query: (data) => ({
        url: `/good/exchange/respond`,
        method: "PUT",
        body: data,
      }),
    }),
    sendgoodexchangerequest: builder.mutation({
      query: (data) => ({
        url: `/good/exchange/request`,
        method: "POST",
        body: data,
      }),
    }),
    GoodExchangereview: builder.mutation({
      query: (data) => ({
        url: `/good/exchange/review`,
        method: "PUT",
        body: data,
      }),
    }),
    buygood: builder.mutation({
      query: (data) => ({
        url: `/good/buy/`,
        method: "POST",
        body: data,
      }),
    }),
    boughtgoodreview: builder.mutation({
        query: (data) => ({
            url: `/good/buy/review`,
            method: "PUT",
            }),
    }),
    getOrderHistory: builder.query({
      query: () => ({
        url: "/good/history",
        method: "POST",
      }),
    }),
    getExchangeHistory: builder.query({
      query: () => ({
        url: '/good/exchange/history',
        method: 'GET',
      })
    }),
  }),
});

export const{
    useGetGoodQuery,
    useGetGoodbyUserQuery,
    useCreateGoodMutation,
    useDeleteGoodMutation,
    useUpdateGoodMutation,
    useGetGoodByIdQuery,
    useFetchGoodExchangeRequestsQuery,
    useRespondtogoodexchangeMutation,
    useSendgoodexchangerequestMutation,
    useGoodExchangereviewMutation,
    useBuygoodMutation,
    useBoughtgoodreviewMutation,
    useGetOrderHistoryQuery,
    useGetExchangeHistoryQuery,
}=  goodApiSlice