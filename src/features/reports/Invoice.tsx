import moment from "moment"
import { convertCurrency } from "../../utils/convertCurrency"
import { useGetPurchaseDetailQuery } from "../../apps/services/purchaseApi"

interface InvoiceProps {
    // data: IPurchaseResponse
    id: string
}
  
export const Invoice = ({id}: InvoiceProps) => {
  const {data: purchaseDetail} = useGetPurchaseDetailQuery(id ?? "-");
    return (
      <div className="bg-white rounded-lg shadow-lg px-5 py-5 max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center w-full">
            <div className='flex flex-col justify-center items-center w-full'>
              <div className="text-gray-700 font-semibold">
                Warung Parno
              </div>
              <div className="text-gray-700 text-[9px] text-center">
                Jl Bonjol No 30, Jakasetia, Bekasi Selatan, Kota Bekasi <br/>
                081382799633
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='flex justify-between'>
          <div className="text-gray-700 mb-2 mt-2 text-[9px]">
              <div className="">Invoice: {purchaseDetail?.data.invoice}</div>
              <div className="">Tanggal: {moment(purchaseDetail?.data.createdAt).format("DD/MM/YYYY HH:mm")}</div>
          </div>
          <div className="mb-2 mt-2 text-[9px]">
            <div className="text-gray-700">Pelanggan: {purchaseDetail?.data.customer}</div>
            <div className="text-gray-700">Admin: {purchaseDetail?.data.createdBy}</div>
            <div className="text-gray-700">{purchaseDetail?.data.purchaseType}</div>
          </div>
        </div>
        
        <hr />
        <table className="w-full text-left mb-3 text-[9px]">
          <thead>
            <tr>
              <th className="text-gray-700 font-semibold uppercase mb-2">Produk</th>
              <th className="text-gray-700 font-semibold uppercase mb-2">Jumlah</th>
              <th className="text-gray-700 font-semibold uppercase mb-2">Harga</th>
              <th className="text-gray-700 font-semibold uppercase mb-2">Total</th>
            </tr>
          </thead>
          <tbody className='text-[9px]'>
            {purchaseDetail?.data.purchaseDetails.map((item, index) => (
              <tr key={index}>
                <td className="text-gray-700">{item.productName}</td>
                <td className="text-gray-700">{item.qty} {item.unitPriceName}</td>
                <td className="text-gray-700">{item.price}</td>
                <td className="text-gray-700">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end text-[9px]">
          <div className="text-gray-700 mr-2">Total:</div>
          <div className="text-gray-700">{convertCurrency("Rp", purchaseDetail?.data.purchaseTotal ?? 0)}</div>
        </div>
        <div className="flex justify-end text-[9px]">
          <div className="text-gray-700 mr-2">Tunai:</div>
          <div className="text-gray-700">{convertCurrency("Rp", purchaseDetail?.data.money ?? 0)}</div>
        </div>
        <div className="flex justify-end text-[9px]">
          <div className="text-gray-700 mr-2">Kembalian:</div>
          <div className="text-gray-700">{convertCurrency("Rp", (purchaseDetail?.data.money ?? 0) - (purchaseDetail?.data.purchaseTotal ?? 0))}</div>
        </div>
  </div>
    )
  }