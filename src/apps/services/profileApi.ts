import {api} from "./api";
import {IProfileRequest} from "../../utils/interfaces";

interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}
export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<any, void>({
            query: () => "/api/account/current-account",
            providesTags: ["Profile"]
        }),
        updateProfile: builder.mutation<any, IProfileRequest>({
            query: (dataInput: IProfileRequest) => ({
                url: "/api/account/update-profile",
                method: "PUT",
                body: dataInput
            }),
            invalidatesTags: ["Profile"]
        }),
        changePassword: builder.mutation<any, ChangePasswordRequest>({
            query: (dataInput) => ({
                url: "/api/account/change-password",
                method: "PUT",
                body: dataInput
            }),
            invalidatesTags: ["Profile"]
        })
    })
})

export const { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } = profileApi;
