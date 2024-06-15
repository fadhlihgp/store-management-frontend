export const convertCurrency = (typeCurr: string, value: number): string => {
    const isNegative = value < 0 ? "-" : "";

    // Memastikan nilai angka non-negatif
    value = Math.abs(value);

    // Menggunakan method toLocaleString() untuk menambahkan pemisah ribuan
    const formattedValue = value.toLocaleString('id-ID');

    return  `${isNegative}${typeCurr} ${formattedValue}`;
}