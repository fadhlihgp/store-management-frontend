import { IProductDetailResponse, IProductListResponse, IProductRequest } from "../../utils/interfaces";
import { api } from "./api";

interface ProductListResponse {
    message: string,
    data: IProductListResponse[]
}

interface ProductDetailResponse {
    message: string,
    data: IProductDetailResponse
}

interface EditProductPayload {
    id: string,
    data: IProductRequest
}

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductListResponse, void>({
            query: () => '/api/product',
            providesTags: ["ProductList"]
        }),
        getProductById: builder.query<ProductDetailResponse, string>({
            query: (id: string) => `/api/product/${id}`,
            providesTags: ["Product"]
        }),
        addProduct: builder.mutation<ProductDetailResponse, IProductRequest>({
            query: (data: IProductRequest) => ({
                url: `api/product`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product", "ProductList"]
        }),
        editProduct: builder.mutation<ProductDetailResponse, EditProductPayload>({
            query: ({id, data}) => ({
                url: `api/product/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Product", "ProductList"]
        }),
        deleteProduct: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `api/product/delete/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["ProductList"]
        })
    })
})

export const { useGetProductsQuery, 
    useGetProductByIdQuery, 
    useAddProductMutation, 
    useEditProductMutation,
    useDeleteProductMutation
} = productApi