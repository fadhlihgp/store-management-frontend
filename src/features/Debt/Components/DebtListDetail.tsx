import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {BadgeComponent} from "../../../components/Badges/BadgeComponent.tsx";
import {MaximumWordLength} from "../../../utils/MaximumWordLength.ts";
import React, {useState} from "react";
import moment from "moment";
import { IDebtDetailResponse } from "../../../utils/interfaces.ts";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";
import { ConfirmationModal } from "../../../components/Modals/ConfirmationModal.tsx";
import { useDeleteNoteDebtDetailMutation } from "../../../apps/services/noteDebtApi.ts";
import toast from "react-hot-toast";
import { FilterFormDebtDetail } from "./FilterFormDebtDetail.tsx";
import { PaginationComponent } from "../../../components/Pagination.tsx";


interface DebtListDetailProps {
    debtDetails?: IDebtDetailResponse[],
    priceTotal?: number,
    showEdited?: boolean,
    handleAddOrEdit?:() => void,
    handleShowEdit: (data: IDebtDetailResponse, id: string) => void,
    onChangeFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const DebtListDetail = ({debtDetails, priceTotal = 0, showEdited = false, handleAddOrEdit, handleShowEdit, onChangeFilter}: DebtListDetailProps) => {
    const [deleteDetailDebt] = useDeleteNoteDebtDetailMutation();
    const [idDelete, setIdDelete] = useState<string>("-1");

    const showModalDelete = (id: string) => {
        setIdDelete(id);
        showOrCloseModal("modal-delete", "show");
    }

    const handleDelete = () => {
        deleteDetailDebt(idDelete).unwrap()
        .then((res) => {
            toast.success(res.message ?? "Berhasil menghapus data hutang");
            setIdDelete("-1");
            showOrCloseModal("modal-delete", "close");
        })
        .catch((err) => {
            toast.error(err.message ?? "Gagal menghapus data hutang")
        })
    }

    return(
        <>
            <ConfirmationModal
                id="modal-delete"
                onClickYes={handleDelete}
                key={"0"}
                title={"Konfirmasi hapus"}
                message={'Anda yakin ingin menghapus data hutang ?'} />
            <TitleCard
                title="Daftar Hutang"
                topMargin="mt-2"
                topSideButtons={(showEdited && handleAddOrEdit) && (
                    <FilterFormDebtDetail handleAdd={handleAddOrEdit} handleOnChangeSelect={onChangeFilter} key={"0"}  />
                )}
            >

                {/* Leads List in table format loaded from slice after api call */}
                {debtDetails && (
                    <PaginationComponent 
                        data={debtDetails}
                        itemsPerPage={15}
                        titleTables={["No", "Produk", "Jumlah", "Satuan", "Harga", "Total", "Status", "Tanggal", "Catatan", "Aksi", "Pilih"]}
                        renderTitle={(title, k) => (
                            <th key={k} className="text-center">
                                {title}
                            </th>
                        )}
                        renderItem={(u, k) => (
                            <tr key={k} className={'text-center'}>
                                        <td>{k + 1}</td>
                                        <td>{MaximumWordLength(u.productName, 25)}</td>
                                        <td>{u.count}</td>
                                        <td>{u.unitProductName}</td>
                                        <td>
                                            {convertCurrency("Rp", u.price)}
                                        </td>
                                        <td>{u.count * u.price}</td>
                                        <td>
                                            {u.isPaid ?
                                                <BadgeComponent titleBadge={"Lunas"} /> :
                                                <BadgeComponent titleBadge={'Belum'} styleBadge={'badge-error'} />
                                            }
                                        </td>
                                        <td>{moment(u.date).format("DD MMM YY")}</td>
                                        <td>
                                            {MaximumWordLength(u.note ?? "-", 20)}
                                        </td>
                                        {showEdited && (
                                            <td className={'flex items-center justify-center'}>
                                                <button className="btn btn-square btn-ghost" onClick={() => handleShowEdit(u, u.id)}><PencilSquareIcon className="w-5"/></button>
                                                <button className="btn btn-square btn-ghost" onClick={() => showModalDelete(u.id)}><TrashIcon className="w-5"/></button>
                                            </td>
                                        )}
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                    </tr>
                        )}
                    />
                )}
               
                {debtDetails && (
                    <div className={'w-full flex justify-between mt-3'}>
                        <div className={'font-semibold'}>Total Hutang: {convertCurrency("Rp", priceTotal)}</div>
                        <div className={'font-semibold'}>
                            <p>Total dipilih: - </p>
                            <button className={'btn btn-success text-slate-100 btn-sm'} disabled onClick={() => showOrCloseModal("pay-debt", "show")}>Bayar Hutang</button>
                        </div>
                    </div>
                )}
            </TitleCard>
        </>
    )
}
