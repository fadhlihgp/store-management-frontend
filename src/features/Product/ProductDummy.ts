import {IProduct} from "../../utils/TableDataType.ts";

export const ProductsDummy: IProduct[] = [
    {
        id: "1",
        name: "Wafer Tango 120gr",
        description: "Ini wafer enak ukuran sedang",
        imageUrl: "https://indolaras.com/wp-content/uploads/2018/09/BK00007-2-65NT-176g.jpg",
        stock: 150,
        createdAt: new Date("03-29-2024"),
        editedBy: "Paijo",
        editedAt: new Date("03-30-2024"),
        createdBy: "Ridwan",
        productPrices: [
            {
                id: "1a",
                price: 5000,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "2a",
                price: 50000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    },
    {
        id: "2",
        name: "Chips Ahoy Chocolate Chip Cookies 120gr",
        description: "Nikmati kelezatan cokelat chips di setiap gigitannya.",
        imageUrl: "https://i5.walmartimages.com/asr/340b53f5-1a21-4a14-aa4c-f9742dd3bc32_1.69cd24e1aa9be4278c0c2c7c2fefcb9c.jpeg",
        stock: 200,
        createdAt: new Date("03-01-2024"),
        editedBy: "Angga",
        productPrices: [
            {
                id: "2b",
                price: 6000,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "3b",
                price: 55000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    },
    {
        id: "3",
        name: "Oreo Original 137gr",
        description: "Biskuit lezat dengan lapisan krim vanila.",
        imageUrl: "https://naveedtradingcompany.com/wp-content/uploads/2019/01/1429aw.jpg",
        stock: 180,
        createdAt: new Date("01-29-2024"),
        editedBy: "Paijo",
        editedAt: new Date("02-19-2024"),
        createdBy: "Aji",
        productPrices: [
            {
                id: "4c",
                price: 7000,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "5c",
                price: 60000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    },
    {
        id: "4",
        name: "KitKat Chocolate Bar 45gr",
        description: "Wafel renyah dengan lapisan cokelat lezat.",
        stock: 160,
        createdAt: new Date("03-29-2024"),
        editedBy: "Paijo",
        productPrices: [
            {
                id: "6d",
                price: 4500,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "7d",
                price: 40000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    },
    {
        id: "5",
        name: "Ritz Crackers 200gr",
        description: "Biskuit gurih dengan renyah yang memikat.",
        stock: 190,
        createdAt: new Date("03-29-2023"),
        editedBy: "Rangga",
        productPrices: [
            {
                id: "8e",
                price: 5500,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "9e",
                price: 50000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    },
    {
        id: "6",
        name: "Doritos Nacho Cheese 65gr",
        description: "Keripik jagung dengan cita rasa keju yang menggoda.",
        imageUrl: "https://d2j6dbq0eux0bg.cloudfront.net/images/29469033/1472635726.jpg",
        stock: 170,
        createdAt: new Date("03-29-2024"),
        editedBy: "Paijo",
        editedAt: new Date("03-30-2024"),
        createdBy: "Ridwan",
        productPrices: [
            {
                id: "10f",
                price: 6000,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "11f",
                price: 55000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    },
    {
        id: "7",
        name: "Pringles Original 110gr",
        description: "Keripik kentang dengan rasa gurih yang tak tertandingi.",
        stock: 180,
        createdAt: new Date("03-29-2024"),
        editedBy: "Simon",
        editedAt: new Date(),
        createdBy: "Seo",
        productPrices: [
            {
                id: "12g",
                price: 6500,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "13g",
                price: 60000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    },
    {
        id: "8",
        name: "Lay's Classic Potato Chips 160gr",
        description: "Nikmati kelezatan keripik kentang dengan cita rasa klasik.",
        stock: 175,
        createdAt: new Date("03-29-2024"),
        editedBy: "Ammar",
        editedAt: new Date("03-30-2024"),
        createdBy: "Angle",
        productPrices: [
            {
                id: "14h",
                price: 7000,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "15h",
                price: 65000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    },
    {
        id: "9",
        name: "Tostitos Scoops Tortilla Chips 283gr",
        description: "Keripik tortilla yang cocok untuk dicocol dengan salsa atau guacamole.",
        imageUrl: "https://whistlerdelivery.ca/wp-content/uploads/2020/12/Tostitos-scoop-700x700.jpg",
        stock: 185,
        createdAt: new Date("03-29-2024"),
        editedBy: "Paijo",
        editedAt: new Date("03-30-2024"),
        createdBy: "Seilla",
        productPrices: [
            {
                id: "16i",
                price: 7500,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "17i",
                price: 70000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    },
    {
        id: "10",
        name: "Doritos Cool Ranch 62gr",
        description: "Nikmati sensasi kelezatan rasa krim asam yang unik.",
        // imageUrl: "https://example.com/image10.jpg",
        barcode: "12221222",
        stock: 165,
        createdAt: new Date("03-29-2024"),
        editedBy: "Romo",
        productPrices: [
            {
                id: "18j",
                price: 6500,
                qtyPcs: 1,
                type: "Normal",
                unit: "Pcs"
            },
            {
                id: "19j",
                price: 60000,
                qtyPcs: 50,
                type: "Normal",
                unit: "Box"
            }
        ]
    }
]