import { useNavigate, useParams } from "react-router-dom";
import { useGetStockOutByIdQuery } from "../../apps/services/productApi";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import { PencilIcon } from "@heroicons/react/24/outline";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";
import { StockOutDetailComponent } from "./Components/StockOutDetailComponent";
import { PageHeading } from "../../components/Cards/PageHeading";
import { IBreadcrumbData } from "../../utils/TableDataType";
import { useEffect, useState } from "react";
import { IStockInOutResponse } from "../../utils/interfaces";

const breadcrumbsData: IBreadcrumbData[] = [
    {
        name: "Data Stok Keluar",
        url: "/product/stock-out"
    },
    {
        url: "/product/stock-out/detail/:id",
        name: "Detail"
    }
]

export const StockOutDetailContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: stockOutDetail, isLoading, isError, isSuccess} = useGetStockOutByIdQuery(id ?? "");
    const [stockIn, setStockOut] = useState<IStockInOutResponse>();

    useEffect(() => {
        if(isSuccess && stockOutDetail.data) {
            setStockOut(stockOutDetail.data)
        }
    }, [isSuccess, stockOutDetail])

    const MainContent = isError ? <FailedLoad /> : (
        <>
            <PageHeading
                titlePage={"Detail Stok Keluar"}
                buttonSide={
                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <span className="">
                        <button
                            type="button"
                            onClick={() => navigate(`/product/stock-out/edit/${id}`)}
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

            <StockOutDetailComponent stockOutDetail={stockIn}  />
        </>
    )
    return(
        <div className={'bg-base-100 p-5 shadow-xl rounded-xl'}>
            {isLoading ? <LoadingProcess key={"1"} loadingName="Mengambil data detail stok keluar"/> : MainContent}
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