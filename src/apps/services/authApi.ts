import {api} from "./api";

interface LoginResponse {
    message: string,
    data: {
        token: string,
        user: {
            fullName: string,
            email: string,
            roleId: string,
            role: string
        }
    }
}

interface LoginInput {
    email: string,
    password: string
}

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginInput>({
            query: (dataInput: LoginInput) => ({
                url: 'auth/login',
                method: 'POST',
                body: dataInput
            }),
            invalidatesTags: ["Profile"]
        })
    })
})

export const { useLoginMutation } = authApi;
