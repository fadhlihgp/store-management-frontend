
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

export interface IDebtDetail {
    id: string,
    createdAt: Date,
    productId: string,
    productName: string,
    count: number,
    price: number,
    note?: string,
    unitId: string,
    unit: string,
    customerId: string,
    storeId: string,
    debtDate: Date,
    isPaid: boolean,
}

export interface IDebt {
    id: string,
    customerId: string,
    storeId: string,
    totalDebt: number,
    customer: ICustomer,
    debtDetails?: IDebtDetail[]
}

export interface IDebtForm {
    customerId: string,
    debtDate: string,
    productId: string,
    unit: string,
    count: number,
    price: number,
    note: string
}

export interface IIncomeExpense {
    id: string,
    dateNote: Date,
    nominal: number,
    note?: string,
    createdAt: Date,
    createdBy: string,
    editedAt?: Date,
    editedBy?: string,
    status: boolean,
    imageUrl?: string,
    publicId?: string
}

export interface IIncomeExpenseForm {
    dateNote: string,
    nominal: number,
    note?: string,
    imageUrl?: string,
    status: boolean
}

export interface INote {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    createdBy: string,
    editedAt?: Date,
    editedBy?: string
}

export interface INoteForm {
    title: string,
    description: string,
}
