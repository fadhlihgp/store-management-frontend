import {api} from "./api";
import {IAccountRequest, IAccountResponse} from "../../utils/interfaces";
export interface AccountListResponse {
    message: string,
    data: IAccountResponse[]
}

export interface AccountResponse {
    message: string,
    data: IAccountResponse
}

interface EditAccountPayload {
    id: string,
    dataInput: IAccountRequest
}

export const accountApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAccountList: builder.query<AccountListResponse, void>({
            query: () => "/account",
            providesTags: ["AccountList"]
        }),
        getAccountById: builder.query<AccountResponse, string>({
            query: (id: string) => `/account/${id}`,
            providesTags: ["Account"]
        }),
        addAccount: builder.mutation<any, IAccountRequest>({
           query: (data: IAccountRequest) => ({
               url: `account/create`,
               method: "POST",
               body: data
           }),
            invalidatesTags: ["AccountList"]
        }),
        editAccount: builder.mutation<any, EditAccountPayload>({
            query: ({id, dataInput}) => ({
                url: `account/update/${id}`,
                method: "PUT",
                body: dataInput
            }),
            invalidatesTags: ["AccountList", "Account"]
        }),
        deleteAccount: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `account/delete/${id}`,
                method: "PUT",
                // body: {id}
            }),
            invalidatesTags: ["AccountList"]
        })
    })
})

export const { useGetAccountListQuery, useDeleteAccountMutation, useGetAccountByIdQuery, useAddAccountMutation, useEditAccountMutation } = accountApi
