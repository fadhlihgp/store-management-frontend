import {PageHeading} from "../../components/Cards/PageHeading.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IBreadcrumbData, ICustomer} from "../../utils/TableDataType.ts";
import {CustomersDummy} from "./CustomerDummy.ts";
import {CollapseComponent} from "../../components/Cards/CollapseComponent.tsx";
import {CustomerContainer} from "./CustomerContainer.tsx";

const breadcrumbsData: IBreadcrumbData[] = [
    {
        name: "Data Pelanggan",
        url: "/customer"
    },
    {
        url: "/customer/detail/:id",
        name: "Detail"
    }
]

export const CustomerDetailContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [customerDetail, setCustomerDetail] = useState<ICustomer | undefined>();

    useEffect(() => {
        const detail = CustomersDummy.find(c => c.id === id);
        setCustomerDetail(detail);
    }, [id])

    return(
        <div className={'bg-base-100 p-5 shadow-xl rounded-xl'}>
            <PageHeading
                titlePage={customerDetail?.fullName ?? "-"}
                editOnClick={() => navigate(`/customer/edit/${id}`)}
                breadcrumbsData={breadcrumbsData}
                showManipulation={true}
                createdAt={customerDetail?.createdAt}
                createdBy={customerDetail?.createdBy}
                editedAt={customerDetail?.editedAt}
                editedBy={customerDetail?.editedBy}
            />


            <div className="px-4 sm:px-0 mt-5">
                <h3 className="text-base font-bold leading-7">Detail Pelanggan</h3>
                {/*<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Customer details and application.</p>*/}
            </div>

            <div className="mt-3 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
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

            <div className={'mt-2 flex flex-col gap-3'}>

                <CollapseComponent title={"Riwayat Transaksi"} content={<CustomerContainer />} />

                <div className="collapse bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        Daftar Hutang
                    </div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
            </div>
        </div>
    )
}