import moment from "moment"
import { convertCurrency } from "../../utils/convertCurrency"
import { useGetPurchaseDetailQuery } from "../../apps/services/purchaseApi"
import { MaximumWordLength } from "../../utils/MaximumWordLength"
import { useGetCurrentStoreQuery } from "../../apps/services/storeApi"

interface InvoiceProps {
    // data: IPurchaseResponse
    id: string
}
export const Invoice = ({id}: InvoiceProps) => {
  const {data: purchaseDetail} = useGetPurchaseDetailQuery(id ?? "-");
  const {data: currentStore} = useGetCurrentStoreQuery();
    return (
      <div className="max-w-[182px] font-mono">
          <div className="flex items-center w-full gap-0">
            <div className='flex flex-col justify-center items-center w-full'>
              <div className="font-bold">
                <span className="font-bold w-3">{currentStore?.data?.name}</span>
              </div>
              <div className=" text-[10px] text-center w-full">
                {currentStore?.data?.address} <br/>
                {currentStore?.data?.phoneNumber}
              </div>
              <div className="text-center font-semibold text-[7px] w-full">
                <span>---------------------------------------------</span>
              </div>
            </div>
          </div>
        <div className='flex justify-between w-full'>
          <div className=" text-[10px] w-full">
              <div className="flex justify-between w-full">
                <div className="w-1/2">
                  {purchaseDetail?.data.invoice}
                </div>
                <div className="w-1/2 text-end">
                  {moment(purchaseDetail?.data.createdAt).format("DD/MM/YY HH:mm")}
                </div>
              </div>
              <div className="">Admin: {MaximumWordLength(purchaseDetail?.data.createdBy ?? "", 23)}</div>
              <div className="">
                {purchaseDetail?.data.purchaseType}
              </div>
              <div className="text-center font-semibold text-[7px] w-full">
                <span>---------------------------------------------</span>
              </div>
          </div>
        </div>
        <table className="w-full text-left text-[10px]">
          <tbody className='text-[10px] '>
            {purchaseDetail?.data.purchaseDetails.map((item, index) => (
              <>
                <tr key={index} className="">
                  <td className=" whitespace-normal break-words w-11/12">
                    <span>{MaximumWordLength(item.productName, 40)}</span>
                  </td>
                  <td className="w-1/12"></td>
                </tr>
                <tr className="">
                  <td className="w-10/12">
                    <span>{item.qty} {item.unitPriceName} x {convertCurrency("Rp", item.price)}</span>
                  </td>
                  <td className=" text-center">{convertCurrency("Rp", item.total)}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div className="text-center font-semibold text-[7px] w-full">
          <span>---------------------------------------------</span>
        </div>
        <div className="flex justify-end text-[10px]">
          <div className=" mr-2">Total:</div>
          <div className="">{convertCurrency("Rp", purchaseDetail?.data.purchaseTotal ?? 0)}</div>
        </div>
        <div className="flex justify-end text-[10px]">
          <div className=" mr-2">Bayar:</div>
          <div className="">{convertCurrency("Rp", purchaseDetail?.data.money ?? 0)}</div>
        </div>
        <div className="flex justify-end text-[10px]">
          <div className=" mr-2">Kembalian:</div>
          <div className="">{convertCurrency("Rp", (purchaseDetail?.data.money ?? 0) - (purchaseDetail?.data.purchaseTotal ?? 0))}</div>
        </div>
  </div>
    )
  }