import { useNavigate, useParams } from "react-router-dom";
import { useAddStockInMutation, useEditStockInMutation, useGetProductsQuery, useGetStockInByIdQuery } from "../../apps/services/productApi";
import { IStockInRequest } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TitleCard from "../../components/Cards/TitleCard";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import { useGetSuppliersQuery } from "../../apps/services/supplierApi";
import { ComboBox, IOption } from "../../components/Input/ComboBox";
import DatePicker from "tailwind-datepicker-react";
import { formatStringToDate } from "../../utils/formDateString";
import moment from "moment";

const breadcrumbsData = [
    {
        name: "Data Stok Masuk",
        url: "/product/stock-in"
    },
    {
        name: "Form",
        url: "/"
    }
]
export const StockInFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: stockInDetail, isLoading: isGetLoading, isError: isErrorGetData} = useGetStockInByIdQuery(id ?? "");
    const [addStockIn, {isLoading: isAddLoading}] = useAddStockInMutation();
    const [editStockIN, {isLoading: isEditLoading}] = useEditStockInMutation();
    const {data: supplierList, isSuccess: isSuccessGetSupplier} = useGetSuppliersQuery();
    const {data: productList, isSuccess: isSuccessGetProducts} = useGetProductsQuery();
    const [productOptions, setProductOptions] = useState<IOption[]>([]);
    const [supplierOptions, setSupplierOption] = useState<IOption[]>([]);
    const [stockInForm, setStockInForm] = useState<IStockInRequest>({
        productId: "",
        date: new Date(),
        note: "",
        totalItem: 0,
        totalPrice: 0,

    });
    const [showDate, setShowDate] = useState<boolean>(false);

    const handleCloseDate = (state: boolean) => {
		setShowDate(state)
	}

    const handleChangeDate = (selectedDate: Date) => {
        setStockInForm(stockInForm => ({...stockInForm, date: formatStringToDate(moment(selectedDate).format("YYYY-MM-DD"))}));
	}

    useEffect(() => {
        if(isSuccessGetSupplier && supplierList.data){
            const options:any = supplierList.data.map(c => ({
                id: c.id,
                name: c.name
            }));
            options.unshift({
                id: null,
                name: "Lainnya"
            });
            setSupplierOption(options);
        }
    }, [isSuccessGetSupplier, supplierList])

    useEffect(() => {
        if (isSuccessGetProducts && productList.data){
            const options: any = productList.data.map(c => ({              
                id: c.id,
                name: c.name
            }));
            setProductOptions(options);
        }
    }, [isSuccessGetProducts, productList])

    useEffect(() => {
        if (id && stockInDetail?.data) {
            setStockInForm(stockInDetail?.data)
        }
    }, [stockInDetail, id])

    const handleOnChangeComboBox = (name: string, option: IOption | null) => {
        setStockInForm({...stockInForm, [name]: option?.id?.toString() ?? null});
        // setPurchaseTypeError(undefined);
    }

    const handleAdd = () => {
        addStockIn(stockInForm).unwrap()
            .then((res) => {
                window.scrollTo(0,0);
                toast.success(res.message);
                navigate("/product/stock-in")
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
                data: stockInForm
            }
            editStockIN(input).unwrap()
                .then((res) => {
                    window.scrollTo(0,0);
                    toast.success(res.message);
                    navigate("/product/stock-in")
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
        setStockInForm({...stockInForm,  [updateType]: value})
    }

    const getOptionById = (options: IOption[], optionId: string): IOption => {
        const optFind: IOption = {
            id: null,
            name: "Lainnya"
        }
        const optionFind = options.find(o => o.id === optionId);
        return optionFind ?? optFind;
    }

    return(
        <TitleCard
            title={id ? "Edit Stok Masuk" : "Tambah Stok Masuk"}
            topMargin="mt-2"
            breadcrumbsData={breadcrumbsData}
            showManipulation={id ? true : false}
            createdAt={stockInDetail?.data?.createdAt}
            createdBy={stockInDetail?.data?.createdBy}
            editedAt={stockInDetail?.data?.editedAt}
            editedBy={stockInDetail?.data?.editedBy}
        >
            {id && isErrorGetData && (
                <FailedLoad key={"1"}/>
            )}
            
            {isGetLoading ? <LoadingProcess loadingName={"Memproses data stok masuk"}/> : (
                <form onSubmit={handleSaveCustomer}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ComboBox 
                            options={supplierOptions} 
                            labelTitle={"Supplier"} 
                            key={"9"} 
                            isRequired={true}
                            defaultValue={getOptionById(supplierOptions, stockInForm.supplierId ?? "")}
                            onChange={(value) => handleOnChangeComboBox("supplierId", value)}                         
                        />
                        <ComboBox 
                            options={productOptions} 
                            labelTitle={"Produk"} 
                            isRequired={true}
                            key={"8"} 
                            defaultValue={getOptionById(productOptions, stockInForm.productId ?? "")}
                            onChange={(value) => handleOnChangeComboBox("productId", value)}
                            isDisabled={id ? true : false}                         
                        />
                        <InputText labelTitle="Total Item" updateType={"totalItem"} isRequired={true} type="number" defaultValue={stockInDetail?.data?.totalItem} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Total Harga" updateType={"totalPrice"} isRequired={true} type={"number"} defaultValue={stockInDetail?.data?.totalPrice} updateFormValue={updateFormValue}/>
                        <div className={`form-control w-full`}>
                            <label className="label">
                                <span className={"label-text text-base-content "}>Tanggal</span>
                            </label>
                            <DatePicker
                                value={new Date(stockInForm.date)}
                                show={showDate}
                                setShow={handleCloseDate}
                                onChange={handleChangeDate}
                            />
                        </div>
                        <TextAreaInput  labelTitle="Catatan" updateType={"note"} isRequired={true} defaultValue={stockInDetail?.data?.note ?? ""} updateFormValue={updateFormValue}/>
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
