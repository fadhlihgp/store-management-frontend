import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IDebtRequest, IProductPurchaseRequest, IPurchaseRequest } from "../../../utils/interfaces"
import { useGetProductsQuery } from "../../../apps/services/productApi"
import toast from "react-hot-toast"
import { showOrCloseModal } from "../../../utils/showModalHelper"
import { ConfirmationModal } from "../../../components/Modals/ConfirmationModal"
import { FormComponentPurchase } from "../Components/FormComponentPurchase"
import TitleCard from "../../../components/Cards/TitleCard"
import { ComboBox, IOption } from "../../../components/Input/ComboBox"
import { PurchaseListDetailForm } from "../Components/PurchaseListDetailForm"
import { useGetCustomerQuery } from "../../../apps/services/customerApi"
import InputText from "../../../components/Input/InputText"
import Datepicker from "tailwind-datepicker-react"
import SelectBox from "../../../components/Input/SelectBox"
import { useGetParameterizeQuery } from "../../../apps/services/otherApi"
import TextAreaInput from "../../../components/Input/TextAreaInput"
import { useGetProfileQuery } from "../../../apps/services/profileApi"
import InputText2 from "../../../components/Input/InputText2"
import { useCreatePurchaseMutation } from "../../../apps/services/purchaseApi"
import { InformationModalChoice } from "../../../components/Modals/InformationModalChoice"
import { formatStringToDate } from "../../../utils/formDateString"
import moment from "moment"

const breadcrumbsData = [
    {
        name: "Transaksi Pembelian",
        url: "/"
    }
]

