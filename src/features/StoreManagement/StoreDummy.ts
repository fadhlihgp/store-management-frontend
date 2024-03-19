import {IStore} from "../../utils/TableDataType.ts";

export const StoresDummy: IStore[] = [
    {
        id: "1",
        address: "Bekasi",
        name: "Alfa Store",
        phone: "089898",
        businessType: "Supermarket",
        established: 2020,
        registerDate: new Date("10-12-2022"),
        owner: [
            {
                id: "1",
                email: "andri@example.com",
                fullName: "Andri Ningrat",
                userName: "andri17",
                phone: "089898",
                password: undefined,
                address: "Bekasi",
                role: "Admin",
                storeId: "Agra Store",
                lastLogin: new Date(),
                isActive:true,
                isDelete: false
            }
        ]
    },
    {
        id: "2",
        address: "Jakarta",
        name: "Rio Mart",
        phone: "01232333",
        businessType: "Minimarket",
        registerDate: new Date("01-01-2010"),
        owner: [
            {
                id: "2",
                email: "ridwan@example.com",
                fullName: "Ridwan Ningrat",
                userName: "ridwan17",
                phone: "089898",
                password: undefined,
                address: "Bekasi",
                role: "Admin",
                storeId: "Agra Store",
                lastLogin: new Date(),
                isActive:true,
                isDelete: false
            }
        ]
    },
    {
        id: "3",
        address: "Tangerang",
        name: "Hijab Fasion",
        phone: "08978787",
        businessType: "Fashion",
        registerDate: new Date("12-05-2023"),
        owner: [
            {
                id: "1",
                email: "umar@example.com",
                fullName: "Umar Ningrat",
                userName: "umar17",
                phone: "089898",
                password: undefined,
                address: "Bekasi",
                role: "Admin",
                storeId: "Agra Store",
                lastLogin: new Date(),
                isActive:true,
                isDelete: false
            }
        ]
    },
    {
        id: "4",
        address: "Bekasi",
        name: "Indo Maret",
        phone: "089746344",
        businessType: "Supermarket",
        established: 2019,
        registerDate: new Date("12-12-2000"),
        owner: [
            {
                id: "1",
                email: "angle@example.com",
                fullName: "Angle Ningrat",
                userName: "angle17",
                phone: "089898",
                password: undefined,
                address: "Bekasi",
                role: "Admin",
                storeId: "Agra Store",
                lastLogin: new Date(),
                isActive:true,
                isDelete: false
            }
        ]
    }
]