import {IIncomeExpense} from "../../utils/TableDataType.ts";

export const incomeExpensesDummy: IIncomeExpense[] = [
    {
        id: "1",
        createdAt: new Date(),
        createdBy: "Andi",
        dateNote: new Date("03-19-2024"),
        nominal: 300000,
        status: false,
        note: "Bayar Pengajian",
        imageUrl: "https://res.cloudinary.com/do5gw4vcx/image/upload/v1709621234/ziokdesnvky9ezizjwxp.png"
    },
    {
        id: "2",
        createdAt: new Date("05-02-2024"),
        createdBy: "Soraya",
        dateNote: new Date("02-19-2024"),
        nominal: 300000,
        status: true,
        note: "Dapat Saham",
        // imageUrl: "https://res.cloudinary.com/do5gw4vcx/image/upload/v1709621234/ziokdesnvky9ezizjwxp.png"
    },
    {
        id: "3",
        createdAt: new Date(),
        createdBy: "Andi",
        dateNote: new Date("03-10-2024"),
        nominal: 25000,
        status: false,
        note: "Cukur Rambut",
    },
    {
        id: "4",
        createdAt: new Date("01-01-2024"),
        createdBy: "Andi",
        dateNote: new Date("01-10-2024"),
        nominal: 250000,
        status: false,
        note: "Bayar Sampah",
    }
]