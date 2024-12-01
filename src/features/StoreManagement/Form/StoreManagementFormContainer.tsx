import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { IStoreRequest } from "../../../utils/interfaces.ts";
import { useAddStoreMutation, useEditStoreMutation, useGetStoreByIdQuery } from "../../../apps/services/storeApi.ts";
import InputText2 from "../../../components/Input/InputText2.tsx";
import TextAreaInput2 from "../../../components/Input/TextAreaInput2.tsx";

const breadcrumbsData = [
    {
        name: "Store Management",
        url: "/store-management"
    },
    {
        name: "Form",
        url: "/"
    }
]
export const StoreManagementFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [storeForm, setStoreForm] = useState<IStoreRequest>({
        name: "",
        address: "",
        phoneNumber: "",
        businessType: ""
    });
    const [addStore] = useAddStoreMutation();
    const [editStore] = useEditStoreMutation();
    const {data, isLoading} = useGetStoreByIdQuery(id ?? "-1");

    useEffect(() => {
        if(data) {
            setStoreForm({
                address: data.data.address,
                name: data.data.name,
                phoneNumber: data.data.phoneNumber,
                businessType: data.data.businessType,
                establishDate: data.data.establishDate
            })
        }
        console.log(data)
    }, [data, isLoading])

    const handleSaveStore = () => {
        console.log(storeForm)
        if (!id) {
            addStore(storeForm).unwrap()
            .then(res => {
                window.scrollTo(0,0);
                toast.success(res.message ?? "Berhasil menambah store");
                navigate("/store-management");
            })
            .catch(err => {
                toast.error(err.data.message ?? "Gagal menambah store");
            })
        } else {
            editStore({id, data: storeForm}).unwrap()
            .then(res => {
                window.scrollTo(0,0);
                toast.success(res.message ?? "Berhasil memperbarui store");
                navigate("/store-management");
            })
            .catch(err => {
                toast.error(err.data.message ?? "Gagal memperbarui store");
            })
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStoreForm({...storeForm, [e.target.name]: e.target.value});
    }

    return(
        <TitleCard title={id ? "Edit Store" : "Tambah Store"} topMargin="mt-2" breadcrumbsData={breadcrumbsData}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText2 labelTitle="Nama" value={storeForm.name} handleOnChange={handleOnChange} updateType="name" name="name"/>
                <InputText2 labelTitle="Phone" value={storeForm.phoneNumber} handleOnChange={handleOnChange} updateType="name" name="phoneNumber"/>
                <InputText2 labelTitle="Tipe Usaha" value={storeForm.businessType} handleOnChange={handleOnChange} updateType="name" name="businessType"/>
                <TextAreaInput2 handleOnChange={(e) => setStoreForm({...storeForm, address: e.target.value})} name="address" value={storeForm.address} labelTitle="Alamat"/>
                {/* <InputText labelTitle="Nama" defaultValue={storeForm.name} updateFormValue={updateFormValue} updateType="name"/>
                <InputText labelTitle="Phone" defaultValue={storeForm.phoneNumber} updateFormValue={updateFormValue} updateType="phoneNumber"/>
                <InputText labelTitle="Tipe Usaha" defaultValue={storeForm.businessType} updateFormValue={updateFormValue} updateType="businessType"/> */}
                {/* <InputText labelTitle="Didirikan" type={storeForm.establishDate ?? 0} defaultValue="" updateFormValue={updateFormValue} updateType="established" /> */}
                {/* <TextAreaInput  labelTitle="Alamat" defaultValue={storeForm.address} updateFormValue={updateFormValue} updateType={"address"} /> */}
            </div>

            <div className={'flex gap-2 justify-end'}>
                <div className="mt-16"><button className="btn float-right" onClick={() => navigate(-1)}>Batal</button></div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={handleSaveStore}>{id ? "Update" : "Simpan"}</button></div>
            </div>
        </TitleCard>
    )
}