const paymentMethodOptions = [
    {
        name: "Tunai"
    },
    {
        name: "QRIS"
    },
    {
        name: "Transfer"
    },
    {
        name: "Lainya"
    }
]
export const PurchaseTransactionContainer = () => {
    const navigate = useNavigate();
    const [idIndex, setIdIndex] = useState<number>(-1);
    const [customerOptions, setCustomerOptions] = useState<IOption[]>([]);
    const [productOptions, setProductOptions] = useState<IOption[]>([]);
    const [purchaseTypeOptions, setPurchaseTypeOptions] = useState<IOption[]>([]);
    const {data: dataProducts, isSuccess: isSuccessProduct} = useGetProductsQuery();
    const {data: customerList, isSuccess} = useGetCustomerQuery();
    const {data: currentAccount, isSuccess: isSuccessCurrentAccount} = useGetProfileQuery();
    const {data: purchaseTypeList, isSuccess: isSuccessPurchaseType} = useGetParameterizeQuery("purchase-type");
    const [debtForm, setDebtForm] = useState<IDebtRequest>({
        customerId: "",
        debtDetails: []
    });
    const [adminName, setAdminName] = useState<string>("");

    const [productForm, setProductForm] = useState<IProductPurchaseRequest>({
        price: 0,
        productId: "",
        qty: 0,
        unitPriceId: ""
    });
    
    const [purchaseRequestForm, setPurchaseRequestForm] = useState<IPurchaseRequest>({
        customerId: null,
        date: new Date(),
        money: 0,
        payment: "",
        purchaseTypeId: "",
        purchaseDetails:[]
    });

    const [indexPurchaseDetail, setIndexPurchaseDetail] = useState<number>(-1);
    const [purchaseTypeError, setPurchaseTypeError] = useState<string>();
    const [errorDetail, setErrorDetail] = useState<string>();
    const [errorPaymentMethod, setErrorPaymentMethod] = useState<string>();
    const [errorMoney, setErrorMoney] = useState<string>();
    const [addPurchase, {isLoading}] = useCreatePurchaseMutation();
    const totalPrice = purchaseRequestForm.purchaseDetails.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    
    // Use effect for get admin name
    useEffect(() => {
        if(isSuccessCurrentAccount) {
            setAdminName(currentAccount.data.fullName);
            // console.log(currentAccount.data.fullName);
            // console.log(adminName);
        }
    }, [adminName, currentAccount, isSuccessCurrentAccount])

    useEffect(() => {
        if (isSuccess) {
            const options:any = customerList.data.map(c => ({
                id: c.id,
                name: c.fullName
            }));
            options.unshift({
                id: null,
                name: "Umum"
            });
            setCustomerOptions(options);
        }
        if (isSuccessPurchaseType) {
            const options = purchaseTypeList.data.map(c => ({
                id: c.id,
                name: c.name
            }));
            setPurchaseTypeOptions(options);
        }
    }, [customerList, isSuccess, isSuccessPurchaseType, purchaseTypeList])

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
        setPurchaseRequestForm({...purchaseRequestForm, customerId: option?.id.toString() ?? null});
        setPurchaseTypeError(undefined);
    }

    const validation = (): boolean => {
        let isValidate = true;
        if (purchaseRequestForm.purchaseTypeId.length < 1) {
            setPurchaseTypeError("Tipe transaksi tidak boleh kosong");
            isValidate = false;
        }
        if (purchaseRequestForm.purchaseDetails.length < 1) {
            setErrorDetail("Minimal terdapat satu data pembelian");
            isValidate = false;
        }
        if (purchaseRequestForm.money < 1) {
            setErrorMoney("Jumlah uang tidak boleh kosong");
            isValidate = false;
        }
        if (purchaseRequestForm.money < totalPrice) {
            setErrorMoney("Jumlah uang tidak boleh kurang dari total harga");
            isValidate = false;
        }
        if(purchaseRequestForm.payment.length < 1) {
            setErrorPaymentMethod("Metode pembayaran tidak boleh kosong");
            isValidate = false;
        }
        return isValidate;
    }

    const handleSave = () => {
        if (!validation()) {
            return;
        }

        addPurchase(purchaseRequestForm).unwrap()
        .then((res) => {
            toast.success(res.message);
            showOrCloseModal("info-modal", "show");
            // navigate('/transaction-history')
        })
        .catch((err) => {
            toast.error(err.message ?? "Gagal menyimpan data");
        })
    }

    const submitForm = () => {
        if (indexPurchaseDetail === -1) {
            setPurchaseRequestForm({...purchaseRequestForm, purchaseDetails: [...purchaseRequestForm.purchaseDetails, productForm]});
        } else {
            setPurchaseRequestForm(prevForm => {
                const newDebtDetail = [...prevForm.purchaseDetails];
                newDebtDetail[indexPurchaseDetail] = productForm;
                return {
                    ...prevForm,
                    purchaseDetails: newDebtDetail
                };
            })
        }
        setErrorDetail(undefined);
        setIndexPurchaseDetail(-1);
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
        showOrCloseModal("delete-purchase", "close");
    }

    const showEditForm = (productRequest: IProductPurchaseRequest, index: number) => {
        setIndexPurchaseDetail(index);
        // const debtDetail = debtForm.debtDetails[indexPurchaseDetail];
        setProductForm(productRequest);
        showOrCloseModal("form-purchase", "show");
    
    }

    const showConfirmationDelete = (index: number) => {
        setIdIndex(index);
        showOrCloseModal("delete-purchase", "show");
    }


    const [showDate, setShowDate] = useState<boolean>(false);
	
    const handleChangeDate = (selectedDate: Date) => {
        setPurchaseRequestForm(prevForm => ({...prevForm, date: formatStringToDate(moment(selectedDate).format("YYYY-MM-DD"))}));
	}

	const handleCloseDate = (state: boolean) => {
		setShowDate(state)
	}

    return(
        <>
            <InformationModalChoice 
                id="info-modal" 
                type="success" 
                handleOnClick={() => showOrCloseModal("info-modal", "close")} 
                handleClose={() => {
                    showOrCloseModal("info-modal", "close") 
                    navigate('/transaction-history')
                }}
                message="Berhasil melakukan transaksi pembayaran" 
                buttonText="Cetak Invoice"
            />

            <ConfirmationModal onClickYes={handleDelete} id="delete-purchase" message="Anda yakin ingin menghapus data pembelian ini?" />
            <FormComponentPurchase key={"0"} 
                productForm={productForm}
                setProductForm={setProductForm}
                handleSubmit={submitForm}
                indexPurchaseDetail={indexPurchaseDetail}
                setIndexPurchaseDetail={setIndexPurchaseDetail}
            />
            <TitleCard title={"Tambah Transaksi Pembelian"} topMargin="mt-2" breadcrumbsData={breadcrumbsData}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <InputText2
                        name="adminName"
                        value={adminName}
                        labelTitle="Admin"
                        labelStyle="mb-1/4"
                        isDisabled={true}
                    />

                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Tanggal</span>
                        </label>
                        {/* <input required={isRequired} type={type || "text"} value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)} className="input  input-bordered w-full " disabled={isDisabled} /> */}
                        <Datepicker
                            show={showDate}
                            setShow={handleCloseDate}
                            onChange={handleChangeDate}
                        />
                    </div>

                    <ComboBox 
                        options={customerOptions} 
                        labelTitle={"Pelanggan"} 
                        key={"9"} 
                        onChange={handleOnChangeComboBox} 
                    />

                    <div className="w-full">
                        <SelectBox 
                            containerStyle="w-full"
                            labelTitle="Tipe Transaksi Pembelian"
                            placeholder="Pilih tipe transaksi pembelian"
                            options={purchaseTypeOptions}
                            updateFormValue={(e) => {
                                setPurchaseRequestForm({...purchaseRequestForm, purchaseTypeId: e.value})
                                setPurchaseTypeError(undefined);
                            }} 
                        />
                        {purchaseTypeError && (
                            <div className="ml-1 text-red-600">{purchaseTypeError}</div>
                        )}
                    </div>

                    <TextAreaInput 
                        labelTitle="Catatan"
                        updateFormValue={(e) => setPurchaseRequestForm({...purchaseRequestForm, note: e.value})}
                        defaultValue=""
                        placeholder="Catatan tambahan"
                    />
                    
                </div>

                <PurchaseListDetailForm 
                    showEdited={true} 
                    products={productOptions} 
                    purchaseForm={purchaseRequestForm}
                    handleDelete={showConfirmationDelete}
                    handleShowEdit={showEditForm}
                />
                {errorDetail && (
                    <span className="ml-1 text-red-600">{errorDetail}</span>
                )}

                <div className="card bg-base-100 shadow-xl mt-6">
                    <div className="card-body flex gap-4">
                        <h2 className="card-title">Detail Pembayaran</h2>

                        <div className="w-full">
                            <SelectBox
                                labelTitle="Metode Pembayaran"
                                placeholder="Pilih metode pembayaran" 
                                updateFormValue={(e) => {
                                    setPurchaseRequestForm({...purchaseRequestForm, payment: e.value})
                                    setErrorPaymentMethod(undefined);
                                }} 
                                containerStyle="flex gap-2"
                                labelStyle="w-1/4"
                                options={paymentMethodOptions}
                            />
                            {errorPaymentMethod && (
                                <div className="ml-1 text-red-600">{errorPaymentMethod}</div>
                            )}
                        </div>

                        <div className={`flex gap-2 items-center`}>
                            <label className={"label disabled w-1/4"}>
                                <span className={"label-text text-base-content "}>{"Total"}</span>
                            </label>
                            <input type={"text"} value={totalPrice} className="input  input-bordered w-full font-semibold " disabled={true} />
                        </div>

                        <div className="w-full">
                            <InputText
                                updateFormValue={(e) => {
                                    setPurchaseRequestForm({...purchaseRequestForm, money: Number(e.value)})
                                    setErrorMoney(undefined)
                                }}
                                labelTitle="Uang Dimasukkan"
                                labelStyle="disabled w-1/4"
                                isDisabled={false}
                                type="number"
                                containerStyle="flex gap-2 items-center"
                            />
                            {errorMoney && (
                                <div className="ml-1 text-red-600">{errorMoney}</div>
                            )}
                        </div>
                    

                        <div className={`flex gap-2 items-center`}>
                            <label className={"label disabled w-1/4"}>
                                <span className={"label-text text-base-content "}>{"Kembali"}</span>
                            </label>
                            <input type={"text"} value={purchaseRequestForm.money - totalPrice} className="input input-bordered w-full font-semibold" disabled={true} />
                        </div>
                    </div>
                </div>

                <div className={'flex gap-2 justify-end'}>
                <div className="mt-16"><button className="btn float-right" onClick={() => navigate(-1)}>Batal</button>
                </div>
                    <div className="mt-16">
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