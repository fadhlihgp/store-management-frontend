import moment from "moment"
import { IPurchaseListResponse } from "../../utils/interfaces"
import { convertCurrency } from "../../utils/convertCurrency"
import { useGetCurrentStoreQuery } from "../../apps/services/storeApi"

interface PurchaseReportProps {
    startDate: Date
    endDate: Date
    data: IPurchaseListResponse[]
}

export const PurchaseReport = ({startDate, endDate, data}: PurchaseReportProps) => {
    const total = data?.filter(d => d.status == "paid").reduce((acc, cur) => acc + cur.purchaseTotal, 0);
    const {data: currentStore} = useGetCurrentStoreQuery();

    return (
        <div>
            <div className="py-4">
                <div className="px-14 py-6">
                <table className="w-full border-collapse border-spacing-0">
                    <tbody>
                    <tr className='flex justify-between'>
                        <td className="w-full align-top flex items-center gap-2">
                            <img src='/roundstore.png' className='h-16' alt="logo" />
                            <div className='flex flex-col'>
                            <div className='font-bold text-2xl uppercase'>
                                {currentStore?.data?.name}
                            </div>
                            <div className='text-sm text-slate-400'>
                                {currentStore?.data?.address} <br/>
                                {currentStore?.data?.phoneNumber}
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
                <h1 className='text-2xl text-center font-bold mb-4 uppercase'>Laporan Transaksi</h1>
                <table className="w-full border-collapse border-spacing-0">
                    <tbody>
                    <tr>
                        <td className="w-1/2 align-top ">
                        <div className="text-neutral-600">
                            <p className="font-bold">Periode</p>
                            <p>Dari: {moment(startDate).format("DD MMMM YYYY")}</p>
                            <p>Hingga: {moment(endDate).format("DD MMMM YYYY")}</p>
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
                        Invoice
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main w-1/5">
                        Nama Pelanggan
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
                        Tanggal
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main w-1/5">
                        Catatan
                        </td>
                        <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
                        Total
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map((item, index) => (
                        <tr key={index}>
                            <td className="border-b py-3 pl-3">{index + 1}.</td>
                            <td className="border-b py-3 pl-2">{item.invoice}</td>
                            <td className="border-b py-3 pl-2 text-center w-1/5 break-words whitespace-normal">{item.customer}</td>
                            <td className="border-b py-3 pl-2 text-center">{moment(item.date).format("DD MMM YYYY")}</td>
                            <td className="border-b py-3 pl-2 text-center w-1/5 break-words whitespace-normal">{item.note}</td>
                            <td className="border-b py-3 pl-2 text-right">{convertCurrency("Rp", item.purchaseTotal)}</td>
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
                                    Total Transaksi:
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