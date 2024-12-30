import { useNavigate, useParams } from "react-router-dom"
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";
import { useAddSupplierMutation, useEditSupplierMutation, useGetSupplierDetailQuery } from "../../apps/services/supplierApi";
import { ISupplierRequest } from "../../utils/interfaces";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";

const breadcrumbsData = [
    {
        name: "Data Supplier",
        url: "/supplier"
    },
    {
        name: "Form",
        url: "/"
    }
]

export const SupplierFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: supplierDetail, isLoading: isGetLoading, isError: isErrorGetData} = useGetSupplierDetailQuery(id ?? "");
    const [addSupplier, {isLoading: isAddLoading}] = useAddSupplierMutation();
    const [editSupplier, {isLoading: isEditLoading}] = useEditSupplierMutation();
    const [supplierForm, setSupplierForm] = useState<ISupplierRequest>({
        address: "",
        name: "",
        description: "",
        phoneNumber: ""
    });

    useEffect(() => {
        if (id && supplierDetail?.data) {
            setSupplierForm(supplierDetail.data)
        }
    }, [supplierDetail, id])

    const handleAdd = () => {
        addSupplier(supplierForm).unwrap()
            .then((res) => {
                window.scrollTo(0,0);
                toast.success(res.message);
                navigate("/supplier")
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
                data: supplierForm
            }
            editSupplier(input).unwrap()
                .then((res) => {
                    window.scrollTo(0,0);
                    toast.success(res.message);
                    navigate("/supplier")
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Gagal menyimpan data");
                })
        }
    }

    const handleSaveSupplier = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!id) {
            handleAdd();
        } else {
            handleEdit();
        }
    }

    const updateFormValue = ({updateType, value}: any) => {
        setSupplierForm({...supplierForm,  [updateType]: value})
    }

    return(
        <TitleCard
            title={id ? "Edit Supplier" : "Tambah Supplier"}
            topMargin="mt-2"
            breadcrumbsData={breadcrumbsData}
            showManipulation={id ? true : false}
            createdAt={supplierDetail?.data?.createdAt}
            createdBy={supplierDetail?.data?.createdBy}
            editedAt={supplierDetail?.data?.editedAt}
            editedBy={supplierDetail?.data?.editedBy}
        >
            {id && isErrorGetData && (
                <FailedLoad key={"1"}/>
            )}
            {isGetLoading ? <LoadingProcess loadingName={"Memproses data supplier"}/> : (
                <form onSubmit={handleSaveSupplier}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText labelTitle="Nama" updateType={"name"} isRequired={true} defaultValue={supplierDetail?.data?.name} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="No Ponsel" updateType={"phoneNumber"} isRequired={true} type={"number"} defaultValue={supplierDetail?.data?.phoneNumber} updateFormValue={updateFormValue}/>
                        <TextAreaInput labelTitle="Deskripsi" updateType={"description"} defaultValue={supplierDetail?.data?.description ?? ""} updateFormValue={updateFormValue}/>
                        <TextAreaInput  labelTitle="Alamat" updateType={"address"} isRequired={true} defaultValue={supplierDetail?.data?.address ?? ""} updateFormValue={updateFormValue}/>
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