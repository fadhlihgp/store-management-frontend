import { useParams } from "react-router-dom"
import { PageHeading } from "../../../components/Cards/PageHeading"
import { IBreadcrumbData } from "../../../utils/TableDataType"
import { PrinterIcon } from "@heroicons/react/24/outline"
import { OrderDetail } from "../Components/OrderDetail"
import { PaymentDetail } from "../Components/PaymentDetail"
import { useGetPurchaseDetailQuery } from "../../../apps/services/purchaseApi"
import FailedLoad from "../../../components/OtherDisplay/FailedLoad"
import { LoadingProcess } from "../../../components/Loading/LoadingProcess"
import { MaximumWordLength } from "../../../utils/MaximumWordLength"
import { convertCurrency } from "../../../utils/convertCurrency"

const breadcrumbsData: IBreadcrumbData[] = [
    {
        name: "Riwayat Transaksi",
        url: "/transaction-history"
    },
    {
        url: "/purchase/detail/:id",
        name: "Detail"
    }
]

export const PurchaseDetailContainer = () => {
    const {id} = useParams();
    const {data: purchaseDetail, isError, isLoading} = useGetPurchaseDetailQuery(id ?? "-");
    const MainContent = isError ? <FailedLoad /> : ( purchaseDetail &&
        <>
            <PageHeading
                titlePage="Detail Transaksi"
                breadcrumbsData={breadcrumbsData}
                key={"1"}
                buttonSide={<>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1 btn-success text-slate-100 text-lg">
                            <PrinterIcon className={'h-7 w-7'}/> Cetak
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Struk</a></li>
                            <li><a>Detail</a></li>
                        </ul>
                        </div>
                </>}
            />

            <div className="flex flex-col md:flex-row justify-between mt-10 w-full">
                <OrderDetail data={purchaseDetail.data} />
                <div className="divider md:divider-horizontal"></div> 
                <PaymentDetail data={purchaseDetail.data} />
            </div>

            <div className="mt-10">
                <h2 className="font-bold text-xl mb-2">Detail Barang</h2>
                <div className="overflow-x-auto w-full">
                <table className="table w-full table-pin-rows">
                    <thead className="bg-slate-600 text-white">
                        <th className="text-center">
                            No
                        </th>
                        <th className="text-center">
                            Produk
                        </th>
                        <th className="text-center">
                            Jumlah
                        </th>
                        <th className="text-center">
                            Harga
                        </th>
                        <th className="text-center">
                            Total
                        </th>
                        {/* <th className="text-center">
                            Tanggal
                        </th> */}
                        {/* <th className="text-center">
                            Catatan
                        </th> */}
                    </thead>
                    <tbody>
                        {purchaseDetail.data.purchaseDetails.map((u, k) => 
                            <tr key={k} className={'text-center'}>
                                <td>{k + 1}</td>
                                <td>{MaximumWordLength(u.productName, 25)}</td>
                                <td>{u.qty} {u.unitPriceName}</td>
                                <td>
                                    {convertCurrency("Rp", u.price)}
                                </td>
                                <td>{convertCurrency("Rp", u.qty * u.price)}</td>
                                {/* <td>{moment(u.).format("DD MMM YY")}</td> */}
                                {/* <td>
                                    {MaximumWordLength(u ?? "-", 20)}
                                </td> */}
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    )
    return(
        <div className="w-full bg-white p-3 rounded-lg ">
            {isLoading ? <LoadingProcess key={'1'} loadingName="Mengambil data transaksi" /> : MainContent}
        </div>
    )
}