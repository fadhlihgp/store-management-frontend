import {ComboBox, IOption} from "../../../components/Input/ComboBox.tsx";
import React, {SetStateAction, useEffect, useState} from "react";
import InputText2 from "../../../components/Input/InputText2.tsx";
import { useGetProductsQuery } from "../../../apps/services/productApi.ts";
import { IDebtDetailRequest, IProductListResponse } from "../../../utils/interfaces.ts";
import { formatDateString } from "../../../utils/formDateString.ts";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";
import TextAreaInput2 from "../../../components/Input/TextAreaInput2.tsx";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad.tsx";
import SelectBox2 from "../../../components/Input/SelectBox2.tsx";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";
import { convertCurrency } from "../../../utils/convertCurrency.ts";
import moment from "moment";

interface FormComponentDebt {
    // debtForm: IDebtRequest,
    // setDebtForm: React.Dispatch<React.SetStateAction<IDebtRequest>>,
    debtDetailForm: IDebtDetailRequest,
    setDebtDetailForm: React.Dispatch<React.SetStateAction<IDebtDetailRequest>>,
    indexDebtDetail?: number | string,
    setIndexDebtDetail?: React.Dispatch<SetStateAction<number>>,
    idDebtDetail?: string,
    setIdDebtDetail?: React.Dispatch<SetStateAction<string>>,
    handleSubmit: () => void
}

interface ErrorValidation{
    productError?: string,
    unitError?: string,
    amountError?: string 
}

