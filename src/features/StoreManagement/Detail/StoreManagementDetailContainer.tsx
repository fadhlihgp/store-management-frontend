import {PageHeading} from "../../../components/Cards/PageHeading.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IBreadcrumbData, IStore} from "../../../utils/TableDataType.ts";
import {StoresDummy} from "../StoreDummy.ts";
import moment from "moment";

const breadcrumbsData: IBreadcrumbData[] = [
    {
        name: "Store Management",
        url: "/store-management"
    },
    {
        url: "/store-management/detail/:id",
        name: "Detail"
    }
]

export const StoreManagementDetailContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [storeDetail, setStoreDetail] = useState<IStore | undefined>()

    useEffect(() => {
        const detail = StoresDummy.find(s => s.id === id);
        setStoreDetail(detail);
    }, [id])

    return (
        <div className={'bg-base-100 p-5 shadow-xl rounded-xl'}>
            <PageHeading
                titlePage={storeDetail?.name ?? "-"}
                editOnClick={() => navigate(`/store-management/edit/${id}`)}
                breadcrumbsData={breadcrumbsData} />

            <div className="px-4 sm:px-0 mt-3">
                <h3 className="text-base font-bold leading-7">Store Detail</h3>
                {/*<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Store details and application.</p>*/}
            </div>

            <div className="mt-3 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Nama</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{storeDetail?.name}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Phone</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{storeDetail?.phone}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Tipe Usaha</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{storeDetail?.businessType}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Tanggal Daftar</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{moment(storeDetail?.registerDate).format("DD MMMM YYYY hh:mm:ss")}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Didirikan Sejak</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{storeDetail?.established ?? "-"}</dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6">Alamat</dt>
                        <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                            {storeDetail?.address}
                        </dd>
                    </div>
                </dl>
            </div>

            <div className={'mt-2'}>

                <div className="collapse bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        Owner
                    </div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>

            </div>
        </div>
    )
}