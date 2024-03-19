import {ICustomer} from "../../utils/TableDataType.ts";

export const CustomersDummy: ICustomer[] = [
    {
        id: "1",
        fullName: "Adinda Azani",
        address: "Rawamangun",
        email: "adinda@email.com",
        phone: "089888877",
        storeId: "1",
        createdAt: new Date("03-18-2023"),
        createdBy: "Gio"
    },
    {
        id: "2",
        fullName: "Azzahra",
        address: "Pekayon",
        email: "azzahra@email.com",
        phone: "089888877",
        storeId: "1",
        createdAt: new Date("03-15-2023"),
        createdBy: "Gio",
        editedAt: new Date(),
        editedBy: "Abraa"
    },
    {
        id: "3",
        fullName: "Rio Ferdinand",
        address: "Jakasetia",
        // email: "adinda@email.com",
        phone: "08988817",
        storeId: "1",
        createdAt: new Date("03-10-2023"),
        createdBy: "Gio"
    },
    {
        id: "4",
        fullName: "Siti Amaa",
        // address: "Tangerang",
        // email: "adinda@email.com",
        phone: "089888877",
        storeId: "1",
        createdAt: new Date("02-18-2023"),
        createdBy: "Gio"
    }
]