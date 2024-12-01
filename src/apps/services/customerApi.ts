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
            query: () => `customer`,
            providesTags: ["CustomerList"]
        }),
        getCustomerById: builder.query<CustomerResponse, string>({
            query: (id: string) => `customer/${id}`,
            providesTags: ["Customer"]
        }),
        addCustomer: builder.mutation<CustomerResponse, ICustomerRequest>({
            query: (data) => ({
                url: `customer`,
                body: data,
                method: "POST"
            }),
            invalidatesTags: ["Customer", "CustomerList", "Dashboard"]
        }),
        updateCustomer: builder.mutation<CustomerResponse, CustomerEditRequest>({
            query: ({id, data}) => ({
                url: `customer/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Customer", "CustomerList"]
        }),
        deleteCustomer: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `customer/delete/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Customer", "CustomerList", "Dashboard"]
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
