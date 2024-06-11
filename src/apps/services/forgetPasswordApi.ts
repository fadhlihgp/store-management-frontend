import { IResetPasswordRequest, ISendLinkOtp } from '../../utils/interfaces';
import { api } from './api';

interface ForgetPasswordResponse {
    message: string
}

export const forgetPasswordApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sendLinkOtp: builder.mutation<ForgetPasswordResponse, ISendLinkOtp>({
            query: (dataInput: ISendLinkOtp) => ({
                url: '/api/auth/forget-password/send-otp',
                method: 'POST',
                body: dataInput
            })
        }),
        verifyOtp: builder.query<any, string>({
            query: (token: string) => `/api/auth/forget-password/verify-otp/${token}`
        }),
        resetPassword: builder.mutation<ForgetPasswordResponse, IResetPasswordRequest>({
            query: (dataInput: IResetPasswordRequest) => ({
                url: '/api/auth/forget-password/reset-password',
                method: 'POST',
                body: dataInput 
            })
        })
    })
})

export const { useResetPasswordMutation, useVerifyOtpQuery, useSendLinkOtpMutation } = forgetPasswordApi;