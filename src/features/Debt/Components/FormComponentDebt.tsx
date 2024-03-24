import SelectBox from "../../../components/Input/SelectBox.tsx";
import {satuans} from "../../Product/components/ProductFormPriceModal.tsx";
import {IDebtForm} from "../../../utils/TableDataType.ts";
import TextAreaInput from "../../../components/Input/TextAreaInput.tsx";
import {ComboBox, IOption} from "../../../components/Input/ComboBox.tsx";
import {ProductsDummy} from "../../Product/ProductDummy.ts";
import {CustomersDummy} from "../../Customer/CustomerDummy.ts";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import InputText2 from "../../../components/Input/InputText2.tsx";

export const FormComponentDebt = () => {
    const [optionCustomers, setOptionCustomers] = useState<IOption[]>([]);
    const [debtForm, setDebtForm] = useState<IDebtForm>({
        note: "",
        price: 0,
        count: 0,
        debtDate: "",
        customerId: "",
        unit: "",
        productId: ""
    })

    useEffect(() => {
        const options = CustomersDummy.map(p => ({
            name: p.fullName,
            id: p.id
        }));
        setOptionCustomers(options);
    }, [CustomersDummy]);

    const updateFormValue = (field: string, value: string | number) => {
        setDebtForm({ ...debtForm, [field]: value });
    };

    const submitForm = () => {
        console.log(debtForm)
        setDebtForm({...debtForm,
            note: "",
            price: 0,
            count: 0,
            debtDate: "",
            customerId: "",
            unit: "",
            productId: ""
        });

        toast.success("Berhasil menambah daftar hutang");
        document.getElementById('form-debt').close();
    }

    const onClickCancel = () => {
        setDebtForm({
            note: "",
            price: 0,
            count: 0,
            debtDate: (""),
            customerId: "",
            unit: "",
            productId: ""
        });
        document.getElementById('form-debt').close();
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setDebtForm({...debtForm, [name]: value})
    }

    return(
        <>
            <dialog id={"form-debt"} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tambah Hutang</h3>
                    <div className={'grid grid-cols-1 gap-4'}>
                        <ComboBox options={optionCustomers} labelTitle={"Pelanggan"} />
                        <ComboBox options={ProductsDummy} labelTitle={"Produk"} />
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