import { apiSlice } from "../../app/api/apiSlice";


export const workshopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWorkshop: builder.query({
            query: () => ({
                url: "/workshop",
                method: "GET",
            })
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
                url: `/workshop/${data.id}`,
                method: "PUT",
                body: data
            })
        }),
        deleteWorkshop: builder.mutation({
            query: (data) =>({
                url: `/workshop/${data.id}`,
                method: 'DELETE',
                
            })
        }),
        getWorkshopsByUser: builder.query({
            query: () => ({
                url: "/workshop/user",
                method: "POST",
            })
        }),
        getWorkshopById: builder.query({
            query: (id) => ({
                url: `/workshop/${id}`,
                method: "GET",
            })
        }),
        getWorkshopByAdmin: builder.query({
            query: () => ({
                url: "/workshop/admin",
                method: "POST",
            })
        }),
        addParticipant: builder.mutation({
            query: (participant) => ({
                url: `/workshop/${workshop.id}/participants`,
                method: "POST",
                body: participant
            })
        }),
        editParticipantStatus: builder.mutation({
            query: (participant) => ({
                url: `/workshop/${workshop.id}/participants`,
                method: "PUT",
                body: participant
            })
        }), 
        removeParticipant: builder.mutation({
            query: (participant) => ({
                url: `/workshop/${workshop.id}/participants`,
                method: "DELETE",
                body: participant
            })  
        }),
        addReview: builder.mutation({
            query: (review) => ({
                url: `/workshop/${workshop.id}/review`,
                method: "POST",
                body: review
            })
        }),
        getWorkshopParticipants: builder.query({
            query: (id) => ({
                url: `/workshop/${workshop.id}/participants`,
                method: "GET",  
            })
        })
    })
})

export const {
    useGetWorkshopQuery,
    useCreateWorkshopMutation,
    useEditWorkshopMutation,
    useDeleteWorkshopMutation,
    useGetWorkshopsByUserQuery,
    useGetWorkshopByIdQuery,
    useGetWorkshopByAdminQuery,
    useAddParticipantMutation,
    useEditParticipantStatusMutation,
    useRemoveParticipantMutation,
    useAddReviewMutation,
    useGetWorkshopParticipantsQuery
} = workshopApiSlice;