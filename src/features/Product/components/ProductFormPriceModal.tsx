import InputText from "../../../components/Input/InputText.tsx";
import {useEffect, useState} from "react";
import {IProductPrice} from "../../../utils/TableDataType.ts";
import SelectBox from "../../../components/Input/SelectBox.tsx";
import {ProductsDummy} from "../ProductDummy.ts";
import {useParams} from "react-router-dom";

interface ProductFormPriceModalProps {
    onClickYes: () => void
    productPriceId: string
    onClickCancel: () => void
}

export const satuans = [
    {
        name: "Pcs",
        value: "1"
    },
    {
        name: "Renceng",
        value: "2"
    },
    {
        name: "Dus/Box",
        value: "3"
    },
]

const types = [
    {
        name: "Normal",
        value: "1"
    },
    {
        name: "Grosir",
        value: "2"
    }
]
export const ProductFormPriceModal = ({onClickYes, productPriceId, onClickCancel}: ProductFormPriceModalProps) => {
    const [productPriceForm, setProductPriceForm] = useState<IProductPrice>()
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            const detailProduct = ProductsDummy.find(p => p.id === id);
            if (detailProduct) {
                const productPrice = detailProduct.productPrices.find(p => p.id === productPriceId)
                setProductPriceForm(productPrice);
            }
        }
    }, [productPriceId])

    const updateFormValue = ({updateType}: any) => {
        console.log(updateType)
    }

    return(
        <dialog id="modal-product-price" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{productPriceId === "-1" ? "Tambah harga produk" : "Edit harga produk"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputText labelTitle="Harga" type={"number"} defaultValue={productPriceForm?.price ?? 0} updateFormValue={updateFormValue}/>
                    <SelectBox labelTitle="Satuan" placeholder={"Pilih Satuan"} options={satuans} defaultValue={productPriceForm?.unit} updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Jumlah per pcs" type={"number"} defaultValue={productPriceForm?.qtyPcs ?? 0} updateFormValue={updateFormValue}/>
                    <SelectBox labelTitle="Jenis" options={types} placeholder={"Pilih Jenis"} defaultValue={productPriceForm?.type} updateFormValue={updateFormValue}/>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <div className={'flex gap-2 justify-end'}>
                            <button className={'btn btn-error text-white'} onClick={onClickYes} type={"button"}>Simpan</button>
                            <button className="btn" onClick={onClickCancel}>Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}