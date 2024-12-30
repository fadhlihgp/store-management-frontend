import { useNavigate, useParams } from "react-router-dom";
import { useGetStockInByIdQuery } from "../../apps/services/productApi";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import { PencilIcon } from "@heroicons/react/24/outline";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";
import { StockInDetailComponent } from "./Components/StockInDetailComponent";
import { PageHeading } from "../../components/Cards/PageHeading";
import { IBreadcrumbData } from "../../utils/TableDataType";
import { useEffect, useState } from "react";
import { IStockInOutResponse } from "../../utils/interfaces";

const breadcrumbsData: IBreadcrumbData[] = [
    {
        name: "Data Stok Masuk",
        url: "/product/stock-in"
    },
    {
        url: "/product/stock-in/detail/:id",
        name: "Detail"
    }
]

export const StockInDetailContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: stockInDetail, isLoading, isError, isSuccess} = useGetStockInByIdQuery(id ?? "");
    const [stockIn, setStockIn] = useState<IStockInOutResponse>();

    useEffect(() => {
        if(isSuccess && stockInDetail.data) {
            setStockIn(stockInDetail.data)
        }
    }, [isSuccess, stockInDetail])

    const MainContent = isError ? <FailedLoad /> : (
        <>
            <PageHeading
                titlePage={"Detail Stok Masuk"}
                buttonSide={
                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <span className="">
                        <button
                            type="button"
                            onClick={() => navigate(`/product/stock-in/edit/${id}`)}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Edit
                        </button>
                        </span>
                </div>
                }
                breadcrumbsData={breadcrumbsData}
                showManipulation={true}
                createdAt={stockIn?.createdAt}
                createdBy={stockIn?.createdBy}
                editedAt={stockIn?.editedAt}
                editedBy={stockIn?.editedBy}
            />

            <StockInDetailComponent stockInDetail={stockIn}  />
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