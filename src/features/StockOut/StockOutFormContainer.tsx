import { useNavigate, useParams } from "react-router-dom";
import { useAddStockOutMutation, useEditStockOutMutation, useGetProductsQuery, useGetStockOutByIdQuery } from "../../apps/services/productApi";
import { IStockOutRequest } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TitleCard from "../../components/Cards/TitleCard";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import { ComboBox, IOption } from "../../components/Input/ComboBox";
import { formatStringToDate } from "../../utils/formDateString";
import moment from "moment";
import { DatePickerCustom } from "../../components/Input/DatePickerCustom";

const breadcrumbsData = [
    {
        name: "Data Stok Keluar",
        url: "/product/stock-out"
    },
    {
        name: "Form",
        url: "/"
    }
]
export const StockOutFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: stockOutDetail, isLoading: isGetLoading, isError: isErrorGetData} = useGetStockOutByIdQuery(id ?? "");
    const [addStockOut, {isLoading: isAddLoading}] = useAddStockOutMutation();
    const [editStockOut, {isLoading: isEditLoading}] = useEditStockOutMutation();
    const {data: productList, isSuccess: isSuccessGetProducts} = useGetProductsQuery();
    const [productOptions, setProductOptions] = useState<IOption[]>([]);
    const [stockOutForm, setStockOutForm] = useState<IStockOutRequest>({
        productId: "",
        date: new Date(),
        note: "",
        totalItem: 0
    });
    const [showDate, setShowDate] = useState<boolean>(false);

    const handleCloseDate = (state: boolean) => {
		setShowDate(state)
	}

    const handleChangeDate = (selectedDate: Date) => {
        setStockOutForm(stockOutForm => ({...stockOutForm, date: formatStringToDate(moment(selectedDate).format("YYYY-MM-DD"))}));
	}

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
        if (id && stockOutDetail?.data) {
            setStockOutForm(stockOutDetail?.data)
        }
    }, [stockOutDetail, id])

    const handleOnChangeComboBox = (name: string, option: IOption | null) => {
        setStockOutForm({...stockOutForm, [name]: option?.id?.toString() ?? null});
        // setPurchaseTypeError(undefined);
    }

    const handleAdd = () => {
        addStockOut(stockOutForm).unwrap()
            .then((res) => {
                window.scrollTo(0,0);
                toast.success(res.message);
                navigate("/product/stock-out")
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
                data: stockOutForm
            }
            editStockOut(input).unwrap()
                .then((res) => {
                    window.scrollTo(0,0);
                    toast.success(res.message);
                    navigate("/product/stock-out")
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
        setStockOutForm({...stockOutForm,  [updateType]: value})
    }

    const getOptionById = (options: IOption[], optionId: string): IOption => {
        const optFind: IOption = {
            id: null,
            name: ""
        }
        const optionFind = options.find(o => o.id === optionId);
        return optionFind ?? optFind;
    }

    return(
        <TitleCard
            title={id ? "Edit Stok Keluar" : "Tambah Stok Keluar"}
            topMargin="mt-2"
            breadcrumbsData={breadcrumbsData}
            showManipulation={id ? true : false}
            createdAt={stockOutDetail?.data?.createdAt}
            createdBy={stockOutDetail?.data?.createdBy}
            editedAt={stockOutDetail?.data?.editedAt}
            editedBy={stockOutDetail?.data?.editedBy}
        >
            {id && isErrorGetData && (
                <FailedLoad key={"1"}/>
            )}
            
            {isGetLoading ? <LoadingProcess loadingName={"Memproses data stok keluar"}/> : (
                <form onSubmit={handleSaveCustomer}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ComboBox 
                            options={productOptions} 
                            labelTitle={"Produk"} 
                            isRequired={true}
                            key={"8"} 
                            defaultValue={getOptionById(productOptions, stockOutForm.productId ?? "")}
                            onChange={(value) => handleOnChangeComboBox("productId", value)}
                            isDisabled={id ? true : false}                         
                        />
                        <InputText labelTitle="Total Item" updateType={"totalItem"} isRequired={true} type="number" defaultValue={stockOutDetail?.data?.totalItem} updateFormValue={updateFormValue}/>
                        <DatePickerCustom
                            value={new Date(stockOutForm.date)}
                            show={showDate}
                            setShow={handleCloseDate}
                            onChange={handleChangeDate}
                            label="Tanggal"
                            isRequired={true}
                        />
                        <TextAreaInput  labelTitle="Catatan" updateType={"note"} isRequired={true} defaultValue={stockOutDetail?.data?.note ?? ""} updateFormValue={updateFormValue}/>
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
