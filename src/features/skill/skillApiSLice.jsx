import { method } from "lodash";
import { apiSlice } from "../../app/api/apiSlice";

export const skillApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSkill: builder.query({
      query: () => ({
        url: "/skill/all",
        method: "GET",
      }),
    }),
    getSkillbyUser: builder.query({
      query: () =>({
        url: "/skill/user",
        method: "GET",
      })
    }),
    getSkillById: builder.query({
      query: (skillId) => ({
        url: `/skill/${skillId}/details`,
        method: "GET",
      })
    }),
    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skill/add",
        method: "POST",
        body: data,
      }),
    }),
    updateSkill: builder.mutation({
      query: (data) => ({
        url: `/skill/update`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteSkill: builder.mutation({
      query: (skill_id) => ({
        url: `/skill/delete`,
        method: "DELETE",
        body: skill_id
      }),
      invalidatesTags: ["Skill"],
    }),
    fetchSkillExchangeRequests: builder.query({
      query: () => ({
        url: "/skill/exchange/fetch",
        method: "GET",
      }),
    }),
    respondtoskillexchange: builder.mutation({
      query: (data) => ({
        url: `/skill/exchange/respond`,
        method: "PUT",
        body: data,
      }),
    }),
    sendskillexchangerequest: builder.mutation({
      query: (data) => ({
        url: `/skill/exchange/request`,
        method: "POST",
        body: data,
      }),
    }),
    SkillExchangereview: builder.mutation({
      query: (data) => ({
        url: `/skill/exchange/review`,
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
    boughtskillreview: builder.mutation({
        query: (data) => ({
            url: `/skill/buy/review`,
            method: "PUT",
            body: data,
            }),
    }),
    getSkillOrderHistory: builder.query({
      query: () => ({
        url: "/skill/order-history",
        method: "GET",
      }),
    }),
    getExchangeHistory: builder.query({
      query: () => ({
        url: "/skill/exchange/history",
        method: "GET",
    })
    })
  }),
});

export const{
    useGetSkillQuery,
    useGetSkillbyUserQuery,
    useCreateSkillMutation,
    useDeleteSkillMutation,
    useUpdateSkillMutation,
    useGetSkillByIdQuery,
    useFetchSkillExchangeRequestsQuery,
    useRespondtoskillexchangeMutation,
    useSendskillexchangerequestMutation,
    useGetExchangeHistoryQuery,
    useSkillExchangereviewMutation,
    useBuyskillMutation,
    useBoughtskillreviewMutation,
    useGetSkillOrderHistoryQuery,
}= skillApiSlice