import apiSlice from "../../App/apiSlice"
const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: '/api/users' 
            }),
            providesTags:["Users"]

           
        }),
        getUsersById: build.query({
            query: () => ({
                url: '/api/users/ById'
            }),
            providesTags:["Users"]

        }),
        addUser: build.mutation({
            query: (user) => ({
                url: "api/users",
                method: "POST",
                body: user
           }),
           invalidatesTags:["Users"]
        }),

        deleteUserItem : build.mutation({
            query: ({id}) => ({
                url: "api/users/",
                method: "DELETE",
                body: {id:id}
           }),
           invalidatesTags:["Users"]
        }),
        updateUserItem : build.mutation({
            query: ({id,count}) => ({
                url: "api/users/",
                method: "PUT",
                body:{_id:id,count:count}
           }),
           invalidatesTags:["Users"]
        }),
    }),
})
export const { useGetUsersQuery, useGetUsersByIdQuery, useAddUserMutation, useDeleteUserItemMutation,useUpdateUserItemMutation} = userApiSlice 