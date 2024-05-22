import InputText from "../../../components/Input/InputText.tsx";
import TextAreaInput from "../../../components/Input/TextAreaInput.tsx";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {ListPrice} from "../components/ListPrice.tsx";
import React, {useEffect, useState} from "react";
import { useAddProductMutation, useEditProductMutation, useGetProductByIdQuery } from "../../../apps/services/productApi.ts";
import { IProductRequest } from "../../../utils/interfaces.ts";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad.tsx";
import { useUploadImageMutation } from "../../../apps/services/imageApi.ts";

const breadcrumbsData = [
    {
        name: "Data Produk",
        url: "/product"
    },
    {
        name: "Form",
        url: "/"
    }
]

interface ErrorInputValidation {
    errorProductPrice?: string,
    errorName?: string,
    errorDescription?: string  
}

export const ProductFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const { data: productOne, isError: isErrorGetData, isLoading: isLoadingGetData, isSuccess: isSuccessGetData } = useGetProductByIdQuery(id ?? "");
    const [uploadImage, {isLoading: isLoadingUploadImage}] = useUploadImageMutation();
    const [addProduct, {isLoading: isLoadingAddProduct}] = useAddProductMutation();
    const [editProduct, {isLoading: isLoadingEditProduct}] = useEditProductMutation();
    const [productForm, setProductForm] = useState<IProductRequest>({
        name: "",
        description: "",
        productPrices: [],
        stock: 0
    });
    const [fileImage, setFileImage] = useState<File>();
    // const [errorProductPrice, setErrorProductPrice] = useState<string | null>(null);
    const [errorInput, setErrorInput] = useState<ErrorInputValidation>()

    useEffect(() => {
        if (isSuccessGetData && id) {
            setProductForm(productOne.data);
        }
    },[productOne])

    const handleAddProduct = () => {
        const formData = new FormData();

        if (fileImage) {
            console.log("Masuk File Image");
            formData.append("image", fileImage);
            uploadImage(formData).unwrap()
                .then((res) => {
                    const updatedProductForm = { ...productForm, imageId: res.data.id };
                    setProductForm(updatedProductForm);
                    addProduct(updatedProductForm).unwrap()
                        .then((res) => {
                            toast.success(res.message ?? "Berhasil menambah produk");
                            window.scrollTo(0,0);
                            navigate("/product")
                        })
                        .catch((res) => {
                            console.log(res)
                            toast.error(res.message ?? "Terjadi kesalahan saat menambah produk");
                            return;
                        })
                })
                .catch((res) => {
                    console.log(res)
                    toast.error(res.message ?? "Terjadi kesalahan saat menngunggah gambar");
                    return;
                })
        } else {
            console.log("Tidak Masuk File Image");
            addProduct(productForm).unwrap()
                .then((res) => {
                    toast.success(res.message ?? "Berhasil menambah produk");
                    window.scrollTo(0,0);
                    navigate("/product")
                })
                .catch((res) => {
                    console.log(res)
                    toast.error(res.message ?? "Terjadi kesalahan saat menambah produk");
                    return;
                })
        }
    }

    const handleEditProduct = () => {
        const formData = new FormData();

        if (id) {
            if (fileImage) {
                // console.log("Masuk File Image");
                formData.append("image", fileImage);
                uploadImage(formData).unwrap()
                    .then((res) => {
                        const updatedProductForm = { ...productForm, imageId: res.data.id };
                        setProductForm(updatedProductForm);
    
                        const editProductData = {
                            id: id,
                            data: updatedProductForm
                        }
    
                        editProduct(editProductData).unwrap()
                            .then((res) => {
                                toast.success(res.message ?? "Berhasil memperbarui produk");
                                window.scrollTo(0,0);
                                navigate("/product")
                            })
                            .catch((res) => {
                                console.log(res)
                                toast.error(res.message ?? "Terjadi kesalahan saat memperbarui produk");
                                return;
                            })
                    })
                    .catch((res) => {
                        console.log(res)
                        toast.error(res.message ?? "Terjadi kesalahan saat menngunggah gambar");
                        return;
                    })
            } else {
                // console.log("Tidak Masuk File Image");
                const editProductData = {
                    id: id,
                    data: productForm
                }

                editProduct(editProductData).unwrap()
                    .then((res) => {
                        toast.success(res.message ?? "Berhasil memperbarui produk");
                        window.scrollTo(0,0);
                        navigate("/product")
                    })
                    .catch((res) => {
                        console.log(res)
                        toast.error(res.message ?? "Terjadi kesalahan saat memperbarui produk");
                        return;
                    })
            }
        }
    }

    const validationInput = (): boolean => {
        let isValid = true;
        const newErrorInput = {...errorInput};
    
        console.log("validation");
    
        if (!productForm.productPrices || productForm.productPrices.length < 1) {
            console.log("error price");
            newErrorInput.errorProductPrice = "Produk setidaknya harus memiliki satu harga";
            isValid = false;
        }
        if (!productForm.name || productForm.name.length < 1) { // Mengubah dari < 0 ke < 1
            newErrorInput.errorName = "Nama produk tidak boleh kosong";
            isValid = false;
        }
        if (!productForm.description || productForm.description.length < 1) { // Mengubah dari < 0 ke < 1
            newErrorInput.errorDescription = "Deskripsi produk tidak boleh kosong";
            isValid = false;
        }
    
        setErrorInput(newErrorInput);
        return isValid;
    }

    const handleSaveStore = (event: any) => {
        event.preventDefault();

        const isValid = validationInput();

        if (!isValid) {
            console.log("Validation failed");
            return;
        }

        if (!id) {
            handleAddProduct();
        } else {
            handleEditProduct();
        }
        setErrorInput(undefined);
        console.log(productForm)
    }

    const handleOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFileImage(event.target.files[0]);
            console.log("ada file")
        }
    }

    const updateFormValue = ({updateType, value}: any) => {
        setProductForm({...productForm, [updateType]: value})
        setErrorInput(undefined);
    }
    return(
        <TitleCard title={id ? "Edit Produk" : "Tambah Produk"} topMargin="mt-2" breadcrumbsData={breadcrumbsData}>

            {isLoadingGetData ? <LoadingProcess loadingName="Mengambil data produk" key={"1"} /> : isErrorGetData ? <FailedLoad /> : (
                <>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <InputText labelTitle={"nama" } isRequired={true} defaultValue={productOne?.data.name} updateFormValue={updateFormValue} updateType={"name"}/>
                            {errorInput?.errorName && (
                                <p className="text-red-500 text-lg mt-3">{errorInput.errorName}</p>
                            )}
                        </div>
                        <div>
                            <InputText labelTitle="Stok" isRequired={true} type={"number"} defaultValue={productOne?.data.stock} updateFormValue={updateFormValue} updateType={"stock"} />
                        </div>
                        <div>
                            <InputText labelTitle="Barcode" defaultValue={productOne?.data.barcode} updateFormValue={updateFormValue} updateType={"barcode"}/>
                        </div>
                        <div>
                            <TextAreaInput  labelTitle="Deskripsi" isRequired={true} defaultValue={productOne?.data.description ?? ""} updateFormValue={updateFormValue} updateType={"description"}/>
                            {errorInput?.errorDescription && (
                                <p className="text-red-500 text-lg mt-3">{errorInput.errorDescription}</p>
                            )}
                        </div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Pilih Photo Produk</span>
                            </div>
                            <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={handleOnChangeFile} />
                        </label>
                    </div>
                    {errorInput?.errorProductPrice && (
                        <p className="text-red-500 text-lg mt-3">{errorInput.errorProductPrice}</p>
                    )}
                    <ListPrice
                        // handleAddOrEdit={handleAddProductPrice}
                        showEdited={true}
                        setProductForm={setProductForm}
                        productForm={productForm}/>

                    <div className={'flex gap-2 justify-end'}>
                        <div className="mt-16"><button className="btn float-right" onClick={() => navigate(-1)}>Batal</button></div>
                        <div className="mt-16">
                            <button className="btn btn-primary float-right" onClick={handleSaveStore} disabled={isLoadingAddProduct || isLoadingUploadImage}>
                                {isLoadingAddProduct || isLoadingUploadImage || isLoadingEditProduct ? <>
                                    <span className="loading loading-spinner"></span>
                                    Menyimpan data
                                </> : id ? "Update" : "Simpan" }
                            </button>
                        </div>
                    </div>
                </>
            )}
            
        </TitleCard>
    )
}