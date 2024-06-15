import {api} from "./api";
import {IPurchaseListResponse, IPurchaseResponse} from "../../utils/interfaces";

interface PurchaseListResponse {
    message: string,
    data: IPurchaseListResponse[]
}

interface PurchaseResponse {
    message: string,
    data: IPurchaseResponse
}

export const purchaseApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPurchaseList: builder.query<PurchaseListResponse, string | undefined>({
            query: (param: string | undefined) => `api/purchase${param}`,
            providesTags: ["PurchaseList"]
        }),
        getPurchaseDetail: builder.query<PurchaseResponse, string>({
            query: (id: string) => `api/purchase/${id}`,
            providesTags: ["PurchaseDetail"]
        })
    })
})

export const { useGetPurchaseListQuery, useGetPurchaseDetailQuery } = purchaseApi;