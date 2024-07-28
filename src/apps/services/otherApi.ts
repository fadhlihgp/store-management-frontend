import { IDashboardResponse, IParameterizeResponse } from "../../utils/interfaces";
import { api } from "./api";

interface otherApiResponse {
    message: string,
    data: IParameterizeResponse[]
}

interface dashboardApiResponse {
    message: string,
    data: IDashboardResponse
}

export const otherApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getParameterize: builder.query<otherApiResponse, string>({
            query: (type:string) => `/other/parameterize/${type}`,
            providesTags: ["Parameterizes"]
        }),
        getDashboard: builder.query<dashboardApiResponse, void>({
            query: () => `/other/dashboard`,
            providesTags: ["Dashboard"]
        })
    })
})

export const { useGetParameterizeQuery, useGetDashboardQuery } = otherApi;