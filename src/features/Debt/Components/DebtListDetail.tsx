import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import {EyeIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {BadgeComponent} from "../../../components/Badges/BadgeComponent.tsx";
import {MaximumWordLength} from "../../../utils/MaximumWordLength.ts";
import React, {useState} from "react";
import moment from "moment";
import { IDebtDetailResponse, IPayDebtRequest } from "../../../utils/interfaces.ts";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";
import { ConfirmationModal } from "../../../components/Modals/ConfirmationModal.tsx";
import { useDeleteNoteDebtDetailMutation, usePayDebtMutation } from "../../../apps/services/noteDebtApi.ts";
import toast from "react-hot-toast";
import { PaginationComponent } from "../../../components/Pagination.tsx";
import { FormModal } from "../../../components/Modals/FormModal.tsx";
import InputText2 from "../../../components/Input/InputText2.tsx";
import SelectBox2 from "../../../components/Input/SelectBox2.tsx";
import TextAreaInput2 from "../../../components/Input/TextAreaInput2.tsx";
import { payments } from "../../../utils/dummyData.ts";
import { AdjustmentsHorizontalIcon, ChevronDownIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/16/solid";

interface PayDobtProps {
    payDebtForm: IPayDebtRequest,
    setPayDebtForm: React.Dispatch<React.SetStateAction<IPayDebtRequest>>,
    payDebtDatas: IDebtDetailResponse[],
    validationErrors?: {money: string | undefined, payment: string | undefined},
    setValidationErrors?: React.Dispatch<React.SetStateAction<{money: string | undefined, payment: string | undefined}>>,
}

const PayDebt = ({payDebtForm, setPayDebtForm, payDebtDatas, validationErrors, setValidationErrors}: PayDobtProps) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setPayDebtForm({...payDebtForm, [name]: value});
        if(setValidationErrors) {
            setValidationErrors({money: undefined, payment: undefined});
        }
    }
    const totalPrice = payDebtDatas.reduce((total, current) => total + current.price * current.count, 0);

    return(
        <div>
            <div className="mt-3 font-bold">Barang yang akan dibayar</div>
            <div className="overflow-x-auto w-full">
              <table className="table w-full table-pin-rows">
                <thead>
                    <th className="text-center">
                        Produk
                    </th>
                    <th className="text-center">
                        Jumlah
                    </th>
                    <th className="text-center">
                        Harga
                    </th>
                    <th className="text-center">
                        Total
                    </th>
                    <th className="text-center">
                        Tanggal
                    </th>
                    <th className="text-center">
                        Catatan
                    </th>
                </thead>
                <tbody>
                    {payDebtDatas.map((u, k) => 
                         <tr key={k} className={'text-center'}>
                         <td>{MaximumWordLength(u.productName, 25)}</td>
                         <td>{u.count} {u.unitProductName}</td>
                         <td>
                             {convertCurrency("Rp", u.price)}
                         </td>
                         <td>{convertCurrency("Rp", u.count * u.price)}</td>
                         <td>{moment(u.date).format("DD MMM YY")}</td>
                         <td>
                             {MaximumWordLength(u.note ?? "-", 20)}
                         </td>
                     </tr>
                    )}
                </tbody>
                </table>
            </div>
            <div className="mt-3 flex justify-end">
                <p className="font-bold text-md text-end">Total yang harus dibayar: <br/> {convertCurrency("Rp", totalPrice)}</p>
            </div>

            <div className="flex flex-row gap-2 mt-3">
                <div className="w-1/2">
                    <InputText2 
                        labelStyle={'text-md'} 
                        labelTitle={"Masukkan uang dibayar"} 
                        value={payDebtForm.money} 
                        name={"money"} 
                        handleOnChange={handleOnChange} />
                        {validationErrors?.money && (
                            <p className="text-red-500 font-semibold">{validationErrors.money}</p>
                        )}
                </div>

                <div className="w-1/2">
                    <SelectBox2 
                        labelTitle="Pembayaran" 
                        containerStyle="w-full"
                        placeholder={"Pilih Pembayaran"} 
                        options={payments} 
                        name="payment"
                        value={payDebtForm.payment} 
                        handleOnChange={handleOnChange}
                    />
                    {validationErrors?.payment && (
                            <p className="text-red-500 font-semibold">{validationErrors.payment}</p>
                        )}
                </div>
            </div>

            <TextAreaInput2 
                labelTitle="Catatan" 
                name="note" 
                value={payDebtForm.note}
                handleOnChange={(e) => setPayDebtForm({...payDebtForm, note: e.target.value})}
            />
        </div>
    )
}

