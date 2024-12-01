import moment from "moment"
import { ICustomerResponse, IDebtDetailResponse } from "../../utils/interfaces"
import { convertCurrency } from "../../utils/convertCurrency"

interface DebtReportProps {
    customer: ICustomerResponse
    debtDetails?: IDebtDetailResponse[]
}

export const DebtReport = ({customer, debtDetails}: DebtReportProps) => {
    const total = debtDetails?.filter(d => !d.isPaid).reduce((acc, cur) => acc + (cur.count * cur.price), 0);

    return (
        <div>
            <div className="py-4">
                <div className="px-14 py-6">
                <table className="w-full border-collapse border-spacing-0">
                    <tbody>
                    <tr className='flex justify-between'>
                        <td className="w-full align-top flex items-center gap-2">
                            <img src='/roundstore.png' className='h-16' />
                            <div className='flex flex-col'>
                            <div className='font-bold text-2xl uppercase'>
                                Warung Parno
                            </div>
                            <div className='text-sm text-slate-400'>
                                Jalan bonjol, Jakasetia, Bekasi Selatan <br/>
                                0898882233
                            </div>
                            </div>
                        </td>
                        <td className="align-top">
                        <div className="text-sm">
                            <table className="border-collapse border-spacing-0">
                            <tbody>
                                <tr>
                                <td className="border-r pr-4">
                                    <div>
                                    <p className="whitespace-nowrap text-slate-400 text-right">
                                        Tanggal Dicetak
                                    </p>
                                    <p className="whitespace-nowrap font-bold text-main text-right">
                                        {moment(new Date()).format('DD MMMM YYYY HH:mm')}
                                    </p>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className="bg-slate-100 px-14 py-6 text-sm">
                <h1 className='text-2xl text-center font-bold mb-4 uppercase'>Laporan Data Hutang</h1>
                <table className="w-full border-collapse border-spacing-0">
                    <tbody>
                    <tr>
                        <td className="w-1/2 align-top ">
                        <div className="text-neutral-600">
                            <p className="font-bold">Data Pelanggan</p>
                            <p>Nama: {customer.fullName}</p>
                            <p>Alamat: {customer.address ?? "-"}</p>
                            <p>No Ponsel: {customer.phoneNumber ?? "-"}</p>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className="px-7 py-5 text-sm text-neutral-700">

                <table className="w-full border-collapse border-spacing-0">
                    <thead>
                    <tr>
                        <td className="border-b-2 border-main pb-3 pl-3 font-bold text-main">
                        No
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 font-bold text-main">
                        Produk
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
                        Status
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
                        Tanggal Hutang
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
                        Jumlah
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
                        Harga
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 pr-3 text-right font-bold text-main">
                        Total
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {debtDetails?.map((item, index) => (
                        <tr key={index}>
                            <td className="border-b py-3 pl-3">{index + 1}.</td>
                            <td className="border-b py-3 pl-2">{item.productName}</td>
                            <td className="border-b py-3 pl-2 text-right">{item.isPaid ? "Sudah Bayar" : "Belum Bayar"}</td>
                            <td className="border-b py-3 pl-2 text-center">{moment(item.date).format("DD MMM YYYY")}</td>
                            <td className="border-b py-3 pl-2 text-center">{item.count} {item.unitProductName}</td>
                            <td className="border-b py-3 pl-2 text-right">{convertCurrency("Rp", item.price)}</td>
                            <td className="border-b py-3 pl-2 pr-3 text-right">{item.isPaid ? "-" : ""}{convertCurrency("Rp", item.count * item.price)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <table className="w-full border-collapse border-spacing-0">
                    <tbody>
                        <tr>
                        <td className="w-full" />
                        <td>
                            <table className="w-full border-collapse border-spacing-0">
                            <tbody>
                                <tr>
                                <td className="p-3">
                                    <div className="whitespace-nowrap text-slate-400">
                                    Total Sisa Hutang:
                                    </div>
                                </td>
                                <td className="p-3 text-right">
                                    <div className="whitespace-nowrap font-bold text-main">
                                    {total}
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="px-14 py-10 text-sm text-neutral-700">
                <footer className="fixed bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
                    Created by Fadhlih App
                    <span className="text-slate-300 px-2">|</span>
                    https://kelolawarung.fadhlih.com
                    <span className="text-slate-300 px-2">|</span>
                    +62813-7272-3854
                </footer>
                </div>
            </div>
        </div>
    )
}