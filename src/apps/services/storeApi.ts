import {api} from "./api";
import {IStoreResponse} from "../../utils/interfaces";

interface StoreListResponse {
    message: string,
    data: IStoreResponse[]
}

export const storeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStoreList: builder.query<StoreListResponse, void>({
            query: () => "/api/store",
            providesTags: ["StoreList"]
        })
    })
})

export const { useGetStoreListQuery } = storeApi
