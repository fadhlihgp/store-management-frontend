import { IParameterizeResponse } from "../../utils/interfaces";
import { api } from "./api";

interface otherApiResponse {
    message: string,
    data: IParameterizeResponse[]
}
export const otherApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getParameterize: builder.query<otherApiResponse, string>({
            query: (type:string) => `api/other/parameterize/${type}`,
            providesTags: ["Parameterizes"]
        })
    })
})

export const { useGetParameterizeQuery } = otherApi;