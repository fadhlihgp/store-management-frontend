import { IDashboardResponse, IMasterParameterRequest, IMasterParameterResponse, IParameterizeResponse, RequestApi, ResponseApi } from "../../utils/interfaces";
import { api } from "./api";

interface dashboardApiResponse {
    message: string,
    data: IDashboardResponse
}
const otherBase = '/other';

export const otherApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getParameterize: builder.query<ResponseApi<IParameterizeResponse[]>, string>({
            query: (type:string) => `/other/parameterize/type/${type}`,
            providesTags: ["Parameterizes"]
        }),
        getDashboard: builder.query<dashboardApiResponse, void>({
            query: () => `/other/dashboard`,
            providesTags: ["Dashboard"]
        }),

        // Endpoint master parameter for superadmin
        getMasterParameter: builder.query<ResponseApi<IMasterParameterResponse[]>, void>({
            query: () => `${otherBase}/parameterize/all`,
            providesTags: ["MasterParameterList"]
        }),
        getMasterParameterById: builder.query<ResponseApi<IMasterParameterResponse>, string>({
            query: (id: string) => `${otherBase}/parameterize/detail/${id}`,
            providesTags: ["MasterParameter"]
        }),
        addMasterParameter: builder.mutation<ResponseApi<IMasterParameterResponse>, IMasterParameterRequest>({
            query: (data) => ({
                url: `${otherBase}/parameterize/create`,
                body: data,
                method: "POST"
            }),
            invalidatesTags: ["Parameterizes", "MasterParameterList"]
        }),
        updateMasterParameter: builder.mutation<ResponseApi<IMasterParameterResponse>, RequestApi<IMasterParameterRequest>>({
            query: ({id, data}) => ({
                url: `${otherBase}/parameterize/edit/${id}`,
                body: data,
                method: "PUT"
            }),
            invalidatesTags: ["MasterParameter", "MasterParameterList", "Parameterizes"]
        }),
        deleteMasterParameter: builder.mutation<ResponseApi<IMasterParameterResponse>, string>({
            query: (id: string) => ({
                url: `${otherBase}/parameterize/delete/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Parameterizes", "MasterParameter", "MasterParameterList"]
        })
    })
})

export const { useGetParameterizeQuery, useGetDashboardQuery, useGetMasterParameterQuery, useGetMasterParameterByIdQuery, 
    useAddMasterParameterMutation, useUpdateMasterParameterMutation, useDeleteMasterParameterMutation
 } = otherApi;