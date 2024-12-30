import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import { IMasterParameterRequest } from "../../utils/interfaces";
import { useAddMasterParameterMutation, useGetMasterParameterByIdQuery, useUpdateMasterParameterMutation } from "../../apps/services/otherApi";

const breadcrumbsData = [
    {
        name: "Data Master Parameter",
        url: "/master-parameter"
    },
    {
        name: "Form",
        url: "/"
    }
]

export const MasterParameterFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: parameterDetail, isLoading: isGetLoading, isError: isErrorGetData} = useGetMasterParameterByIdQuery(id ?? "");
    const [addParameter, {isLoading: isAddLoading}] = useAddMasterParameterMutation();
    const [editParameter, {isLoading: isEditLoading}] = useUpdateMasterParameterMutation();
    const [parameterForm, setParameterForm] = useState<IMasterParameterRequest>({
        name: "",
        orderData: 0,
        type: "",
    });

    useEffect(() => {
        if (id && parameterDetail?.data) {
            setParameterForm(parameterDetail.data)
        }
    }, [parameterDetail, id])

    const handleAdd = () => {
        addParameter(parameterForm).unwrap()
            .then((res) => {
                window.scrollTo(0,0);
                toast.success(res.message);
                navigate("/master-parameter")
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
                data: parameterForm
            }
            editParameter(input).unwrap()
                .then((res) => {
                    window.scrollTo(0,0);
                    toast.success(res.message);
                    navigate("/master-parameter")
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Gagal menyimpan data");
                })
        }
    }

    const handleSaveMasterParameter = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!id) {
            handleAdd();
        } else {
            handleEdit();
        }
    }

    const updateFormValue = ({updateType, value}: any) => {
        setParameterForm({...parameterForm,  [updateType]: value})
    }

    return(
        <TitleCard
            title={id ? "Edit Master Parameter" : "Tambah Master Parameter"}
            topMargin="mt-2"
            breadcrumbsData={breadcrumbsData}
            showManipulation={id ? true : false}
            createdAt={parameterDetail?.data?.editedAt}
            createdBy={parameterDetail?.data?.editedBy}
            editedAt={parameterDetail?.data?.editedAt}
            editedBy={parameterDetail?.data?.editedBy}
        >
            {id && isErrorGetData && (
                <FailedLoad key={"1"}/>
            )}
            {isGetLoading ? <LoadingProcess loadingName={"Memproses data master parameter"}/> : (
                <form onSubmit={handleSaveMasterParameter}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText labelTitle="Nama" updateType={"name"} isRequired={true} defaultValue={parameterDetail?.data?.name} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Order Data" updateType={"orderData"} type={"number"} defaultValue={parameterDetail?.data?.orderData ?? 0} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Type" updateType={"type"} isRequired={true} defaultValue={parameterDetail?.data?.type} updateFormValue={updateFormValue}/>
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