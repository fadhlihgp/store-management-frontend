import { ISupplierRequest, ISupplierResponse, RequestApi, ResponseApi } from "../../utils/interfaces";
import { api } from "./api";

const supplierBase = 'supplier'
export const supplierApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSuppliers: builder.query<ResponseApi<ISupplierResponse[]>, void>({
            query: () => supplierBase,
            providesTags: ["SupplierList"]
        }),
        getSupplierDetail: builder.query<ResponseApi<ISupplierResponse>, string>({
            query: (id: string) => `${supplierBase}/${id}`,
            providesTags: ["SupplierDetail"]
        }),
        addSupplier: builder.mutation<ResponseApi<ISupplierResponse>, ISupplierRequest>({
            query: (data) => ({
                url: `${supplierBase}/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["SupplierList", "SupplierDetail"]
        }),
        editSupplier: builder.mutation<ResponseApi<ISupplierResponse>, RequestApi<ISupplierRequest>>({
            query: ({id, data}) => ({
                url: `${supplierBase}/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["SupplierList", "SupplierDetail"]
        }),
        deleteSupplier: builder.mutation<ResponseApi<ISupplierResponse>, string>({
            query: (id: string) => ({
                url: `${supplierBase}/delete/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["SupplierList", "SupplierDetail"]
        })
    })
})

export const {
    useGetSuppliersQuery,
    useGetSupplierDetailQuery,
    useAddSupplierMutation,
    useEditSupplierMutation,
    useDeleteSupplierMutation
} = supplierApi