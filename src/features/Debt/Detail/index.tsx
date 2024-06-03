import {useParams} from "react-router-dom";
import {useState} from "react";
import {IBreadcrumbData} from "../../../utils/TableDataType.ts";
import {CustomerDetail} from "../../Customer/Components/CustomerDetail.tsx";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {DebtListDetail} from "../Components/DebtListDetail.tsx";
import {FormComponentDebt} from "../Components/FormComponentDebt.tsx";
import toast from "react-hot-toast";
import {FormModal} from "../../../components/Modals/FormModal.tsx";
import InputText2 from "../../../components/Input/InputText2.tsx";
import { useAddNoteDebtDetailMutation, useGetNoteDebtByIdQuery, useUpdateNoteDebtDetailMutation } from "../../../apps/services/noteDebtApi.ts";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";
import { IDebtDetailRequest, IDebtDetailResponse } from "../../../utils/interfaces.ts";
import { formatStringToDate } from "../../../utils/formDateString.ts";
import moment from "moment";

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

const PayDebt = () => {
    const [money, setMoney] = useState<number>(0);
    return(
        <div>
            <InputText2 labelStyle={'text-lg'} labelTitle={"Masukkan uang dibayar"} value={money} name={"money"} handleOnChange={(e) => setMoney(e.target.value)} />
        </div>
    )
}
export const DebtDetailContainer = () => {
    const {id} = useParams();
    // const [debtDetail, setDebtDetail] = useState<IDebt>();
    const {data: debtDetail, isLoading: isLoadingGet, isError: isErrorGet} = useGetNoteDebtByIdQuery(id ?? "");
    const [addDebtDetail] = useAddNoteDebtDetailMutation();
    const [updateDebtDetail] = useUpdateNoteDebtDetailMutation();
    const [debtDetailForm, setDebtDetailForm] = useState<IDebtDetailRequest>({
        count: 0,
        date: new Date(),
        note: "",
        price: 0,
        productId: "",
        unitProductId: ""
    });
    const [idDebtDetail, setIdDebtDetail] = useState<string>("-1");

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
            unitProductId: data.unitProductId
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

    return(
        <>
            <FormModal
                id={"pay-debt"}
                onClickYes={() => showOrCloseModal("pay-debt", "close")}
                onClickCancel={() => showOrCloseModal("pay-debt", "close")}
                children={<PayDebt />}
                title={"Konfirmasi Pembayaran Hutang"}
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
                <TitleCard
                showButtonBack={true}
                breadcrumbsData={breadcrumbs}
                title={debtDetail?.data.customer.fullName ?? "-"}
                >
                    <CustomerDetail customerDetail={debtDetail?.data.customer} />
                    <DebtListDetail 
                        handleAddOrEdit={showAddForm}
                        priceTotal={debtDetail?.data.priceTotal} 
                        showEdited={true}
                        handleShowEdit={showEditForm} 
                        debtDetails={debtDetail?.data.debtDetails} />
                </TitleCard>
            }
        </>
    )
}
