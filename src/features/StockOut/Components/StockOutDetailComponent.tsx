import moment from "moment"
import { IStockInOutResponse } from "../../../utils/interfaces"

interface StockOutDetailProps {
    stockOutDetail?: IStockInOutResponse
}

export const StockOutDetailComponent = ({stockOutDetail}: StockOutDetailProps) => {
    return(
        <div>
            {/*<div className="px-4 sm:px-0 mt-5">*/}
            {/*    <h3 className="text-base font-bold leading-7">Detail Pelanggan</h3>*/}
            {/*    /!*<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Customer details and application.</p>*!/*/}
            {/*</div>*/}

            <div className="mt-3 border-t border-gray-100">
                <dl className="divide-y divide-gray-100 grid grid-cols-1 sm:grid-cols-2">
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm leading-6 font-semibold">Produk</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{stockOutDetail?.product ?? "-"}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-semibold leading-6">Total Item</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{stockOutDetail?.totalItem ?? "-"}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-semibold leading-6">Tanggal</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{moment(stockOutDetail?.date).format("DD MMMM yyyy") ?? "-"}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-semibold leading-6">Catatan</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{stockOutDetail?.note ?? "-"}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}