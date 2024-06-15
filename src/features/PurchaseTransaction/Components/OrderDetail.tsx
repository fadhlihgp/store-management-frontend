import { LabelContent } from "../../../components/LabelContent"
import { IPurchaseResponse } from "../../../utils/interfaces"
import moment from "moment"

interface OrderDetailProps {
    data: IPurchaseResponse
}

export const OrderDetail = ({data}: OrderDetailProps) => {
    return(
        <div className="w-full md:w-1/2">
            <h2 className="font-bold text-xl mb-2">Detail Pesanan</h2>
            <div className="divider"></div> 
            <div className="flex justify-between gap-10">
                <div className="flex flex-col gap-4 w-1/2">
                    <LabelContent
                        title="Invoice"
                        content={data.invoice}
                        key={"1"}
                    />
                    <LabelContent
                        title="Pelanggan"
                        content={data.customer}
                        key={"2"}
                    />
                    <LabelContent
                        title="Tanggal & Waktu"
                        content={moment(data.createdAt).format("DD MMMM YYYY HH:mm:ss")}
                        key={"3"}
                    />
                    <LabelContent
                        title="Admin"
                        content={data.createdBy}
                        key={"4"}
                    />
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                    <LabelContent
                        title="Status"
                        content={data.status}
                        key={"5"}
                    />
                    <LabelContent
                        title="Tipe Pembayaran"
                        content={data.purchaseType}
                        key={"7"}
                    />
                    <LabelContent
                        title="Catatan"
                        content={data.note ?? "-"}
                        key={"6"}
                    />
                </div>
            </div>
        </div>
    )
}