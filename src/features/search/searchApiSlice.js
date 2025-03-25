import { apiSlice } from "../../app/api/apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchAll: builder.mutation({
            query: (query) => ({
                url: '/search/all',
                method: 'POST',
                body: { query }
            })
        })
    })
});

export const { useSearchAllMutation } = searchApiSlice; 