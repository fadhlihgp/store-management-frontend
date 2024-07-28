import { INoteOtherRequest, INoteOtherResponse } from "../../utils/interfaces";
import { api } from "./api";

interface NoteOtherListResponse {
    message: string,
    data: INoteOtherResponse[]
}

interface NoteOtherResponse {
    message: string,
    data: INoteOtherResponse
}

interface NoteOtherEditRequest {
    id: string,
    data: INoteOtherRequest
}

export const noteOtherApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNoteOtherList: builder.query<NoteOtherListResponse, void>({
            query: () => '/note/other',
            providesTags: ["NoteOtherList"]
        }),
        getNoteOtherById: builder.query<NoteOtherResponse, string>({
            query: (id: string) => `/note/other/${id}`,
            providesTags: ["NoteOther"]
        }),
        createNoteOther: builder.mutation<NoteOtherResponse, INoteOtherRequest>({
            query: (data) => ({
                url: `/note/other`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["NoteOtherList"]
        }),
        updateNoteOther: builder.mutation<NoteOtherResponse, NoteOtherEditRequest>({
            query: ({id, data}) => ({
                url: `/note/other/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["NoteOther", "NoteOtherList"]
        }),
        deleteNoteOther: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/note/other/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["NoteOtherList"]
        })
    })
})

export const { useCreateNoteOtherMutation, useDeleteNoteOtherMutation, useGetNoteOtherByIdQuery,
    useGetNoteOtherListQuery, useUpdateNoteOtherMutation
 } = noteOtherApi;