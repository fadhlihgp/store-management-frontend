import { baseSubUrl } from "../../utils/baseUrlApi";
import { IProductDetailResponse, IProductListResponse, IProductRequest, IStockInOutResponse, IStockInRequest, IStockOutRequest, RequestApi, ResponseApi } from "../../utils/interfaces";
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
            invalidatesTags: ["Product", "ProductList", "Dashboard", "StockInList", "StockOutList", "StockInDetail", "StockOutDetail"]
        }),
        editProduct: builder.mutation<ProductDetailResponse, EditProductPayload>({
            query: ({id, data}) => ({
                url: `/product/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Product", "ProductList", "StockInList", "StockOutList", "StockInDetail", "StockOutDetail", "PurchaseList", "PurchaseDetail"]
        }),
        deleteProduct: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/product/delete/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["ProductList", "Dashboard"]
        }),

        // STOCK IN FEATURES
        getStockInList: builder.query<ResponseApi<IStockInOutResponse[]>, void>({
            query: () => `/${baseSubUrl.product}/${baseSubUrl.stockIn}`,
            providesTags: ["StockInList"]
        }),
        getStockInById: builder.query<ResponseApi<IStockInOutResponse>, string>({
            query: (id: string) => `/${baseSubUrl.product}/${baseSubUrl.stockIn}/detail/${id}`,
            providesTags: ["StockInDetail"]
        }),
        addStockIn: builder.mutation<ResponseApi<IStockInOutResponse>, IStockInRequest>({
            query: (data: IStockInRequest) => ({
                url: `/${baseSubUrl.product}/${baseSubUrl.stockIn}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["StockInList", "StockInDetail", "ProductList", "Product"]
        }),
        editStockIn: builder.mutation<ResponseApi<IStockInOutResponse>, RequestApi<IStockInRequest>>({
            query: ({id, data}) => ({
                url: `/${baseSubUrl.product}/${baseSubUrl.stockIn}/update/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["StockInList", "StockInDetail", "ProductList", "Product"]
        }),
        deleteStockIn: builder.mutation<ResponseApi<IStockInOutResponse>, string>({
            query: (id: string) => ({
                url: `/${baseSubUrl.product}/${baseSubUrl.stockIn}/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["StockInList", "StockInDetail", "ProductList", "Product"]
        }),

        // STOCK OUT FEATURES
        getStockOutList: builder.query<ResponseApi<IStockInOutResponse[]>, void>({
            query: () => `/${baseSubUrl.product}/${baseSubUrl.stockOut}`,
            providesTags: ["StockOutList"]
        }),
        getStockOutById: builder.query<ResponseApi<IStockInOutResponse>, string>({
            query: (id: string) => `/${baseSubUrl.product}/${baseSubUrl.stockOut}/detail/${id}`,
            providesTags: ["StockOutDetail"]
        }),
        addStockOut: builder.mutation<ResponseApi<IStockInOutResponse>, IStockOutRequest>({
            query: (data: IStockOutRequest) => ({
                url: `/${baseSubUrl.product}/${baseSubUrl.stockOut}`,
                method:"POST",
                body: data
            }),
            invalidatesTags: ["StockOutList", "StockOutDetail", "ProductList", "Product"]
        }),
        editStockOut: builder.mutation<ResponseApi<IStockInOutResponse>, RequestApi<IStockOutRequest>>({
            query: ({id, data}) => ({
                url: `/${baseSubUrl.product}/${baseSubUrl.stockOut}/update/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["StockOutList", "StockOutDetail", "ProductList", "Product"]
        }),
        deleteStockOut: builder.mutation<ResponseApi<IStockInOutResponse>, string>({
            query: (id: string) => ({
                url: `/${baseSubUrl.product}/${baseSubUrl.stockOut}/delete/${id}`,
                method: 'DELETE' 
            }),
            invalidatesTags: ["StockOutList", "StockOutDetail", "ProductList", "Product"]
        })
    })
})

export const { useGetProductsQuery, 
    useGetProductByIdQuery, 
    useAddProductMutation, 
    useEditProductMutation,
    useDeleteProductMutation,
    useGetStockInListQuery, useGetStockInByIdQuery, useAddStockInMutation, useEditStockInMutation, useDeleteStockInMutation,
    useGetStockOutListQuery, useGetStockOutByIdQuery, useAddStockOutMutation, useEditStockOutMutation, useDeleteStockOutMutation
} = productApi