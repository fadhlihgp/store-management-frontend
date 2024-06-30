import {api} from "./api";
import {IPurchaseListResponse, IPurchaseRequest, IPurchaseResponse} from "../../utils/interfaces";

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
        }),
        createPurchase: builder.mutation<PurchaseResponse, IPurchaseRequest>({
            query: (body: IPurchaseRequest) => ({
                url: `api/purchase/paid`,
                method: 'POST',
                body
            }),
            invalidatesTags: ["PurchaseList"]
        })
    })
})

export const { useGetPurchaseListQuery, useGetPurchaseDetailQuery, useCreatePurchaseMutation } = purchaseApi;