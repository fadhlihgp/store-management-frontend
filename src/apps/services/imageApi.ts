import { api } from "./api"

interface ImageUploadResponse {
    message: string,
    data: {
        id: string,
        photoUrl: string,
        publicId: string
    }
}

interface ImageDeleteResponse {
    message: string,
    isSuccess: boolean
}

export const imageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation<ImageUploadResponse, FormData>({
            query: (image: FormData) => ({
                url: `/image`,
                method: 'POST',
                body: image
            })
        }),
        deleteImage: builder.mutation<ImageDeleteResponse, string>({
            query: (id: string) => `/image/${id}`
        })
    })
})

export const { useUploadImageMutation, useDeleteImageMutation } = imageApi