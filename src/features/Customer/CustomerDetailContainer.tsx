import {PageHeading} from "../../components/Cards/PageHeading.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {IBreadcrumbData} from "../../utils/TableDataType.ts";
import {CustomerDetail} from "./Components/CustomerDetail.tsx";
import { useGetCustomerByIdQuery } from "../../apps/services/customerApi.ts";
import FailedLoad from "../../components/OtherDisplay/FailedLoad.tsx";
import { LoadingProcess } from "../../components/Loading/LoadingProcess.tsx";

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
    const {data: customerDetail, isLoading, isError} = useGetCustomerByIdQuery(id ?? "");

    const MainContent = isError ? <FailedLoad /> : (
        <>
            <PageHeading
                titlePage={customerDetail?.data.fullName ?? "-"}
                editOnClick={() => navigate(`/customer/edit/${id}`)}
                breadcrumbsData={breadcrumbsData}
                showManipulation={true}
                createdAt={customerDetail?.data.createdAt}
                createdBy={customerDetail?.data.createdBy}
                editedAt={customerDetail?.data.editedAt}
                editedBy={customerDetail?.data.editedBy}
            />

            <CustomerDetail customerDetail={customerDetail?.data} />
        </>
    )
    return(
        <div className={'bg-base-100 p-5 shadow-xl rounded-xl'}>
            {isLoading ? <LoadingProcess key={"1"} loadingName="Mengambil data pelanggan detail"/> : MainContent}
            {/* <div className={'mt-2 flex flex-col gap-3'}>

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
            </div> */}
        </div>
    )
}