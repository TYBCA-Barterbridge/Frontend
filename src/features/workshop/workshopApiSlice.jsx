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
            query: (workshop) => ({
                url: "/workshop",
                method: "POST",
                body: workshop
            })
        }),
        editWorkshop: builder.mutation({
            query: (workshop) => ({
                url: `/workshop/${workshop.id}`,
                method: "PUT",
                body: workshop
            })
        }),
        deleteWorkshop: builder.mutation({
            query: (data) =>({
                url: `/workshop/${workshop.id}`,
                method: 'DELETE',
                
            })
        })
    })
})