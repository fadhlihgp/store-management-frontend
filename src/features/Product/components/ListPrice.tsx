import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import { IParameterizeResponse, IProductPriceRequest, IProductRequest } from "../../../utils/interfaces.ts";
import React, { useEffect, useState } from "react";
import InputText2 from "../../../components/Input/InputText2.tsx";
import SelectBox2 from "../../../components/Input/SelectBox2.tsx";
import { ConfirmationModal } from "../../../components/Modals/ConfirmationModal.tsx";
import { useGetParameterizeQuery } from "../../../apps/services/otherApi.ts";

interface ListPriceProps {
    productForm?: IProductRequest,
    setProductForm?: React.Dispatch<React.SetStateAction<IProductRequest>>,
    showEdited?: boolean,
    // handleAddOrEdit?:() => void,
    handleDelete?: () => void
}

interface ErrorInputValidation {
    errorCount?: string,
    errorPrice?: string,
    errorUnitPriceId?: string
}

export const ListPrice = ({productForm, setProductForm, showEdited = false}: ListPriceProps) => {
    const [productPriceId, setProductPriceId] = useState<number>(-1);
    const [productPriceForm, setProductPriceForm] = useState<IProductPriceRequest>({
        price: 0,
        qtyPcs: 0,
        unitPriceId: "",
        unitPrice: ""
    });
    const {data: categories, isSuccess} = useGetParameterizeQuery("product-unit");
    const [errorProductPrice, setErrorProductPrice] = useState<string | null>(null);
    const [errorInput, setErrorInput] = useState<ErrorInputValidation>();
    const [satuanList, setSatuanList] = useState<IParameterizeResponse[]>([]);

    useEffect(() => {
        if (isSuccess) {
            setSatuanList(categories.data);
        }
    }, [categories, isSuccess]);

    const handleShowEdit = (id: number) => {
        setProductPriceId(id);
        const productFormDet = productForm?.productPrices[id];

        if (productFormDet) {
            setProductPriceForm(productFormDet) 
        }

        showOrCloseModal("show")
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setProductPriceForm({...productPriceForm, [name]: value});
        setErrorInput(undefined);
    }

    const handleOnChangeSelectBox = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        const findUnit = satuanList.find(p => p.id === value)?.name ?? "";
        setProductPriceForm({...productPriceForm, unitPriceId: value, unitPrice: findUnit});
        setErrorInput(undefined);
    }

    // Reset state
    const resetProductPriceForm = () => {
        setProductPriceForm({
            price: 0,
            qtyPcs: 0,
            unitPriceId: "",
            unitPrice: ""
        });
        setErrorProductPrice(null);
        setErrorInput(undefined);
    }

    const validationInputForm = (): boolean => {
        let isValid = true;
        if (productPriceForm.price < 1) {
            setErrorInput({...errorInput, errorPrice: "Harga tidak boleh 0"});
            isValid = false;
        }
        if (productPriceForm.qtyPcs < 1) {
            setErrorInput({...errorInput, errorCount: "Jumlah tidak boleh 0"});
            isValid = false;
        }
        if (productPriceForm.unitPriceId === "") {
            setErrorInput({...errorInput, errorUnitPriceId: "Satuan tidak boleh kosong"});
            isValid = false;
        }

        return isValid;
    }

    // Function for adding or editing product price
    const addOrEditProductPrice = () => {
        
        if (!validationInputForm()) {
            return;
        }

        if (productPriceId === -1 && setProductForm && productForm) {

            const findByUnitId = productForm.productPrices.find(
                pp => pp.unitPriceId === productPriceForm.unitPriceId
            );

            if (findByUnitId) {
                setErrorProductPrice("Tidak boleh memiliki 2 harga di tipe satuan yang sama!");
                return;
            }

            setProductForm(prevForm => ({
                ...prevForm,
                productPrices: [...prevForm.productPrices, productPriceForm]
            }));

            // Reset productPriceForm
            setProductPriceForm({ price: 0, unitPriceId: '', qtyPcs: 0, unitPrice: ""});
            
        } else {

            const findProductPriceByIndex = productForm?.productPrices.findIndex(
                pp => pp.unitPriceId === productPriceForm.unitPriceId
            );

            if (findProductPriceByIndex !== -1 && findProductPriceByIndex !== productPriceId) {
                setErrorProductPrice("Tidak boleh memiliki 2 harga di tipe satuan yang sama!")
                return;
            }

            if (setProductForm && productForm) {
                setProductForm(prevForm => {
                    const newProductPrices = [...prevForm.productPrices];
                    newProductPrices[productPriceId] = productPriceForm;
                    return {
                        ...prevForm,
                        productPrices: newProductPrices
                    };
                })
            }
        }
        setProductPriceId(-1);
        resetProductPriceForm();
        // Close the modal
        showOrCloseModal("close");
    };

    // Function for showing delete modal
    const showDeleteConfirmation = (index: number) => {
        setProductPriceId(index);
        const modal = document.getElementById("modal-delete");
        if (modal) {
            (modal as HTMLDialogElement).showModal();
        }
    }

    // Function for deleting product price
    const handleDelete = () => {
        if (setProductForm) {
            setProductForm(prevForm => {
                const newProductPrices = [...prevForm.productPrices];
                newProductPrices.splice(productPriceId, 1);
                return {
                    ...prevForm,
                    productPrices: newProductPrices
                };
            });
        }
        setProductPriceId(-1);
        const modal = document.getElementById("modal-delete");
        if (modal) {
            (modal as HTMLDialogElement).close();
        }
    }

    const showOrCloseModal = (type: string ) => {
        const modal = document.getElementById("modal-product-price");
            if (modal) {
                if (type === "show") {
                    (modal as HTMLDialogElement).showModal();
                } else if (type === "close") {
                    (modal as HTMLDialogElement).close();
                }
            }
    }

    const onClickCancel = () => {
        setProductPriceId(-1);
        // Reset productPriceForm
        setProductPriceForm({ price: 0, unitPriceId: '', qtyPcs: 0, unitPrice: ""});
        // resetProductPriceForm();
        const modal = document.getElementById("modal-product-price");
        if (modal) {
            (modal as HTMLDialogElement).close();
        }
    }

    const handleAddOrEdit = () => {
        // resetProductPriceForm();
        showOrCloseModal("show");
    }

    return(
        <>
        <ConfirmationModal 
            id="modal-delete" 
            title="Konfirmasi hapus"
            message="Anda yakin ingin menghapus harga produk ?" 
            key={"1"}
            onClickYes={handleDelete} 
        />

        <dialog id="modal-product-price" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{productPriceId === -1 ? "Tambah harga produk" : "Edit harga produk"}</h3>
                {errorProductPrice && (
                    <p className="text-md text-red-600">{errorProductPrice}</p>
                )}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <InputText2 labelTitle="Harga" type={"number"} name="price" value={productPriceForm.price} handleOnChange={handleOnChange}/>
                        {errorInput && errorInput.errorPrice && (
                            <p className="text-md text-red-600">{errorInput.errorPrice}</p>
                        )}
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="w-1/2">
                            <InputText2 labelTitle="Jumlah per pcs" type={"number"} name="qtyPcs" value={productPriceForm.qtyPcs} handleOnChange={handleOnChange}/>
                            {errorInput && errorInput.errorCount && (
                                <p className="text-md text-red-600">{errorInput.errorCount}</p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <SelectBox2 containerStyle="w-full" labelTitle="Satuan" placeholder={"Pilih Satuan"} options={satuanList} handleOnChange={handleOnChangeSelectBox} name="unitPriceId" value={productPriceForm.unitPriceId}/>
                            {errorInput && errorInput.errorUnitPriceId && (
                                <p className="text-md text-red-600">{errorInput.errorUnitPriceId}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="modal-action">
                    <>
                        {/* if there is a button in form, it will close the modal */}
                        <div className={'flex gap-2 justify-end'}>
                            <button className={'btn btn-success text-white'} onClick={addOrEditProductPrice} type={"button"}>Simpan</button>
                            <button className="btn" onClick={onClickCancel}>Batal</button>
                        </div>
                    </>
                </div>
            </div>
        </dialog>

        <TitleCard
            title="List Harga Produk"
            topMargin="mt-2"
            topSideButtons={(showEdited) && (
                <TopSideButtons onClick={handleAddOrEdit} showInput={false}  />
            )}
        >

            {/* Leads List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr className={'text-center'}>
                        <th>No</th>
                        <th>Harga</th>
                        <th>Satuan</th>
                        <th>Jumlah Per Pcs</th>
                        {/* <th>Tipe</th> */}
                        {showEdited && (
                            <th>Aksi</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        productForm?.productPrices.map((u, k) => {
                            return(
                                <tr key={k} className={'text-center'}>
                                    <td>{k + 1}</td>
                                    <td>
                                        {convertCurrency("Rp", u.price)}
                                    </td>
                                    <td>{u.unitPrice}</td>
                                    <td>{u.qtyPcs}</td>
                                    {/* <td>{u.type}</td> */}
                                    {showEdited && (
                                        <td className={'flex items-center justify-center'}>
                                            <button className="btn btn-square btn-ghost" onClick={() => handleShowEdit(k)}><PencilSquareIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={() => showDeleteConfirmation(k)}><TrashIcon className="w-5"/></button>
                                        </td>
                                    )}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </TitleCard>    
        </>
        
    )
}