import {ICustomer} from "../../../utils/TableDataType.ts";

interface CustomerDetailProps {
    customerDetail?: ICustomer
}

export const CustomerDetail = ({customerDetail}: CustomerDetailProps) => {
    return(
        <div>
            {/*<div className="px-4 sm:px-0 mt-5">*/}
            {/*    <h3 className="text-base font-bold leading-7">Detail Pelanggan</h3>*/}
            {/*    /!*<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Customer details and application.</p>*!/*/}
            {/*</div>*/}

            <div className="mt-3 border-t border-gray-100">
                <dl className="divide-y divide-gray-100 grid grid-cols-1 sm:grid-cols-2">
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Nama</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{customerDetail?.fullName}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Phone</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{customerDetail?.phone ?? "-"}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Email</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{customerDetail?.email ?? "-"}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Alamat</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                            {customerDetail?.address ?? "-"}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}