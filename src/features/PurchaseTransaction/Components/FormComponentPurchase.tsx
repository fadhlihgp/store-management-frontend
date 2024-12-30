import {ComboBox, IOption} from "../../../components/Input/ComboBox.tsx";
import React, {SetStateAction, useEffect, useState} from "react";
import InputText2 from "../../../components/Input/InputText2.tsx";
import { useGetProductsQuery } from "../../../apps/services/productApi.ts";
import { IProductListResponse, IProductPurchaseRequest } from "../../../utils/interfaces.ts";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad.tsx";
import SelectBox2 from "../../../components/Input/SelectBox2.tsx";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";

interface FormComponentPurchase {
    productForm: IProductPurchaseRequest,
    setProductForm: React.Dispatch<React.SetStateAction<IProductPurchaseRequest>>,
    indexPurchaseDetail?: number | string,
    setIndexPurchaseDetail?: React.Dispatch<SetStateAction<number>>,
    idDebtDetail?: string,
    setIdDebtDetail?: React.Dispatch<SetStateAction<string>>,
    handleSubmit: () => void
}

interface ErrorValidation{
    productError?: string,
    unitError?: string,
    amountError?: string
}

export const FormComponentPurchase = ({productForm, setProductForm, handleSubmit, indexPurchaseDetail = -1, setIndexPurchaseDetail, idDebtDetail = "-1", setIdDebtDetail}: FormComponentPurchase) => {
    const {data: products, isSuccess: isSuccessProduct, isLoading, isError} = useGetProductsQuery();

    const [dataProducts, setDataProducts] = useState<IProductListResponse[]>([]);
    const [productOptions, setProductOptions] = useState<IOption[]>([]);
    const [defaultValueProduct, setDefaultValueProduct] = useState<IOption | null>(null);
    const [units, setUnits] = useState<IOption[]>([]);
    const [error, setError] = useState<ErrorValidation>();
    // const [customerIsPaid, setCustomerIsPaid] = useState<boolean>(false);

    const titleName = idDebtDetail === "-1" ? "Tambah Produk" : "Perbarui Produk";

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
        if (indexPurchaseDetail != -1) {
            const debtDetail = productForm;
                if (debtDetail) {
                    const defaultProduct = productOptions.find(p => p.id === debtDetail.productId);
                    if (defaultProduct) {
                        setDefaultValueProduct(defaultProduct);
                        handleOnChangeSelect(defaultProduct);
                    }
                    setProductForm(debtDetail);
                }
        }
    }, [indexPurchaseDetail, setIndexPurchaseDetail]);

    useEffect(() => {
        if (idDebtDetail !== "-1") {
            const debtDetail = productForm;
                if (debtDetail) {
                    const defaultProduct = productOptions.find(p => p.id === debtDetail.productId);
                    if (defaultProduct) {
                        setDefaultValueProduct(defaultProduct);
                        handleOnChangeSelect(defaultProduct);
                    }
                    setProductForm(debtDetail);
                }
        }
    }, [idDebtDetail, setIdDebtDetail]);

    const reset = () => {
        setProductForm({
            qty: 0,
            price: 0,
            productId: "",
            unitPriceId: "",
        });
        setUnits([]);
        // setIndexPurchaseDetail(-1);
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

        if (productForm.productId.length < 1) {
            error.productError = "Mohon untuk memilih produk terlebih dahulu";
            isValid = false;
        }
        if (productForm.unitPriceId.length < 1) {
            error.unitError = "Mohon untuk memilih satuan terlebih dahulu";
            isValid = false;
        }
        if (productForm.qty === 0) {
            error.amountError = "Mohon untuk mengisi jumlah";
            isValid = false;
        }
        setError(error);
        return isValid;
    }

    const submitForm = () => {
        // console.log(productForm)
        if (!isValidateInput()) {
            return;
        }
        handleSubmit();
        reset();
        showOrCloseModal("form-purchase", "close");
    }

    const onClickCancel = () => {
        reset();
        showOrCloseModal("form-purchase", "close");
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setProductForm({...productForm, [name]: value})
    }

    const handleOnChangeSelect = (value: IOption | null) => {
        // Find the selected product details
        const debtDetails = dataProducts?.find(p => p.id === value?.id?.toString() ?? "");

        if (debtDetails) {
            // Map product prices to unit options
            const unitOptions = debtDetails.productPrices.map(pp => ({
                id: pp.unitPriceId,
                name: pp.unitPrice
            }));

            // Update unit options and reset the unitPriceId
            setUnits(unitOptions);

            // If unitPriceId exists, find the corresponding product price
            if (productForm.unitPriceId && productForm.unitPriceId.length > 0) {
                let productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId === productForm.unitPriceId);
                if (!productPrice) {
                    productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId !== "");
                }
                // Update the form with the found price
                setProductForm(prevForm => ({
                    ...prevForm,
                    price: productPrice?.price ?? 0
                }));
                // console.log("Harga " + productPrice?.price);
            } else {
                let productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId !== "1");
                if (!productPrice) {
                    productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId !== "1");
                }
                // Update the form with the found price
                setProductForm(prevForm => ({
                    ...prevForm,
                    price: productPrice?.price ?? 0,
                    unitPriceId: productPrice?.unitPriceId ?? ""
                }));
                // console.log("Harga " + productPrice?.price);
            }

            // Update the form with the productId and reset the unitPriceId
            setProductForm(prevForm => ({
                ...prevForm,
                productId: value?.id?.toString() ?? "",
                // unitPriceId: "1"
            }));
            setDefaultValueProduct(value);
            setError(undefined);
        }

        // console.log(productForm);
    }

    const handleOnChangeSelectUnit = (e: any) => {
        const { value } = e.target;
        // console.log("Ini value " + value);
        setProductForm({...productForm, unitPriceId: value});
        const debtDetails = dataProducts?.find(p => p.id === productForm.productId);
        if (debtDetails) {
            const productPrice = debtDetails.productPrices.find(pp => pp.unitPriceId === value);
            setProductForm({...productForm, unitPriceId: value, price: productPrice?.price ?? 0});
        }
        // console.log(debtDetails);
        // console.log(productForm);
    }

    const MainContent = isError ? <FailedLoad /> : (
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
                            <InputText2 labelTitle="Jumlah" type={"number"} value={productForm.qty} name={"qty"} handleOnChange={handleOnChange}/>
                            {error?.amountError && (
                                <span className="text-sm text-red-500">{error.amountError}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <SelectBox2
                                labelTitle="Satuan"
                                placeholder={"Pilih Satuan"}
                                options={units}
                                name="unitPriceId"
                                value={productForm.unitPriceId}
                                handleOnChange={handleOnChangeSelectUnit}
                            />
                            {error?.unitError && (
                            <span className="text-sm text-red-500">{error.unitError}</span>
                        )}
                        </div>
                        <InputText2 name={"price"} labelTitle="Harga" type={"number"} value={productForm.price} handleOnChange={handleOnChange}/>
                        <div>
                        <div className={`form-control w-ful`}>
                            <label className="label" >
                                <span className={"label-text text-base-content "}>Total Harga</span>
                            </label>
                            <input type={"number"} value={productForm.qty * productForm.price} className="input input-bordered w-full " disabled />
                        </div>
                        </div>
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
        <dialog id={"form-purchase"} className="modal modal-bottom sm:modal-middle">
            {isLoading ? <LoadingProcess loadingName="Mengambil data" key={"1"} /> : MainContent}
        </dialog>

    )
}
