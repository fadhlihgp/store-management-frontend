import {ComboBox} from "../../../components/Input/ComboBox.tsx";
import {ProductsDummy} from "../../Product/ProductDummy.ts";
import InputText2 from "../../../components/Input/InputText2.tsx";
import SelectBox from "../../../components/Input/SelectBox.tsx";
import {satuans} from "../../Product/components/ProductFormPriceModal.tsx";
import TextAreaInput from "../../../components/Input/TextAreaInput.tsx";
import React, {useEffect, useState} from "react";
import {IIncomeExpenseForm} from "../../../utils/TableDataType.ts";
import {incomeExpensesDummy} from "../incomeExpenseDummy.ts";

interface FormComponentInExProps {
    incomeExpenseId: string
}

export const FormComponentInEx = ({incomeExpenseId}: FormComponentInExProps) => {
    const [inExForm, setInExForm] = useState<IIncomeExpenseForm>();

    useEffect(() => {
        if (incomeExpenseId !== "-1") {
            const detail = incomeExpensesDummy.find(i => i.id === incomeExpenseId);
            if (detail) {
                setInExForm({
                    note: detail.note,
                    dateNote: detail.dateNote,
                    imageUrl: detail.imageUrl,
                    nominal: detail.nominal,
                    status: detail.status
                })
            }
        }
    }, [incomeExpenseId])

    return(
        <>
            <dialog id={"form-debt"} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tambah Hutang</h3>
                    <div className={'grid grid-cols-1 gap-4'}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Piih Jenis</span>
                            </div>
                            <select className="select select-bordered">
                                <option>Pemasukkan</option>
                                <option>Pengeluaran</option>
                            </select>
                        </label>

                        <InputText2 labelTitle={"Tanggal"} value={inExForm?.dateNote} name={"dateNote"} handleOnChange={} type={"date"} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputText2 labelTitle="Jumlah" type={"number"} updateType={debtForm} value={debtForm.count} name={"count"} handleOnChange={handleOnChange}/>
                        <SelectBox labelTitle="Satuan" placeholder={"Pilih Satuan"} options={satuans} defaultValue={""} updateFormValue={handleOnChange}/>
                        <InputText2 name={"price"} labelTitle="Harga" type={"number"} value={debtForm.price} handleOnChange={handleOnChange}/>
                        <InputText2 name={"debtDate"} labelTitle={"Tanggal"} type={"date"} value={debtForm.debtDate} handleOnChange={handleOnChange} />
                    </div>
                    <div className={'grid grid-cols-1 gap-4'}>
                        <div className={`form-control w-ful`}>
                            <label className="label">
                                <span className={"label-text text-base-content "}>Total Harga</span>
                            </label>
                            <input type={"number"} value={debtForm.count * debtForm.price} className="input input-bordered w-full " disabled />
                        </div>
                        <TextAreaInput labelTitle={"Catatan"} defaultValue={debtForm.note} updateFormValue={(val: any) => updateFormValue("note", val)} />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className={'flex gap-2 justify-end'}>
                                <button className={'btn btn-success text-white'} onClick={submitForm} type={"button"}>Simpan</button>
                                <button className="btn" onClick={onClickCancel}>Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    )
}