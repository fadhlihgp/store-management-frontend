import {IDebt} from "../../utils/TableDataType.ts";
import {CustomersDummy} from "../Customer/CustomerDummy.ts";
import {ProductsDummy} from "../Product/ProductDummy.ts";

export const DebtsDummy: IDebt[] = [
    {
        id: "1",
        storeId: "00",
        customerId: CustomersDummy[0].id,
        customer: CustomersDummy[0],
        totalDebt: 2300000,
        debtDetails: [
            {
                id: "1",
                count: 2,
                customerId: CustomersDummy[0].id,
                debtDate: new Date("03-12-2024"),
                storeId: "00",
                isPaid: false,
                createdAt: new Date("03-09-2024"),
                unitId: "01",
                productName: ProductsDummy[0].name,
                productId: ProductsDummy[0].id,
                unit: ProductsDummy[0].productPrices[0].unit,
                price: ProductsDummy[0].productPrices[0].price,
            },
            {
                id: "2",
                count: 1,
                customerId: "1",
                debtDate: new Date("04-10-2024"),
                storeId: "00",
                isPaid: false,
                createdAt: new Date("04-09-2024"),
                unitId: "01",
                productName: ProductsDummy[1].name,
                productId: ProductsDummy[1].id,
                unit: ProductsDummy[1].productPrices[0].unit,
                price: ProductsDummy[1].productPrices[0].price,
            },
        ]
    },
    {
        id: "2",
        storeId: "00",
        customerId: CustomersDummy[1].id,
        customer: CustomersDummy[1],
        totalDebt: 0,
    },
    {
        id: "3",
        storeId: "00",
        customerId: CustomersDummy[2].id,
        customer: CustomersDummy[2],
        totalDebt: 1000000,
        debtDetails: [
            {
                id: "1",
                count: 2,
                customerId: CustomersDummy[2].id,
                debtDate: new Date("03-12-2024"),
                storeId: "00",
                isPaid: true,
                createdAt: new Date("03-09-2024"),
                unitId: "01",
                productName: ProductsDummy[3].name,
                productId: ProductsDummy[3].id,
                unit: ProductsDummy[3].productPrices[0].unit,
                price: ProductsDummy[3].productPrices[0].price,
            },
            {
                id: "2",
                count: 1,
                customerId: CustomersDummy[2].id,
                debtDate: new Date("04-10-2024"),
                storeId: "00",
                isPaid: false,
                createdAt: new Date("04-09-2024"),
                unitId: "01",
                productName: ProductsDummy[1].name,
                productId: ProductsDummy[1].id,
                unit: ProductsDummy[1].productPrices[0].unit,
                price: ProductsDummy[1].productPrices[0].price,
            },
        ]
    },
]