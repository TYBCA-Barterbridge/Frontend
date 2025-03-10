import { apiSlice } from "../../app/api/apiSlice";

export const skillApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSkill: builder.query({
      query: () => ({
        url: "/skill",
        method: "GET",
      }),
    }),
    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skill",
        method: "POST",
        body: data,
      }),
    }),
    updateSkill: builder.mutation({
      query: (data) => ({
        url: `/skill/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skill/`,
        method: "DELETE",
      }),
    }),
    fetchExchangeRequests: builder.query({
      query: () => ({
        url: "/skill/exchangerequest",
        method: "GET",
      }),
    }),
    respondtoexchange: builder.mutation({
      query: (data) => ({
        url: `/skill/exchange`,
        method: "PUT",
        body: data,
      }),
    }),
    sendexchangerequest: builder.mutation({
      query: (data) => ({
        url: `/skill/exchangerequest`,
        method: "POST",
        body: data,
      }),
    }),
    exchangereview: builder.mutation({
      query: (data) => ({
        url: `/skill/exchangereview/`,
        method: "PUT",
        body: data,
      }),
    }),
    buyskill: builder.mutation({
      query: (data) => ({
        url: `/skill/buy/`,
        method: "POST",
        body: data,
      }),
    }),
    boughtreview: builder.mutation({
        query: (data) => ({
            url: `/skill/boughtreview/`,
            method: "PUT",
            }),
    })
  }),
});

export const{
    useGetSkillQuery,
    useCreateSkillMutation,
    useDeleteSkillMutation,
    useFetchExchangeRequestsQuery,
    useRespondtoexchangeMutation,
    useSendexchangerequestMutation,
    useExchangereviewMutation,
    useBuyskillMutation,
    useBoughtreviewMutation
}= skillApiSlice