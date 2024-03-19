export const convertCurrency = (typeCurr: string, value: number): string => {
    // Memastikan nilai angka non-negatif
    value = Math.abs(value);

    // Menggunakan method toLocaleString() untuk menambahkan pemisah ribuan
    const formattedValue = value.toLocaleString('id-ID');

    return  `${typeCurr} ${formattedValue}`;
}