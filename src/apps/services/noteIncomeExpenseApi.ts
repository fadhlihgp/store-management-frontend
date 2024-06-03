import { IIncomeExpenseRequest, IIncomeExpenseResponse } from "../../utils/interfaces";
import moment from "moment";
import { api } from "./api";

interface IncomeExpenseListResponse {
    message: string,
    data: IIncomeExpenseResponse[]
}

interface IncomeExpenseResponse {
    message: string,
    data: IIncomeExpenseResponse
}

interface EditIncomeExpenseRequest {
    id: string,
    data: IIncomeExpenseRequest
}

export const noteIncomeExpenseApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNoteIncomeExpenses: builder.query<IncomeExpenseListResponse, void>({
            query: () => 'api/note/income-expense',
            providesTags: ["NoteIncomeExpenseList"]
        }),
        getNoteIncomeExpenseById: builder.query<IncomeExpenseResponse, string>({
            query: (id: string) => `api/note/income-expense/${id}`,
            providesTags: ["NoteIncomeExpense"]
        }),
        addNoteIncomeExpense: builder.mutation<IncomeExpenseResponse, IIncomeExpenseRequest>({
            query: (data) => {
                const formData = new FormData();
                formData.append('type', data.type.toString());
                formData.append('date', moment(data.date).format("YYYY-MM-DD"));
                formData.append('amount', data.amount.toString());
                if (data.note) formData.append('note', data.note);
                if (data.image) formData.append('image', data.image);

                return {
                    url: 'api/note/income-expense',
                    method: "POST",
                    body: formData
                }
            },
            invalidatesTags: ["NoteIncomeExpenseList"]
        }),
        editNoteIncomeExpense: builder.mutation<IncomeExpenseResponse, EditIncomeExpenseRequest>({
            query: ({id, data}) => {
                const formData = new FormData();
                formData.append('type', data.type.toString());
                formData.append('date', data.date.toISOString());
                formData.append('amount', data.amount.toString());
                if (data.note) formData.append('note', data.note);
                if (data.image) formData.append('image', data.image);

                return {
                    url: `api/note/income-expense/${id}`,
                    method: "PUT",
                    body: formData
                }
            },
            invalidatesTags: ["NoteIncomeExpenseList", "NoteIncomeExpense"]
        }),
        deleteNoteIncomeExpense: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `api/note/income-expense/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["NoteIncomeExpenseList"]
        })
    })
})

export const { useAddNoteIncomeExpenseMutation, useGetNoteIncomeExpenseByIdQuery, 
    useDeleteNoteIncomeExpenseMutation, useEditNoteIncomeExpenseMutation, useGetNoteIncomeExpensesQuery
 } = noteIncomeExpenseApi