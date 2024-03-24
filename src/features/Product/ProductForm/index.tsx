import InputText from "../../../components/Input/InputText.tsx";
import TextAreaInput from "../../../components/Input/TextAreaInput.tsx";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {ListPrice} from "../components/ListPrice.tsx";
import {useEffect, useState} from "react";
import {IProduct} from "../../../utils/TableDataType.ts";
import {ProductsDummy} from "../ProductDummy.ts";
import {ProductFormPriceModal} from "../components/ProductFormPriceModal.tsx";

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
export const ProductFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState<IProduct | undefined>();
    const [productPriceIdd, setProductPriceIdd] = useState("-1");
    useEffect(() => {
        if (id) {
            const detail = ProductsDummy.find(p => p.id === id);
            setProductDetail(detail);
        }
    },[id])

    const handleSaveStore = () => {
        if (!id) {
            window.scrollTo(0,0);
            navigate("/product");
            toast.success("Berhasil menambah data produk");
        } else {
            window.scrollTo(0,0);
            navigate("/product");
            toast.success("Berhasil memperbarui data produk");
        }
    }

    const updateFormValue = ({updateType}: any) => {
        console.log(updateType)
    }

    const handleAddProductPrice = () => {
        document.getElementById("modal-product-price").showModal();
    }

    const handleSubmitProductPriceForm = () => {
        document.getElementById("modal-product-price").close();
        setProductPriceIdd("-1")
    }

    return(
        <TitleCard title={id ? "Edit Produk" : "Tambah Produk"} topMargin="mt-2" breadcrumbsData={breadcrumbsData}>
            <ProductFormPriceModal onClickCancel={() => {
                setProductPriceIdd("-1");
                document.getElementById("modal-product-price").close();
            }} onClickYes={handleSubmitProductPriceForm} productPriceId={productPriceIdd} />

            <div className="grid grid-cols-1 gap-4">
                <InputText labelTitle="Nama" defaultValue="" updateFormValue={updateFormValue}/>
                <InputText labelTitle="Stok" type={"number"} defaultValue="" updateFormValue={updateFormValue}/>
                <InputText labelTitle="Barcode" defaultValue={""} updateFormValue={updateFormValue}/>
                <TextAreaInput  labelTitle="Deskripsi" defaultValue="" updateFormValue={updateFormValue}/>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pilih Photo Produk</span>
                    </div>
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                </label>
            </div>

            <ListPrice
                handleAddOrEdit={handleAddProductPrice}
                showEdited={true}
                productPrices={productDetail?.productPrices} />

            <div className={'flex gap-2 justify-end'}>
                <div className="mt-16"><button className="btn float-right" onClick={() => navigate(-1)}>Batal</button></div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={handleSaveStore}>{id ? "Update" : "Simpan"}</button></div>
            </div>
        </TitleCard>
    )
}