export const FormComponentDebt = ({debtDetailForm, setDebtDetailForm, handleSubmit, indexDebtDetail = -1, setIndexDebtDetail, idDebtDetail = "-1", setIdDebtDetail}: FormComponentDebt) => {
    // const [indexDebtDetail, setIndexDebtDetail] = useState<number>(-1);
    const {data: products, isSuccess: isSuccessProduct, isLoading, isError} = useGetProductsQuery();
    // const [debtDetailForm, setDebtDetailForm] = useState<IDebtDetailRequest>({
    //     count: 0,
    //     date: new Date(),
    //     note: "",
    //     price: 0,
    //     productId: "",
    //     unitProductId: ""
    // });

    const [dataProducts, setDataProducts] = useState<IProductListResponse[]>([]);
    const [productOptions, setProductOptions] = useState<IOption[]>([]);
    const [defaultValueProduct, setDefaultValueProduct] = useState<IOption | null>(null);
    const [units, setUnits] = useState<IOption[]>([]);
    const [error, setError] = useState<ErrorValidation>();
    // const [customerIsPaid, setCustomerIsPaid] = useState<boolean>(false);

    const titleName = idDebtDetail === "-1" ? "Tambah" : (!debtDetailForm.isPaid ? "Perbarui Data" : "Hutang Detail");

    useEffect(() => {
        if (isSuccessProduct) {
            const options = products?.data.map(p => ({
                id: p.id,
                name: p.name
            }))
            setProductOptions(options);
            setDataProducts(products.data);
        }
    }, [dataProducts, isSuccessProduct]);

    useEffect(() => {
        if (indexDebtDetail != -1) {
            const debtDetail = debtDetailForm;
                if (debtDetail) {
                    const defaultProduct = productOptions.find(p => p.id === debtDetail.productId);
                    if (defaultProduct) {
                        setDefaultValueProduct(defaultProduct);
                        handleOnChangeSelect(defaultProduct);
                    }
                    setDebtDetailForm(debtDetail);
                }
        }
    }, [indexDebtDetail, setIndexDebtDetail]);

    useEffect(() => {
        if (idDebtDetail !== "-1") {
            const debtDetail = debtDetailForm;
                if (debtDetail) {
                    const defaultProduct = productOptions.find(p => p.id === debtDetail.productId);
                    if (defaultProduct) {
                        setDefaultValueProduct(defaultProduct);
                        handleOnChangeSelect(defaultProduct);
                    }
                    setDebtDetailForm(debtDetail);
                }
        }
    }, [idDebtDetail, setIdDebtDetail]);
    
    const reset = () => {
        setDebtDetailForm({
            count: 0,
            date: new Date(),
            note: "",
            price: 0,
            productId: "",
            unitProductId: "",
            isPaid: false
        });
        setUnits([]);
        // setIndexDebtDetail(-1);
        setDefaultValueProduct(null);
        setError(undefined);
    };

    const isValidateInput = () => {
        let isValid = true;

        const error:ErrorValidation = {
            amountError: undefined,
            productError: undefined,
            unitError: undefined
        }

        if (debtDetailForm.productId.length < 1) {
            error.productError = "Mohon untuk memilih produk terlebih dahulu";
            isValid = false;
        }
        if (debtDetailForm.unitProductId.length < 1) {
            error.unitError = "Mohon untuk memilih satuan terlebih dahulu";
            isValid = false;
        }
        if (debtDetailForm.count === 0) {
            error.amountError = "Mohon untuk mengisi jumlah";
            isValid = false;
        }
        setError(error);
        return isValid;
    }

    const submitForm = () => {
        // console.log(debtDetailForm)
        if (!isValidateInput()) {
            return;
        }
        handleSubmit();
        reset();
        showOrCloseModal("form-debt", "close");
    }

    const onClickCancel = () => {
        reset();
        showOrCloseModal("form-debt", "close");
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        if (name === "date") {
            setDebtDetailForm({...debtDetailForm, 
                date: new Date(value + 'T00:00:00')
            });
            return;
        }
        setDebtDetailForm({...debtDetailForm, [name]: value})
    }

    const handleOnChangeSelect = (value: IOption | null) => {
        // Find the selected product details
        const debtDetails = dataProducts?.find(p => p.id === value?.id.toString());
        
        if (debtDetails) {
            // Map product prices to unit options
            const unitOptions = debtDetails.productPrices.map(pp => ({
                id: pp.unitPriceId,
                name: pp.unitPrice
            }));
            
            // Update unit options and reset the unitProductId
            setUnits(unitOptions);
            // If unitProductId exists, find the corresponding product price
            if (debtDetailForm.unitProductId && debtDetailForm.unitProductId.length > 0) {
                let productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId === debtDetailForm.unitProductId);
                if (!productPrice) {
                    productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId !== "1");
                }
                // Update the form with the found price
                setDebtDetailForm(prevForm => ({
                    ...prevForm,
                    price: productPrice?.price ?? 0,
                    unitProductName: productPrice?.unitPrice ?? ""
                }));
                // console.log("Harga " + productPrice?.price);
            } else {
                let productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId !== "1");
                if (!productPrice) {
                    productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId !== "1");
                }
                // Update the form with the found price
                setDebtDetailForm(prevForm => ({
                    ...prevForm,
                    price: productPrice?.price ?? 0,
                    unitProductId: productPrice?.unitPriceId ?? "",
                }));
            }
            
            // Update the form with the productId and reset the unitProductId
            setDebtDetailForm(prevForm => ({
                ...prevForm,
                productId: value?.id.toString() ?? "",
                // unitProductId: "1"
            }));
            setDefaultValueProduct(value);
            setError(undefined);
        }
        
        // console.log(debtDetailForm);
    }

    const handleOnChangeSelectUnit = (e: any) => {
        const { value } = e.target;

        setDebtDetailForm({...debtDetailForm, unitProductId: value});
        const debtDetails = dataProducts?.find(p => p.id === debtDetailForm.productId);
        if (debtDetails) {
            const productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId === value);
            setDebtDetailForm({...debtDetailForm, unitProductId: value, price: productPrice?.price ?? 0});
        }
        // console.log(debtDetails);
        // console.log(debtDetailForm);
    }

    const ReadOnlyContent = <>
        <div className="modal-box">
                    <h3 className="font-bold text-3xl text-center mb-3">{titleName}</h3>
                    <div className={'grid grid-cols-1 mb-4 gap-1'}>
                        <div>Produk</div>
                        <div className="font-semibold text-xl">{defaultValueProduct?.name}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div>Jumlah</div>
                            <div className="font-semibold text-xl">{debtDetailForm.count}</div>
                        </div>
                        <div className="flex flex-col">
                            <div>Satuan</div>
                            <div className="font-semibold text-xl">{units.find(u => u.id === debtDetailForm.unitProductId)?.name}</div>
                        </div>
                        <div>
                            <div>Harga</div>
                            <div className="font-semibold text-xl">{convertCurrency("Rp", debtDetailForm.price)}</div>
                        </div>
                        <div>
                            <div>Tanggal Pengambilan Barang</div>
                            <div className="font-semibold text-xl">{moment(debtDetailForm.date).format("DD MMMM yyyy")}</div>
                        </div>
                        <div>
                            <div>Total</div>
                            <div className="font-semibold text-xl">{convertCurrency("Rp", debtDetailForm.count * debtDetailForm.price)}</div>
                        </div>
                        <div>
                            <div>Tanggal Dibayar</div>
                            <div className="font-semibold text-xl">{debtDetailForm.payDate ? moment(debtDetailForm.payDate).format("DD MMMM yyyy") : "-" }</div>
                        </div>
                    </div>
                    <div className={'grid grid-cols-1 gap-4 mt-4'}>
                        <div>
                            <div>Catatan</div>
                            <div className="font-semibold text-md">{debtDetailForm.note}</div>
                        </div>
                        {/* <TextAreaInput labelTitle={"Catatan"} defaultValue={debtDetailForm.note} updateFormValue={({value}: any) => updateFormValue("note", value)} /> */}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className={'flex gap-2 justify-end'}>
                                
                                <button className="btn" onClick={onClickCancel}>Tutup</button>
                            </div>
                        </form>
                    </div>
                </div>
    </>

    const MainContent = isError ? <FailedLoad /> : debtDetailForm.isPaid ? ReadOnlyContent : (
        <>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{titleName}</h3>
                    <div className={'grid grid-cols-1 mb-4'}>
                        <ComboBox
                            defaultValue={defaultValueProduct}
                            options={productOptions} 
                            labelTitle={"Produk"}
                            onChange={handleOnChangeSelect} />
                        {error?.productError && (
                            <span className="text-sm text-red-500">{error.productError}</span>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputText2 labelTitle="Jumlah" type={"number"} value={debtDetailForm.count} name={"count"} handleOnChange={handleOnChange}/>
                            {error?.amountError && (
                                <span className="text-sm text-red-500">{error.amountError}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <SelectBox2 
                                labelTitle="Satuan" 
                                placeholder={"Pilih Satuan"} 
                                options={units} 
                                name="unitProductId"
                                value={debtDetailForm.unitProductId} 
                                handleOnChange={handleOnChangeSelectUnit}
                            />
                            {error?.unitError && (
                            <span className="text-sm text-red-500">{error.unitError}</span>
                        )}
                        </div>
                        <InputText2 name={"price"} labelTitle="Harga" type={"number"} value={debtDetailForm.price} handleOnChange={handleOnChange}/>
                        <InputText2 
                            name={"date"} 
                            labelTitle={"Tanggal"} 
                            type={"date"} 
                            value={formatDateString(debtDetailForm.date)} 
                            handleOnChange={handleOnChange} 
                        />

                    </div>
                    <div className={'grid grid-cols-1 gap-4'}>
                        <div className={`form-control w-ful`}>
                            <label className="label" >
                                <span className={"label-text text-base-content "}>Total Harga</span>
                            </label>
                            <input type={"number"} value={debtDetailForm.count * debtDetailForm.price} className="input input-bordered w-full " disabled />
                        </div>
                        <TextAreaInput2 
                            labelTitle="Catatan" 
                            name="note" 
                            value={debtDetailForm.note}
                            handleOnChange={(e) => setDebtDetailForm({...debtDetailForm, note: e.target.value})}
                         />
                        {/* <TextAreaInput labelTitle={"Catatan"} defaultValue={debtDetailForm.note} updateFormValue={({value}: any) => updateFormValue("note", value)} /> */}
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
            </>
    );

    return(
        <dialog id={"form-debt"} className="modal modal-bottom sm:modal-middle">
            {isLoading ? <LoadingProcess loadingName="Mengambil data" key={"1"} /> : MainContent}
        </dialog>

    )
}