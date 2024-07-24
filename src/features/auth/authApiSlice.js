import { apiSlice } from "../../app/api/apiSlice"
import { logOut } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    console.log('Sending logout request');
                    await queryFulfilled;
                    console.log('Logout request fulfilled');
                    dispatch(logOut());
                    dispatch(apiSlice.util.resetApiState());
                } catch (err) {
                    console.log('Logout error', err);
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            })
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 