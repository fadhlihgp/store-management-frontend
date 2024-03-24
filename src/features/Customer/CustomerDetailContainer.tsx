import {PageHeading} from "../../components/Cards/PageHeading.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IBreadcrumbData, ICustomer} from "../../utils/TableDataType.ts";
import {CustomersDummy} from "./CustomerDummy.ts";
import {CollapseComponent} from "../../components/Cards/CollapseComponent.tsx";
import {CustomerContainer} from "./CustomerContainer.tsx";
import {CustomerDetail} from "./Components/CustomerDetail.tsx";

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

            <CustomerDetail customerDetail={customerDetail} />

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