import {api} from "./api";
import {IStoreRequest, IStoreResponse, ResponseApi} from "../../utils/interfaces";

interface StoreListResponse {
    message: string,
    data: IStoreResponse[]
}

interface StoreDetailResponse {
    message: string,
    data: IStoreResponse
}

interface EditStorePayload {
    id: string,
    data: IStoreRequest
}

interface AddOrEditStorePayload {
    message: string,
    data: IStoreResponse
}
export const storeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStoreList: builder.query<StoreListResponse, void>({
            query: () => "store",
            providesTags: ["StoreList"]
        }),
        addStore: builder.mutation<AddOrEditStorePayload, IStoreRequest>({
            query: (data) => ({
                url: "store",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["StoreList"]
        }),
        editStore: builder.mutation<AddOrEditStorePayload, EditStorePayload>({
            query: ({id, data}) => ({
                url: "store/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["StoreList", "Store"]
        }),
        getStoreById: builder.query<StoreDetailResponse, string>({
            query: (id) => `store/${id}`,
            providesTags: ["Store"]
        }),
        getCurrentStore: builder.query<ResponseApi<IStoreResponse>, void>({
            query: () => `store/current-store`,
            providesTags: ["Store"]
        }),
        editCurrentStore: builder.mutation<ResponseApi<IStoreResponse>, IStoreRequest>({
            query: (data) => ({
                url: 'store/update-store',
                body: data,
                method: 'PUT'
            }),
            invalidatesTags: ["StoreList", "Store"]
        }),
        deleteStore: builder.mutation<any, string>({
            query: (id: string) => ({
                url: "store/delete/" + id,
                method: "PUT"
            }),
            invalidatesTags: ["StoreList"]
        })
    })
})

export const { useGetStoreListQuery, useAddStoreMutation, useEditStoreMutation, useGetStoreByIdQuery,
    useDeleteStoreMutation, useGetCurrentStoreQuery, useEditCurrentStoreMutation
 } = storeApi
