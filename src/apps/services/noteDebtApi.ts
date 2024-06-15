import { IDebtDetailRequest, IDebtRequest, IDebtResponse, IDebtResponseList, IPayDebtRequest } from "../../utils/interfaces";
import { api } from "./api";

interface DebtResponseList {
    message: string,
    data: IDebtResponseList[]
}

interface DebtResponseById {
    message: string,
    data: IDebtResponse
}

interface UpdateDebtDetail {
    id: string,
    data: IDebtDetailRequest
}

export const noteDebtApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNoteDebtList: builder.query<DebtResponseList, void>({
            query: () => 'api/note/debt',
            providesTags: ["NoteDebtList"]
        }),
        getNoteDebtById: builder.query<DebtResponseById, string>({
            query: (id: string) => `api/note/debt/${id}`,
            providesTags: ["NoteDebt"]
        }),
        addNoteDebt: builder.mutation<any, IDebtRequest>({
            query: (data) => ({
                url: 'api/note/debt',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["NoteDebtList", "NoteDebt"]
        }),
        addNoteDebtDetail: builder.mutation<any, IDebtDetailRequest>({
            query: (data) => ({
                url: 'api/note/debt/detail',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["NoteDebtList", "NoteDebt"]
        }),
        deleteNoteDebtDetail: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `api/note/debt/detail/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["NoteDebtDetailList", "NoteDebtList", "NoteDebt"]
        }),
        updateNoteDebtDetail: builder.mutation<any, UpdateDebtDetail>({
            query: ({id, data}) => ({
                url: `api/note/debt/detail/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["NoteDebt", "NoteDebtList"]
        }),
        payDebt: builder.mutation<any, IPayDebtRequest>({
            query: (data) => ({
                url: `api/purchase/pay-debt`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["NoteDebt", "NoteDebtList", "NoteDebtDetailList"]
        })
    })
})

export const { useGetNoteDebtByIdQuery, useGetNoteDebtListQuery, useAddNoteDebtMutation,
    useDeleteNoteDebtDetailMutation, useUpdateNoteDebtDetailMutation, useAddNoteDebtDetailMutation,
    usePayDebtMutation
 } = noteDebtApi