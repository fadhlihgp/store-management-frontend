import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {IBreadcrumbData} from "../../../utils/TableDataType.ts";
import {CustomerDetail} from "../../Customer/Components/CustomerDetail.tsx";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {DebtListDetail} from "../Components/DebtListDetail.tsx";
import {FormComponentDebt} from "../Components/FormComponentDebt.tsx";
import toast from "react-hot-toast";
import { useAddNoteDebtDetailMutation, useGetNoteDebtByIdQuery, useUpdateNoteDebtDetailMutation } from "../../../apps/services/noteDebtApi.ts";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";
import { IDebtDetailRequest, IDebtDetailResponse } from "../../../utils/interfaces.ts";
import { formatStringToDate } from "../../../utils/formDateString.ts";
import moment from "moment";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad.tsx";
import { FilterFormDebtDetail } from "../Components/FilterFormDebtDetail.tsx";
import { DebtReport } from "../../reports/DebtReport.tsx";
import { useReactToPrint } from "react-to-print";

const breadcrumbs: IBreadcrumbData[] = [
    {
        name: "Daftar Hutang",
        url: "/note-debt"
    },
    {
        name: "Detail",
        url: ""
    }
]

export interface FilterDebtDetail {
    month: number,
    year: number,
    type: string
}

export const DebtDetailContainer = () => {
    const {id} = useParams();
    const componentRef = useRef(null);
    // const [debtDetail, setDebtDetail] = useState<IDebt>();
    const {data: debtDetail, isLoading: isLoadingGet, isError: isErrorGet, isSuccess} = useGetNoteDebtByIdQuery(id ?? "");
    const [addDebtDetail] = useAddNoteDebtDetailMutation();
    const [updateDebtDetail] = useUpdateNoteDebtDetailMutation();
    const [debtDetailList, setDebtDetailList] = useState<IDebtDetailResponse[]>();
    const [debtDetailForm, setDebtDetailForm] = useState<IDebtDetailRequest>({
        count: 0,
        date: new Date(),
        note: "",
        price: 0,
        productId: "",
        unitProductId: "",
        isPaid: false
    });
    const [filter, setFilter] = useState<FilterDebtDetail>({
        month: 99,
        type: "none",
        year:99
    });

    const [idDebtDetail, setIdDebtDetail] = useState<string>("-1");

    const handleOnChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        console.log(value);
        setFilter({...filter, [name]: value});
    }

    useEffect(() => {
        if (isSuccess) {
            setDebtDetailList(debtDetail.data.debtDetails)
        }
    }, [debtDetail, isSuccess])

    // useEffect(() => {
    //     if (filter.month === 99 && filter.year === 99 && filter.type === "none") {
    //         setDebtDetailList(debtDetail?.data.debtDetails);
    //         return;
    //     }

    //     filterFunc();
    // }, [filter, setFilter])
    
    const filterFunc = () => {
        const filters = debtDetail?.data.debtDetails.filter((item) => {
                const itemDate = new Date(item.date);
                const itemMonth = itemDate.getMonth();
                const itemYear = itemDate.getFullYear();
                const itemType = item.isPaid;
    
                const isMonthMatch = filter.month == 99 || itemMonth == filter.month - 1;
                const isYearMatch = filter.year == 99 || itemYear == filter.year;
                const isTypeMatch = filter.type === 'none' || itemType === (filter.type === "true");
                return isMonthMatch && isYearMatch && isTypeMatch ;
            });
        setDebtDetailList(filters)
    }

    const showAddForm = () => {
        setIdDebtDetail("-1");
        showOrCloseModal("form-debt", "show");
    }

    const showEditForm = (data: IDebtDetailResponse, id: string) => {
        setIdDebtDetail(id);
        setDebtDetailForm({
            count: data.count,
            date: new Date(data.date),
            note: data.note,
            price: data.price,
            productId: data.productId,
            unitProductId: data.unitProductId,
            isPaid: data.isPaid
        })
        console.log(debtDetailForm);
        showOrCloseModal("form-debt", "show");
    }

    const addNewDebtDetail = () => {
        const sendData = {...debtDetailForm, 
            customerId: debtDetail?.data.customer.id, 
            date: formatStringToDate(moment(debtDetailForm.date).format("YYYY-MM-DD"))
        };

        addDebtDetail(sendData).unwrap()
        .then((res) => {
            toast.success(res.message ?? 'Berhasil menambah data hutang');
        })
        .catch((err) => {
            toast.error(err.message ?? "Gagal menambah data hutang");
        })
    }

    const submitUpdateDebtDetail = () => {
        const sendData = {...debtDetailForm, 
            date: formatStringToDate(moment(debtDetailForm.date).format("YYYY-MM-DD"))
        };
        const data = {
            id: idDebtDetail,
            data: sendData
        };
        updateDebtDetail(data).unwrap()
        .then((res) => {
            toast.success(res.message ?? 'Berhasil memperbarui data hutang');
        })
        .catch((err) => {
            toast.error(err.message ?? "Gagal memperbarui data hutang");
        })
    }

    const submitForm = () => {
        if (idDebtDetail === "-1") {
            addNewDebtDetail();
        } else {
            submitUpdateDebtDetail();
        }
    }

    const handleFiter = () => {
        console.log(filter);
        showOrCloseModal("filter-debt-modal", "close");
        if (filter.month === 99 && filter.year === 99 && filter.type === "none") {
            setDebtDetailList(debtDetail?.data.debtDetails);
            return;
        }

        filterFunc();
    }

    const handleResetFilter = () => {
        setFilter({
            month: 99,
            type: "none",
            year:99
        });
        setDebtDetailList(debtDetail?.data.debtDetails);
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    const MainContent = isErrorGet || !debtDetail?.data ? <FailedLoad /> : (
        <TitleCard
            showButtonBack={true}
            breadcrumbsData={breadcrumbs}
            title={debtDetail?.data.customer.fullName ?? "-"}
        >
            <CustomerDetail customerDetail={debtDetail?.data.customer} />
            <DebtListDetail 
                customerId={debtDetail?.data.customer.id}
                handleAddOrEdit={showAddForm} 
                showEdited={true}
                handleShowEdit={showEditForm}
                handlePrint={handlePrint}
                onChangeFilter={handleOnChangeFilter} 
                debtDetails={debtDetailList} 
            />
        </TitleCard>
    );

    return(
        <>
            {debtDetail && (
                <div style={{ display: 'none' }}>
                    <div ref={componentRef}>
                    {/* Komponen atau tampilan yang akan dicetak */}
                    <pre>
                        <DebtReport customer={debtDetail?.data.customer} debtDetails={debtDetailList} key={"print"} />
                    </pre>
                    </div>
                </div>
            )}
            <FilterFormDebtDetail
                handleOnChangeSelect={handleOnChangeFilter}
                handleReset={handleResetFilter}
                handleFilter={handleFiter}
                id="filter-debt-modal"
                title="Filter Data Hutang"
            />
            <FormComponentDebt 
                debtDetailForm={debtDetailForm} 
                setDebtDetailForm={setDebtDetailForm} 
                handleSubmit={submitForm} 
                idDebtDetail={idDebtDetail}
                setIdDebtDetail={setIdDebtDetail}
                // indexDebtDetail={} 
                // setIndexDebtDetail={} 
            />
            {isLoadingGet ? <LoadingProcess /> : 
                MainContent
            }
        </>
    )
}
