import {api} from "./api";
import {IStoreRequest, IStoreResponse} from "../../utils/interfaces";

interface StoreListResponse {
    message: string,
    data: IStoreResponse[]
}

interface StoreDetailResponse {
    message: string,
    data: IStoreRequest
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
    useDeleteStoreMutation
 } = storeApi
