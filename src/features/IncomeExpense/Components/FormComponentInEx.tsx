import {ComboBox} from "../../../components/Input/ComboBox.tsx";
import {ProductsDummy} from "../../Product/ProductDummy.ts";
import InputText2 from "../../../components/Input/InputText2.tsx";
import SelectBox from "../../../components/Input/SelectBox.tsx";
import {satuans} from "../../Product/components/ProductFormPriceModal.tsx";
import TextAreaInput from "../../../components/Input/TextAreaInput.tsx";
import React, {ChangeEventHandler, FormEvent, useEffect, useState} from "react";
import {IIncomeExpenseForm} from "../../../utils/TableDataType.ts";
import {incomeExpensesDummy} from "../incomeExpenseDummy.ts";
import TextAreaInput2 from "../../../components/Input/TextAreaInput2";
import toast from "react-hot-toast";

interface FormComponentInExProps {
    incomeExpenseId: string,
    setIncomeExpenseId: React.Dispatch<React.SetStateAction<string>>
}

export const FormComponentInEx = ({incomeExpenseId, setIncomeExpenseId}: FormComponentInExProps) => {
    const [inExForm, setInExForm] = useState<IIncomeExpenseForm>({
        dateNote: "",
        nominal: 0,
        status: true,
    });

    useEffect(() => {
        if (incomeExpenseId !== "-1") {
            const detail = incomeExpensesDummy.find(i => i.id === incomeExpenseId);
            if (detail) {
                setInExForm({
                    note: detail.note,
                    dateNote: detail.dateNote.toDateString(),
                    imageUrl: detail.imageUrl,
                    nominal: detail.nominal,
                    status: detail.status,
                })
            }
        }
    }, [incomeExpenseId])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInExForm({...inExForm, [name]: value})
    }

    const handleCancel = () => {
        setIncomeExpenseId("-1");
        setInExForm({
            dateNote: "",
            nominal: 0,
            status: true,
            note: ""
        })
        document.getElementById("form-debt").close()
    }

    const handleSubmit = () => {
        const message = incomeExpenseId === "-1" ? "Berhasil menambah catatan" : "Berhasil memperbaui catatan";
        toast.success(message);
        setInExForm({
            dateNote: "",
            nominal: 0,
            status: true,
            note: ""
        })
        document.getElementById("form-debt").close()
    }

    const handleSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        setInExForm({...inExForm, status: value === "true"})
    }

    return(
        <>
            <dialog id={"form-debt"} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{incomeExpenseId === "-1" ? "Tambah Catatan" : "Edit Catatan"}</h3>
                    {incomeExpenseId !== "-1" && (
                        <div className={'grid grid-cols-1 md:grid-cols-2 gap-1 text-slate-400 mb-2 text-sm'}>
                            <div>Dibuat Oleh: Andi</div>
                            <div>Diperbarui Oleh: Royan</div>
                            <div>Dibuat Pada: 22 Jan 2023 05:16</div>
                            <div>Diperbarui Pada: 23 Jan 2024 06:17</div>
                        </div>
                    )}
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 '}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Piih Jenis</span>
                            </div>
                            <select className="select select-bordered" onChange={handleSelectOnChange}>
                                <option disabled selected>Pilih Jenis</option>
                                <option value={"true"}>Pemasukkan</option>
                                <option value={"false"}>Pengeluaran</option>
                            </select>
                        </label>

                        <InputText2 labelTitle={"Tanggal"} value={inExForm?.dateNote} name={"dateNote"} handleOnChange={handleOnChange} type={"date"} />
                    </div>
                    <div className={'grid grid-cols-1 gap-2'}>
                        <InputText2 labelTitle="Nominal" type={"number"} value={inExForm.nominal} name={"nominal"} handleOnChange={handleOnChange}/>
                        <TextAreaInput2
                            labelTitle={"Catatan"}
                            name={"note"}
                            handleOnChange={(e) => setInExForm({...inExForm, note: e.target.value})}
                            value={inExForm.note}

                        />
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Sertakan Foto  <span className={'text-[red]'}>*tidak wajib</span></span>
                            </div>
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs file-input-primary" />
                        </label>

                        {(incomeExpenseId !== "-1" && inExForm.imageUrl) && (
                            <div className={'w-1/2'}>
                                <img src={inExForm.imageUrl} alt={"photo"}/>
                                <button className={'btn btn-primary btn-sm'}>Download Photo</button>
                            </div>

                        )}

                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className={'flex gap-2 justify-end'}>
                                <button className={'btn btn-success text-white'} onClick={handleSubmit} type={"button"}>Simpan</button>
                                <button className="btn" onClick={handleCancel}>Batal</button>
                            </div>
                        </form>
                    </div>


                </div>
            </dialog>

        </>
    )
}
