import {api} from "./api";
import {ICustomerRequest, ICustomerResponse} from "../../utils/interfaces";

interface CustomerListResponse {
    message: string;
    data: ICustomerResponse[]
}

interface CustomerResponse {
    message: string;
    data: ICustomerResponse
}

interface CustomerEditRequest {
    id: string,
    data: ICustomerRequest
}

export const customerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCustomer: builder.query<CustomerListResponse, void>({
            query: () => `api/customer`,
            providesTags: ["CustomerList"]
        }),
        getCustomerById: builder.query<CustomerResponse, string>({
            query: (id: string) => `api/customer/${id}`,
            providesTags: ["Customer"]
        }),
        addCustomer: builder.mutation<CustomerResponse, ICustomerRequest>({
            query: (data) => ({
                url: `api/customer`,
                body: data,
                method: "POST"
            }),
            invalidatesTags: ["Customer", "CustomerList"]
        }),
        updateCustomer: builder.mutation<CustomerResponse, CustomerEditRequest>({
            query: ({id, data}) => ({
                url: `api/customer/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Customer", "CustomerList"]
        }),
        deleteCustomer: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `api/customer/delete/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Customer", "CustomerList"]
        })
    })
})

export const {
    useGetCustomerQuery,
    useGetCustomerByIdQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customerApi
