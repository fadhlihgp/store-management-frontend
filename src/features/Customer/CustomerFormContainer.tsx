import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import TitleCard from "../../components/Cards/TitleCard.tsx";
import InputText from "../../components/Input/InputText.tsx";
import TextAreaInput from "../../components/Input/TextAreaInput.tsx";
import React, {useEffect, useState} from "react";
import {ICustomerRequest} from "../../utils/interfaces";
import {
    useAddCustomerMutation,
    useGetCustomerByIdQuery,
    useUpdateCustomerMutation
} from "../../apps/services/customerApi";
import {LoadingProcess} from "../../components/Loading/LoadingProcess";

const breadcrumbsData = [
    {
        name: "Data Pelanggan",
        url: "/customer"
    },
    {
        name: "Form",
        url: "/"
    }
]
export const CustomerFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: customerDetail, isLoading: isGetLoading} = useGetCustomerByIdQuery(id ?? "");
    const [addCustomer, {isLoading: isAddLoading}] = useAddCustomerMutation();
    const [editCustomer, {isLoading: isEditLoading}] = useUpdateCustomerMutation();
    const [customerForm, setCustomerForm] = useState<ICustomerRequest>({
        address: "",
        fullName: "",
        phoneNumber: ""
    });

    useEffect(() => {
        if (id && customerDetail) {
            setCustomerForm(customerDetail.data)
        }
    }, [customerDetail])

    const handleAdd = () => {
        addCustomer(customerForm).unwrap()
            .then((res) => {
                window.scrollTo(0,0);
                toast.success(res.message);
                navigate("/customer")
            })
            .catch((err) => {
                console.log(err)
                toast.error("Gagal menyimpan data");
            })
    }

    const handleEdit = () => {
        if (id) {
            const input = {
                id: id,
                data: customerForm
            }
            editCustomer(input).unwrap()
                .then((res) => {
                    window.scrollTo(0,0);
                    toast.success(res.message);
                    navigate("/customer")
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Gagal menyimpan data");
                })
        }
    }

    const handleSaveCustomer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!id) {
            handleAdd();
        } else {
            handleEdit();
        }
    }

    const updateFormValue = ({updateType, value}: any) => {
        setCustomerForm({...customerForm,  [updateType]: value})
    }

    return(
        <TitleCard
            title={id ? "Edit Pelanggan" : "Tambah Pelanggan"}
            topMargin="mt-2"
            breadcrumbsData={breadcrumbsData}
        >

            {isGetLoading ? <LoadingProcess loadingName={"Memproses data pelanggan"}/> : (
                <form onSubmit={handleSaveCustomer}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText labelTitle="Nama" updateType={"fullName"} isRequired={true} defaultValue={customerDetail?.data.fullName} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="No Ponsel" updateType={"phoneNumber"} isRequired={true} type={"number"} defaultValue={customerDetail?.data.phoneNumber} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="email" updateType={"email"} type={"email"} defaultValue={customerDetail?.data.email} updateFormValue={updateFormValue}/>
                        <TextAreaInput  labelTitle="Alamat" updateType={"address"} defaultValue={customerDetail?.data.address ?? ""} updateFormValue={updateFormValue}/>
                    </div>
                    <div className={'flex gap-2 justify-end'}>
                        <div className="mt-16"><button className="btn float-right" type={"button"} onClick={() => navigate(-1)}>Batal</button></div>
                        <div className="mt-16">
                            <button className="btn btn-primary float-right"
                                    disabled={isAddLoading || isEditLoading}
                                    type={"submit"}
                            >
                                {isEditLoading || isAddLoading ? <>
                                    <span className="loading loading-spinner"></span>
                                    Menyimpan data
                                </> :
                                    id ? "update" : "simpan"
                                }
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </TitleCard>
    )
}
