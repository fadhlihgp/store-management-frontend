import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {DebtsDummy} from "../DebtDummy.ts";
import {IBreadcrumbData, IDebt} from "../../../utils/TableDataType.ts";
import {CustomerDetail} from "../../Customer/Components/CustomerDetail.tsx";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {DebtListDetail} from "../Components/DebtListDetail.tsx";
import {FormComponentDebt} from "../Components/FormComponentDebt.tsx";
import {ConfirmationModal} from "../../../components/Modals/ConfirmationModal.tsx";
import toast from "react-hot-toast";
import {FormModal} from "../../../components/Modals/FormModal.tsx";
import InputText2 from "../../../components/Input/InputText2.tsx";

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
    const [debtDetail, setDebtDetail] = useState<IDebt>()

    useEffect(() => {
        if (id) {
            const detail = DebtsDummy.find(d => d.id === id);
            setDebtDetail(detail);
        }
    },[id])

    return(
        <>
            <ConfirmationModal
                onClickYes={() => {
                document.getElementById('modal-delete').close();
                toast.success("Berhasil menghapus data hutang");}}
                title={"Konfirmasi hapus"}
                message={'Anda yakin ingin menghapus data hutang ?'} />

            <FormModal
                id={"pay-debt"}
                onClickYes={() => document.getElementById("pay-debt").close()}
                onClickCancel={() => document.getElementById("pay-debt").close()}
                children={<PayDebt />}
                title={"Konfirmasi Pembayaran Hutang"}
            />
            <FormComponentDebt />
            <TitleCard
                showButtonBack={true}
                breadcrumbsData={breadcrumbs}
                title={debtDetail?.customer.fullName ?? "-"}
            >
                <CustomerDetail customerDetail={debtDetail?.customer} />
                <DebtListDetail handleDelete={() => document.getElementById('modal-delete').showModal()} handleAddOrEdit={() => document.getElementById('form-debt').showModal()} showEdited={true} debtDetails={debtDetail?.debtDetails} />
            </TitleCard>
        </>
    )
}
