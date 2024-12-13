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
            query: () => '/product',
            providesTags: ["ProductList"]
        }),
        getProductById: builder.query<ProductDetailResponse, string>({
            query: (id: string) => `/product/${id}`,
            providesTags: ["Product"]
        }),
        addProduct: builder.mutation<ProductDetailResponse, IProductRequest>({
            query: (data: IProductRequest) => ({
                url: `/product`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product", "ProductList", "Dashboard"]
        }),
        editProduct: builder.mutation<ProductDetailResponse, EditProductPayload>({
            query: ({id, data}) => ({
                url: `/product/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Product", "ProductList"]
        }),
        deleteProduct: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/product/delete/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["ProductList", "Dashboard"]
        })
    })
})

export const { useGetProductsQuery, 
    useGetProductByIdQuery, 
    useAddProductMutation, 
    useEditProductMutation,
    useDeleteProductMutation
} = productApi