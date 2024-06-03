import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {MaximumWordLength} from "../../../utils/MaximumWordLength.ts";
import {PlusIcon} from "@heroicons/react/16/solid";
import moment from "moment";
import { IDebtDetailRequest, IDebtRequest } from "../../../utils/interfaces.ts";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";
import { IOption } from "../../../components/Input/ComboBox.tsx";
import { satuans } from "../../Product/components/ProductFormPriceModal.tsx";

interface DebtListDetailFormProps {
    debtForm?: IDebtRequest,
    products: IOption[],
    showEdited?: boolean,
    handleAddOrEdit?:() => void,
    handleShowEdit: (debtDetail: IDebtDetailRequest, id: number) => void,
    handleDelete: (index: number) => void
}

export const DebtListDetailForm = ({debtForm, products, showEdited = false, handleShowEdit, handleDelete}: DebtListDetailFormProps) => {

    const AddButton = <>
        <button
            onClick={() => showOrCloseModal("form-debt", "show")} 
            className="btn btn-success btn-sm text-white">
                <PlusIcon className={'h-5 w-5'} /> Tambah
        </button>
    </>

    const getProductName = (id: string): string => {
        const findProduct = products.find(p => p.id === id);
        return findProduct?.name || "";
    } 

    const getUnitPriceName = (id: string): string => {
        const unit = satuans.find(s => s.value === id);
        return unit?.name || ""; 
    }

    return(
        <>
            <TitleCard
                title="Daftar Hutang"
                topMargin="mt-2"
                topSideButtons={AddButton}
            >

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra table-auto">
                        <thead>
                        <tr className={'text-center'}>
                            <th>No</th>
                            <th>Produk</th>
                            <th>Jumlah</th>
                            <th>Satuan</th>
                            <th>Harga</th>
                            <th>Total</th>
                            <th>Tanggal</th>
                            <th>Catatan</th>
                            {showEdited && (
                                <th>Aksi</th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            debtForm?.debtDetails.map((u, k) => {
                                return(
                                    <tr key={k} className={'text-center'}>
                                        <td>{k + 1}</td>
                                        <td>{getProductName(u.productId)}</td>
                                        <td>{u.count}</td>
                                        <td>{MaximumWordLength(getUnitPriceName(u.unitProductId), 20)}</td>
                                        <td>
                                            {convertCurrency("Rp", u.price)}
                                        </td>
                                        <td>{convertCurrency("Rp", u.count * u.price)}</td>
                                        <td>{moment(u.date).format("DD MMM YY")}</td>
                                        <td>
                                            {MaximumWordLength(u.note ?? "-", 15)}
                                            {/* {MaximumWordLength(u.note ?? "-", 20)} */}
                                            {/* {u.note} */}
                                        </td>
                                        {showEdited && (
                                            <td className={'flex items-center justify-center'}>
                                                <button className="btn btn-square btn-ghost" onClick={() => handleShowEdit(u, k)}><PencilSquareIcon className="w-5"/></button>
                                                <button className="btn btn-square btn-ghost" onClick={() => handleDelete(k)}><TrashIcon className="w-5"/></button>
                                            </td>
                                        )}
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    {!debtForm?.debtDetails || debtForm.debtDetails.length < 1 && (
                        <div className={'flex w-full justify-center items-center font-semibold mt-2'}>
                            Tidak ada data hutang
                        </div>
                    )}
                </div>
                {/* {debtForm?.debtDetails && (
                    <div className={'w-full flex justify-between mt-3'}>
                        <div className={'font-semibold'}>Total Hutang: {convertCurrency("Rp", priceTotal)}</div>
                        <div className={'font-semibold'}>
                            <p>Total dipilih: - </p>
                            <button className={'btn btn-success text-slate-100 btn-sm'} onClick={() => document.getElementById("pay-debt").showModal()}>Bayar Hutang</button>
                        </div>
                    </div>
                )} */}
            </TitleCard>
        </>
    )
}
