import { LabelContent } from "../../../components/LabelContent"
import { convertCurrency } from "../../../utils/convertCurrency"
import { IPurchaseResponse } from "../../../utils/interfaces"

interface PaymentDetailProps {
    data: IPurchaseResponse
}

export const PaymentDetail = ({data}: PaymentDetailProps) => {
    return(
        <div className="w-full md:w-1/2">
            <h2 className="font-bold text-xl mb-2">Detail Pembayaran</h2>
            <div className="divider"></div> 
            <div className="flex justify-between gap-10">
                <div className="flex flex-col gap-4 w-1/2">
                    <LabelContent
                        title="Tipe Pembayaran"
                        content={data.payment}
                        key={"1"}
                    />
                    <LabelContent
                        title="Total Pembayaran"
                        content={convertCurrency("Rp", data.purchaseTotal)}
                        key={"2"}
                    />
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                    <LabelContent
                        title="Uang Diberikan"
                        content={convertCurrency("Rp", data.money)}
                        key={"5"}
                    />
                    <LabelContent
                        title="Kembalian"
                        content={convertCurrency("Rp", data.money - data.purchaseTotal)}
                        key={"6"}
                    />
                </div>
            </div>
        </div>
    )
}