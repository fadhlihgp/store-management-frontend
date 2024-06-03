import { useEffect, useState } from "react"
import TitleCard from "../../../components/Cards/TitleCard"
import { ComboBox, IOption } from "../../../components/Input/ComboBox"
import { useGetCustomerQuery } from "../../../apps/services/customerApi"
import { DebtListDetailForm } from "../Components/DebtListDetailForm"
import { FormComponentDebt } from "../Components/FormComponentDebt"
import { useNavigate } from "react-router-dom"
import { IDebtDetailRequest, IDebtRequest } from "../../../utils/interfaces"
import { useGetProductsQuery } from "../../../apps/services/productApi"
import { useAddNoteDebtMutation } from "../../../apps/services/noteDebtApi"
import toast from "react-hot-toast"
import { ConfirmationModal } from "../../../components/Modals/ConfirmationModal"
import { showOrCloseModal } from "../../../utils/showModalHelper"

const breadcrumbsData = [
    {
        name: "Data Hutang",
        url: "/note-debt"
    },
    {
        name: "Form",
        url: "/"
    }
]

export const AddDebtForm = () => {
    const navigate = useNavigate();
    const [idIndex, setIdIndex] = useState<number>(-1);
    const [customerOptions, setCustomerOptions] = useState<IOption[]>([]);
    const [productOptions, setProductOptions] = useState<IOption[]>([]);
    const {data: dataProducts, isSuccess: isSuccessProduct} = useGetProductsQuery();
    const {data: customerList, isSuccess} = useGetCustomerQuery();
    const [debtForm, setDebtForm] = useState<IDebtRequest>({
        customerId: "",
        debtDetails: []
    });
    const [debtDetailForm, setDebtDetailForm] = useState<IDebtDetailRequest>({
        count: 0,
        date: new Date(),
        note: "",
        price: 0,
        productId: "",
        unitProductId: ""
    });
    const [indexDebtDetail, setIndexDebtDetail] = useState<number>(-1);
    const [errorCustomer, setErrorCustomer] = useState<string>();
    const [errorDetail, setErrorDetail] = useState<string>();
    const [addDebt, {isLoading}] = useAddNoteDebtMutation();

    useEffect(() => {
        if (isSuccess) {
            const options = customerList.data.map(c => ({
                id: c.id,
                name: c.fullName
            }));
            setCustomerOptions(options);
        }
    }, [customerList, isSuccess])

    useEffect(() => {
        if (isSuccessProduct) {
            const options = dataProducts.data.map(p => ({
                id: p.id,
                name: p.name
            }))
            setProductOptions(options);
        }
    }, [dataProducts, isSuccessProduct]);

    const handleOnChangeComboBox = (option: IOption | null) => {
        if (option?.id) {
            setDebtForm({...debtForm, customerId: option?.id.toString()});
            setErrorCustomer(undefined);
        }
    }

    const validation = (): boolean => {
        let isValidate = true;
        if (debtForm.customerId.length < 1) {
            setErrorCustomer("Data pelanggan tidak boleh kosong");
            isValidate = false;
        }
        if (debtForm.debtDetails.length < 1) {
            setErrorDetail("Minimal terdapat satu data hutang");
            isValidate = false;
        }
        return isValidate;
    }

    const handleSave = () => {
        if (!validation()) {
            return;
        }

        // console.log(debtForm);
        addDebt(debtForm).unwrap()
        .then((res) => {
            toast.success(res.message);
            navigate('/note-debt')
        })
        .catch((err) => {
            toast.error(err.message ?? "Gagal mennyimpan data");
        })
    }

    const submitForm = () => {
        if (indexDebtDetail === -1) {
            setDebtForm({...debtForm, debtDetails: [...debtForm.debtDetails, debtDetailForm]});
        } else {
            setDebtForm(prevForm => {
                const newDebtDetail = [...prevForm.debtDetails];
                newDebtDetail[indexDebtDetail] = debtDetailForm;
                return {
                    ...prevForm,
                    debtDetails: newDebtDetail
                };
            })
        }

        setIndexDebtDetail(-1);
    }

    const handleDelete = () => {
        if (debtForm.debtDetails) {
            setDebtForm(prevForm => {
                const newDebtDetails = [...prevForm.debtDetails];
                newDebtDetails.splice(idIndex, 1);
                return {
                    ...prevForm,
                    debtDetails: newDebtDetails
                };
            });
        }
        setIdIndex(-1);
        showOrCloseModal("delete-debt", "close");
    }

    const showEditForm = (debtDetailRequest: IDebtDetailRequest, index: number) => {
        setIndexDebtDetail(index);
        // const debtDetail = debtForm.debtDetails[indexDebtDetail];
        setDebtDetailForm(debtDetailRequest);
        showOrCloseModal("form-debt", "show");
    
    }

    const showConfirmationDelete = (index: number) => {
        setIdIndex(index);
        showOrCloseModal("delete-debt", "show");
    }

    return(
        <>
            <ConfirmationModal onClickYes={handleDelete} id="delete-debt" message="Anda yakin ingin menghapus data hutang ?"/>
            <FormComponentDebt key={"0"} 
                debtDetailForm={debtDetailForm} 
                setDebtDetailForm={setDebtDetailForm} 
                handleSubmit={submitForm}
                indexDebtDetail={indexDebtDetail}
                setIndexDebtDetail={setIndexDebtDetail}
            />
            <TitleCard title={"Tambah Hutang"} topMargin="mt-2" breadcrumbsData={breadcrumbsData}>
                <div className={'grid grid-cols-1'}>
                    <ComboBox 
                        options={customerOptions} 
                        labelTitle={"Pelanggan"} 
                        key={"9"} 
                        onChange={handleOnChangeComboBox} 
                    />
                    {errorCustomer && (
                        <span className="ml-1 text-red-600">{errorCustomer}</span>
                    )}
                </div>

                <DebtListDetailForm 
                    showEdited={true} 
                    products={productOptions} 
                    debtForm={debtForm} 
                    handleDelete={showConfirmationDelete}
                    handleShowEdit={showEditForm}
                />
                {errorDetail && (
                    <span className="ml-1 text-red-600">{errorDetail}</span>
                )}
                <div className={'flex gap-2 justify-end'}>
                <div className="mt-16"><button className="btn float-right" onClick={() => navigate(-1)}>Batal</button>
                </div>
                    <div className="mt-16">
                        {/* <button 
                            className="btn btn-primary float-right"
                            onClick={handleSave}
                        >
                            Simpan
                        </button> */}
                            <button className="btn btn-primary float-right" onClick={handleSave} disabled={isLoading}>
                                {isLoading ? <>
                                    <span className="loading loading-spinner"></span>
                                    Menyimpan data
                                </> : "Simpan" }
                            </button>
                </div>
            </div>
            </TitleCard>
        </>
    )
}