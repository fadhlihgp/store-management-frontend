export interface IProfileResponse {
    id: string,
    email: string,
    username: string,
    fullName: string,
    phoneNumber?: string,
    lastLogin?: Date,
    isActive: boolean,
    storeId?: string,
    storeName?: string,
    imageId?: string,
    imageUrl?: string,
    roleId?: string,
    roleName?: string
}

export interface IProfileRequest {
    email: string,
    username: string,
    fullName: string,
    phoneNumber?: string,
}

export interface IAccountResponse {
    id: string,
    email: string,
    username: string,
    fullName: string,
    phoneNumber?: string,
    lastLogin?: Date,
    isActive: boolean,
    storeId?: string
    storeName?: string,
    imageId?: string,
    imageUrl?: string,
    roleId: string,
    roleName: string
}

export interface IAccountRequest {
    email: string,
    username: string,
    fullName: string,
    phoneNumber?: string,
    password?: string,
    isActive: boolean,
    storeId?: string,
    roleId: string
}

export interface IStoreResponse {
    id: string,
    name: string,
    address: string,
    phoneNumber: string,
    registerDate: Date,
    businessType: string,
    establishDate: string,
    lastEdited: Date
}

export interface IStoreRequest {
    name: string,
    address: string,
    phoneNumber: string,
    businessType?: string,
    establishDate?: Date
}

export interface IProductListResponse {
    id: string,
    name: string,
    description: string,
    stock: number,
    price: number,
    unitProductId: string,
    unit: string,
    barcode?: string,
    imageId?: string,
    imageUrl?: string,
    createdAt: Date,
    createdBy: string,
    editedAt: Date,
    editedBy: string,
    productPrices: IProductPriceResponse[]
}

export interface IProductDetailResponse {
    id: string,
    name: string,
    description: string,
    stock: number,
    barcode?: string,
    imageUrl?: string,
    createdAt: Date,
    createdBy: string,
    editedAt: Date,
    editedBy: string,
    productPrices: IProductPriceResponse[]
}

export interface IProductRequest {
    name: string,
    description: string,
    stock: number,
    barcode?: string,
    imageId?: string,
    deleteProductPriceId?: string[],
    productPrices: IProductPriceRequest[]
}
export interface IProductPriceRequest {
    price: number,
    unitPrice: string,
    unitPriceId: string,
    qtyPcs: number
}
export interface IProductPriceResponse {
    id: string,
    price: number,
    unitPriceId: string,
    unitPrice: string,
    qtyPcs: number
}

export interface ICustomerResponse {
    id: string,
    fullName: string,
    phoneNumber?: string,
    address?: string,
    email?: string,
    createdAt: Date,
    createdBy: string,
    editedAt: Date,
    editedBy: string
}

export interface ICustomerRequest {
    fullName: string,
    address?: string,
    phoneNumber?: string,
    email?: string
}

export interface INoteOtherRequest {
    title: string,
    content: string
}

export interface INoteOtherResponse {
    id: string,
    title: string,
    content: string,
    createdBy: string,
    createdAt: Date,
    editedBy: string,
    editedAt: Date
}

export interface IIncomeExpenseResponse {
    id: string,
    type: boolean,
    date: Date,
    amount: number,
    note?: string,
    imageUrl?: string,
    createdBy: string,
    createdAt: Date,
    editedBy: string,
    editedAt: Date
}

export interface IIncomeExpenseRequest {
    type: boolean,
    date: Date,
    amount: number,
    note?: string,
    image?: File,
}

export interface IDebtResponseList {
    id: string,
    customerName: string,
    isPaidOff: boolean,
    debtAmount: number
}

export interface IDebtRequest {
    customerId: string,
    debtDetails: IDebtDetailRequest[]
}

export interface IDebtDetailRequest {
    customerId?: string,
    date: Date,
    productId: string,
    count: number,
    unitProductId: string,
    price: number,
    note: string
}

export interface IDebtResponse {
    id: string,
    priceTotal: number,
    customer: ICustomerResponse,
    debtDetails: IDebtDetailResponse[]
}

export interface IDebtDetailResponse {
    id: string,
    date: Date,
    productId: string,
    productName: string,
    count: number,
    unitProductId: string,
    unitProductName: string,
    price: number,
    priceTotal: number,
    note: string,
    isPaid: boolean,
    createdAt: Date,
    createdBy: string,
    editedAt: Date,
    editedBy: string,
    debtId: string
}
export interface ISendLinkOtp{
    email: string
}

export interface IResetPasswordRequest {
    token: string,
    newPassword: string
}
