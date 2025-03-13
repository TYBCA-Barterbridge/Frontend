import { apiSlice } from "../../app/api/apiSlice";

export const goodApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGood: builder.query({
      query: () => ({
        url: "/good",
        method: "GET",
      }),
    }),
    getGoodbyUser: builder.query({
      query: () =>({
        url: "/good/usergood",
        method: "GET",
      })
    }),
    getGoodById: builder.query({
      query: (goodId) => ({
        url: `/good/${goodId}`,
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
        url: `/good/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteGood: builder.mutation({
      query: (id) => ({
        url: `/good/${id}`,
        method: "DELETE",
      }),
    }),
    fetchExchangeRequests: builder.query({
      query: () => ({
        url: "/good/exchangerequest",
        method: "GET",
      }),
    }),
    respondtoexchange: builder.mutation({
      query: (data) => ({
        url: `/good/exchange`,
        method: "PUT",
        body: data,
      }),
    }),
    sendexchangerequest: builder.mutation({
      query: (data) => ({
        url: `/good/exchangerequest`,
        method: "POST",
        body: data,
      }),
    }),
    exchangereview: builder.mutation({
      query: (data) => ({
        url: `/good/exchangereview/`,
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
    boughtreview: builder.mutation({
        query: (data) => ({
            url: `/good/boughtreview/`,
            method: "PUT",
            }),
    })
  }),
});

export const{
    useGetGoodQuery,
    useGetGoodbyUserQuery,
    useCreateGoodMutation,
    useDeleteGoodMutation,
    useUpdateGoodMutation,
    useGetGoodByIdQuery,
    useFetchExchangeRequestsQuery,
    useRespondtoexchangeMutation,
    useSendexchangerequestMutation,
    useExchangereviewMutation,
    useBuygoodMutation,
    useBoughtreviewMutation
}= goodApiSlice