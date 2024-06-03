import InputText2 from "../../../components/Input/InputText2.tsx";
import React, {useEffect, useState, useRef} from "react";
import TextAreaInput2 from "../../../components/Input/TextAreaInput2";
import toast from "react-hot-toast";
import { useAddNoteIncomeExpenseMutation, useEditNoteIncomeExpenseMutation } from "../../../apps/services/noteIncomeExpenseApi.ts";
import { IIncomeExpenseRequest, IIncomeExpenseResponse } from "../../../utils/interfaces.ts";
import moment from "moment";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";

interface FormComponentInExProps {
    incomeExpenseId: string,
    setIncomeExpenseId: React.Dispatch<React.SetStateAction<string>>,
    incomeExpenses?: IIncomeExpenseResponse[]
}

export const FormComponentInEx = ({incomeExpenseId, setIncomeExpenseId, incomeExpenses}: FormComponentInExProps) => {
    const [incomeExpenseForm, setIncomeExpenseForm] = useState<IIncomeExpenseRequest>({
        amount: 0,
        date: new Date(),
        type: true,
        note: ""
    });
    const [incomeExpenseDetail, setIncomeExpenseDetail] = useState<IIncomeExpenseResponse>();
    const [addNote, {isLoading: isLoadingAdd}] = useAddNoteIncomeExpenseMutation();
    const [editNote, {isLoading: isLoadingEdit}] = useEditNoteIncomeExpenseMutation();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (incomeExpenseId !== "-1" && incomeExpenses) {
            const detail = incomeExpenses.find(i => i.id === incomeExpenseId);
            if (detail) {
                setIncomeExpenseForm({...incomeExpenseForm, 
                    amount: detail.amount,
                    date: new Date(detail.date),
                    type: detail.type,
                    note: detail.note
                })
                setIncomeExpenseDetail(detail);
            }
        } else if (incomeExpenseId === "-1") {
            reset();
        }
    }, [incomeExpenseId])

    const reset = () => {
        setIncomeExpenseId("-1");
        setIncomeExpenseForm({...incomeExpenseForm, 
            amount: 0,
            date: new Date(),
            type: true,
            note: "",
            image: undefined
        });
        if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset the file input value
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "date") {
            setIncomeExpenseForm({...incomeExpenseForm, 
                date: new Date(value + 'T00:00:00')
            });
            return;
        }
        setIncomeExpenseForm({...incomeExpenseForm, [name]: value});
    }

    const handleCancel = () => {
        reset();
        showOrCloseModal("form-income-expense", "close")
    }

    const handleSubmit = () => {
        console.log(incomeExpenseForm);
        if (incomeExpenseId === "-1") {
            addNote(incomeExpenseForm).unwrap()
            .then((res) => {
                reset();
                toast.success(res.message);
                showOrCloseModal("form-income-expense", "close");
            })
            .catch((err) => {
                toast.error(err.message ?? "Gagal menyimpan data");
            })
        } else {
            const dataInput = {
                id: incomeExpenseId,
                data: incomeExpenseForm
            };
            editNote(dataInput).unwrap()
            .then((res) => {
                reset();
                toast.success(res.message);
                showOrCloseModal("form-income-expense", "close");
            })
            .catch((err) => {
                toast.error(err.message ?? "Gagal menyimpan data");
            })
        }
    }

    const handleSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        setIncomeExpenseForm({...incomeExpenseForm, type: value === "true"})
    }

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if(file) {
            setIncomeExpenseForm({...incomeExpenseForm, image: file})
        }
    }

    const formatDate = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().substring(0, 10);
    };

    return(
        <>
            <dialog id={"form-income-expense"} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{incomeExpenseId === "-1" ? "Tambah Catatan" : "Edit Catatan"}</h3>
                    {incomeExpenseId !== "-1" && (
                        <div className={'grid grid-cols-1 md:grid-cols-2 gap-1 text-slate-400 mb-2 text-sm'}>
                            <div>Dibuat Oleh: {incomeExpenseDetail?.createdBy}</div>
                            <div>Diperbarui Oleh: {incomeExpenseDetail?.editedBy}</div>
                            <div>Dibuat Pada: {moment(incomeExpenseDetail?.createdAt).format("DD MMMM YYYY HH:mm")}</div>
                            <div>Diperbarui Pada: {moment(incomeExpenseDetail?.editedAt).format("DD MMMM YYYY HH:mm")}</div>
                        </div>
                    )}
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 '}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Piih Jenis</span>
                            </div>
                            <select className="select select-bordered" onChange={handleSelectOnChange} value={incomeExpenseForm.type.toString()}>
                                <option disabled selected>Pilih Jenis</option>
                                <option value={"true"}>Pemasukkan</option>
                                <option value={"false"}>Pengeluaran</option>
                            </select>
                        </label>

                        <InputText2 
                            labelTitle={"Tanggal"} 
                            value={formatDate(incomeExpenseForm.date)} 
                            name={"date"} 
                            handleOnChange={handleOnChange} 
                            type={"date"} 
                        />
                    </div>
                    <div className={'grid grid-cols-1 gap-2'}>
                        <InputText2 labelTitle="Nominal" type={"number"} value={incomeExpenseForm?.amount} name={"amount"} handleOnChange={handleOnChange}/>
                        <TextAreaInput2
                            labelTitle={"Catatan"}
                            name={"note"}
                            handleOnChange={(e) => setIncomeExpenseForm({...incomeExpenseForm, note: e.target.value})}
                            value={incomeExpenseForm?.note}

                        />
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Sertakan Foto  <span className={'text-[red]'}>*tidak wajib</span></span>
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleSelectFile} className="file-input file-input-bordered w-full max-w-xs file-input-primary" />
                        </label>

                        {(incomeExpenseId !== "-1" && incomeExpenseDetail?.imageUrl) && (
                            <div className={'w-1/2'}>
                                <img src={incomeExpenseDetail.imageUrl} alt={"photo"}/>
                                <button className={'btn btn-primary btn-sm mt-2'}>Download Photo</button>
                            </div>

                        )}

                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className={'flex gap-2 justify-end'}>
                                <button 
                                    className={'btn btn-success text-white'} 
                                    onClick={handleSubmit} 
                                    disabled={isLoadingAdd || isLoadingEdit}
                                    type={"button"}>
                                        {isLoadingAdd || isLoadingEdit ? <>
                                        <span className="loading loading-spinner"></span>
                                        Menyimpan data
                                    </> : incomeExpenseId === "-1" ? "Simpan" : "Perbarui" }
                                </button>
                                <button className="btn" onClick={handleCancel}>Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    )
}
