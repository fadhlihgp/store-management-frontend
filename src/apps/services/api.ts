import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import Cookies from "js-cookie";
import {baseUrlApi} from "../../utils/baseUrlApi";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: baseUrlApi,
    prepareHeaders: async (headers) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = await Cookies.get("token");
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
    /**
     * `reducerPath` is optional and will not be required by most users.
     * This is useful if you have multiple API definitions,
     * e.g. where each has a different domain, with no interaction between endpoints.
     * Otherwise, a single API definition should be used in order to support tag invalidation,
     * among other features
     */
    reducerPath: 'splitApi',
    /**
     * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
     */
    baseQuery: baseQueryWithRetry,
    /**
     * Tag types must be defined in the original API definition
     * for any tags that would be provided by injected endpoints
     */
    tagTypes: ['Profile', 'Account', 'AccountList', 'Store', 'StoreList', "ProductList", "Product", "Customer", "CustomerList", 
        "NoteOtherList", "NoteOther", "NoteIncomeExpenseList", "NoteIncomeExpense", "NoteDebtList", "NoteDebt", "NoteDebtDetailList", "NoteDebtDetail",
        "PurchaseList", "PurchaseDetail", "Parameterizes", "Dashboard", "MasterParameterList", "MasterParameter", "SupplierList", "SupplierDetail",
        "StockInList", "StockInDetail", "StockOutList", "StockOutDetail"
    ],
    /**
     * This api has endpoints injected in adjacent files,
     * which is why no endpoints are shown below.
     * If you want all endpoints defined in the same file, they could be included here instead
     */
    endpoints: () => ({}),
})

export const enhancedApi = api.enhanceEndpoints({
    endpoints: () => ({
        getPost: () => 'test',
    }),
})
