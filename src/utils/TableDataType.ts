
export interface IBreadcrumbData {
    name: string,
    url: string
}

export interface IStore {
    id: string,
    name: string,
    address: string,
    phone: string,
    registerDate: Date,
    established?: number,
    businessType: string,
    owner?: IAccount[]
}

export interface IAccount {
    id: string,
    email: string,
    userName: string,
    fullName: string,
    phone: string,
    role: string,
    password?: string,
    address?: string,
    lastLogin: Date,
    isActive: boolean,
    isDelete: boolean,
    storeId?: string
}

export interface ICustomer {
    id: string,
    fullName: string,
    phone?: string,
    address?: string,
    email?: string,
    storeId: string,
    createdBy: string,
    createdAt: Date,
    editedBy?: string,
    editedAt?: Date
}

export interface IProductPrice {
    id: string,
    price: number,
    unit: string,
    type: string,
    qtyPcs: number
}

export interface IProduct {
    id: string,
    name: string,
    description?: string,
    imageUrl?: string,
    stock: number,
    barcode?: string,
    createdBy?: string,
    createdAt?: Date,
    editedBy?: string,
    editedAt?: Date,
    productPrices: IProductPrice[]
}