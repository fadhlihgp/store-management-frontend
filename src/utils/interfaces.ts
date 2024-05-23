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
    unit: string,
    barcode?: string,
    imageId?: string,
    imageUrl?: string,
    createdAt: Date,
    createdBy: string,
    editedAt: Date,
    editedBy: string
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