interface DebtListDetailProps {
    debtDetails?: IDebtDetailResponse[],
    priceTotal?: number,
    showEdited?: boolean,
    handleAddOrEdit?:() => void,
    handleShowEdit: (data: IDebtDetailResponse, id: string) => void,
    onChangeFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    customerId: string
}

export const DebtListDetail = ({debtDetails, priceTotal = 0, showEdited = false, handleAddOrEdit, handleShowEdit, customerId}: DebtListDetailProps) => {
    const [deleteDetailDebt] = useDeleteNoteDebtDetailMutation();
    const [idDelete, setIdDelete] = useState<string>("-1");
    const [selectedItems, setSelectedItems] = useState<IDebtDetailResponse[]>([]);
    const totalPrice = selectedItems.reduce((total, item) => total + item.price * item.count, 0);
    const [payDebtRequest, setPayDebtRequest] = useState<IPayDebtRequest>({
        payment: "",
        note: "",
        money: 0,
        customerId: customerId,
        debtDetailIds: []
    });
    const [validationErrors, setValidationErrors] = useState<{money: string | undefined, payment: string | undefined}>({
        money: undefined,
        payment: undefined
    });

    // pay debt
    const [payDebt, {isLoading}] = usePayDebtMutation();

    const validationInput = (): boolean => {
        let isValid = true;
        if (payDebtRequest.money <= 0) {
            setValidationErrors({...validationErrors, money: "Uang harus lebih dari 0"})
            isValid = false
        }
        if (payDebtRequest.money < totalPrice) {
            setValidationErrors({...validationErrors, money: "Uang yang harus dibayarkan kurang!"})
            isValid = false
        }
        if (payDebtRequest.payment === "") {
            setValidationErrors({...validationErrors, payment: "Pembayaran harus diisi"})
            isValid = false
        }
        return isValid;
    }

    const showModalDelete = (id: string) => {
        setIdDelete(id);
        showOrCloseModal("modal-delete", "show");
    }

    const handleCheckboxChange = (debtDetail: IDebtDetailResponse, checked: boolean) => {
        if (checked) {
          setSelectedItems((prevSelectedItems) => [...prevSelectedItems, debtDetail]);
          setPayDebtRequest({...payDebtRequest, debtDetailIds: [...payDebtRequest.debtDetailIds, debtDetail.id]});
        } else {
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((item) => item.id !== debtDetail.id)
          );
          setPayDebtRequest({...payDebtRequest, debtDetailIds: payDebtRequest.debtDetailIds.filter((item) => item!== debtDetail.id)});
        }
      };

      
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

    const reset = () => {
        setPayDebtRequest({
            payment: "",
            note: "",
            money: 0,
            customerId: customerId,
            debtDetailIds: []
        });
        setSelectedItems([]);
        setValidationErrors({
            money: undefined,
            payment: undefined
        });
    }

    const submitPayDebt = () => {
        if (!validationInput()) {
            return;
        }
        payDebt(payDebtRequest).unwrap()
        .then((res) => {
            toast.success(res.message?? "Berhasil melakukan pembayaran");
            showOrCloseModal("pay-debt", "close");
            // console.log(payDebtRequest);
            reset();
        })
        .catch((err) => {
            toast.error(err.message?? "Gagal melakukan pembayaran");
            console.log(err);
        })
        
    }

    const handleCancel = () => {
        setPayDebtRequest({ ...payDebtRequest,
            payment: "",
            note: "",
            money: 0,
            customerId: customerId
        });
        setValidationErrors({
            money: undefined,
            payment: undefined
        });
        showOrCloseModal("pay-debt", "close");
    }

    return(
        <>
            <FormModal
                id={"pay-debt"}
                onClickYes={submitPayDebt}
                onClickCancel={handleCancel}
                isLoading={isLoading}
                children={<PayDebt 
                            payDebtDatas={selectedItems}
                            payDebtForm={payDebtRequest} 
                            setPayDebtForm={setPayDebtRequest}
                            validationErrors={validationErrors} 
                            setValidationErrors={setValidationErrors}
                        />}
                title={"Konfirmasi Pembayaran Hutang"}
            />
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
                    // <FilterFormDebtDetail handleAdd={handleAddOrEdit} handleOnChangeSelect={onChangeFilter} key={"0"}  />
                    <div className="flex flex-row gap-2 items-end">

                        {/* <label className="inline-block sm">
                            <div className="label">
                                <span className="label-text">Filter Status</span>
                            </div>
                            <select className="select select-bordered select-sm" name="type" onChange={handleAddOrEdit}>
                                <option disabled selected>Pilih Status</option>
                                <option value={"none"}>Semua</option>
                                <option value={"true"}>Sudah Lunas</option>
                                <option value={"false"}>Belum Lunas</option>
                            </select>
                        </label> */}
                        <button className="btn btn-sm" onClick={() => showOrCloseModal("filter-debt-modal", "show")}>
                            <AdjustmentsHorizontalIcon className="h-5 w-5 ml-2" /> Filter
                        </button>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm w-28 btn-primary text-slate-100 flex justify-between">
                                Aksi <ChevronDownIcon className={'h-5 w-5 ml-2'} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box z-10 ">
                                <li onClick={handleAddOrEdit}><button><PlusIcon className={'h-5 w-5'} /> Tambah</button></li>
                                <li><button><PrinterIcon className={'h-5 w-5'} /> Cetak</button></li>
                            </ul>
                        </div>
                    </div>
                )}
            >

                {/* Leads List in table format loaded from slice after api call */}
                {debtDetails && (
                    <PaginationComponent 
                        data={debtDetails}
                        itemsPerPage={6}
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
                                        <td>{convertCurrency("Rp", u.count * u.price)}</td>
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
                                                {!u.isPaid ? (
                                                    <>
                                                        <button className="btn btn-square btn-ghost" onClick={() => handleShowEdit(u, u.id)}><PencilSquareIcon className="w-5"/></button>
                                                        <button className="btn btn-square btn-ghost" onClick={() => showModalDelete(u.id)}><TrashIcon className="w-5"/></button>
                                                    </>
                                                ) : (
                                                    <button className="btn btn-square btn-ghost" onClick={() => handleShowEdit(u, u.id)}><EyeIcon className="w-5"/></button>
                                                )}
                                                
                                            </td>
                                        )}
                                        <th>
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    className="checkbox" 
                                                    disabled={u.isPaid}
                                                    checked={selectedItems.some((item) => item.id === u.id)}
                                                    onChange={(e) => handleCheckboxChange(u, e.target.checked)}
                                                />
                                            </label>
                                        </th>
                                    </tr>
                        )}
                    />
                )}
               
                {debtDetails && (
                    <div className={'w-full flex justify-between mt-3'}>
                        <div className={'font-semibold'}>Total Hutang: {convertCurrency("Rp", priceTotal)}</div>
                        <div className={'font-semibold flex flex-col items-end'}>
                            <p>Total dipilih: {convertCurrency("Rp", totalPrice)} </p>
                            <button 
                                className={'btn btn-success text-slate-100 btn-sm'}
                                disabled={totalPrice == 0} 
                                onClick={() => showOrCloseModal("pay-debt", "show")}>
                                    Bayar Hutang
                            </button>
                        </div>
                    </div>
                )}
            </TitleCard>
        </>
    )
}
