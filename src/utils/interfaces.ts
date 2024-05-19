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
