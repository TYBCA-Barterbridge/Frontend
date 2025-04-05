import { apiSlice } from "../../app/api/apiSlice";

export const workshopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllWorkshops: builder.query({
            query: () => ({
                url: "/workshop",
                method: "GET",
            }),
            providesTags: ['Workshop'],
        }),
        getWorkshopById: builder.query({
            query: (id) => ({
                url: `/workshop/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: 'Workshop', id }],
        }),
        createWorkshop: builder.mutation({
            query: (data) => ({
                url: "/workshop",
                method: "POST",
                body: data
            })
        }),
        editWorkshop: builder.mutation({
            query: (data) => ({
                url: "/workshop",
                method: "PUT",
                body: data
            })
        }),
        deleteWorkshop: builder.mutation({
            query: (id) => ({
                url: `/workshop/${id}`,
                method: 'DELETE',
            }),
        }),
        getWorkshopByAdmin: builder.query({
            query: () => ({
                url: "/workshop/admin",
                method: "POST",
            })
        }),
        getWorkshopByUser: builder.query({
            query: () => ({
                url: "/workshop/user",
                method: "POST",
            })
        }),
        addParticipant: builder.mutation({
            query: (data) => ({
                url: `/workshop/${data.workshop_id}/participants`,
                method: "POST",
                body: data
            })
        }),
        getWorkshopParticipants: builder.query({
            query: (id) => ({
                url: `/workshop/${id}/participants`,
                method: "GET",
            }),
            providesTags: ['Workshop'],
        }),
        editParticipantStatus: builder.mutation({
            query: (data) => ({
                url: `/workshop/${data.workshop_id}/participants`,
                method: "PUT",
                body: data
            })
        }),
        removeParticipant: builder.mutation({
            query: (data) => ({
                url: `/workshop/${data.workshop_id}/participants`,
                method: "DELETE",
                body: data
            })
        }),
        addReview: builder.mutation({
            query: (data) => ({
                url: `/workshop/review`,
                method: "PUT",
                body: data
            })
        }),
    })
});

export const {
    useGetAllWorkshopsQuery,
    useGetWorkshopByIdQuery,
    useCreateWorkshopMutation,
    useEditWorkshopMutation,
    useDeleteWorkshopMutation,
    useGetWorkshopByAdminQuery,
    useGetWorkshopByUserQuery,
    useAddParticipantMutation,
    useGetWorkshopParticipantsQuery,
    useEditParticipantStatusMutation,
    useRemoveParticipantMutation,
    useAddReviewMutation,
} = workshopApiSlice;