import {useNavigate} from "react-router-dom";
import {useState} from "react";
import toast from "react-hot-toast";
import {ConfirmationModal} from "../../../components/Modals/ConfirmationModal.tsx";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {ProductsDummy} from "../ProductDummy.ts";
import {ProductCard} from "../components/ProductCard.tsx";
import SelectBox from "../../../components/Input/SelectBox.tsx";

interface TopSideSortProps {
    updateFormValue: (e:any) => void
}
const TopSideSort = ({updateFormValue}: TopSideSortProps) => {
    const navigate = useNavigate();
    const [arrange, setArrange] = useState<string>('none');

    const updateArrangeValue = (e: HTMLInputElement) => {
        const {value} = e;
        setArrange(value);
        updateFormValue(e);
    }

    const arranges = [
        {
            name: "None",
            value: "none"
        },
        {
            name: "Nama",
            value: "name"
        },
        {
            name: "Harga",
            value: "price"
        }
    ]

    const sorts = [
        {
            name: "Menaik",
            value: "asc"
        },
        {
            name: "Menurun",
            value: "desc"
        }
    ]

    return(
        <div className={'flex flex-row gap-2 items-end'}>
            <SelectBox defaultValue={arrange} selectStyle={'select-sm'} containerStyle={'sm'} labelStyle={'font-normal'} placeholder={''} labelTitle={"Sortir Berdasarkan"} options={arranges} updateFormValue={updateArrangeValue} />
            {arrange !== 'none' && (
                <SelectBox defaultValue={'asc'} selectStyle={'select-sm'} containerStyle={'sm'} labelStyle={'font-normal'} placeholder={''} labelTitle={"Urutan"} options={sorts} updateFormValue={updateFormValue} />
            )}
            <button className={'btn btn-primary btn-sm'} onClick={() => navigate("/product/add")}>Tambah</button>
        </div>
    )
}

export const ProductContainer = () => {
    const navigate = useNavigate();
    const [productId, setProductId] = useState<string>("-1");

    const handleAddOrEdit = (id:string = "-1") => {
        window.scrollTo(0, 0);
        if (id === "-1"){
            navigate("/product/add")
        } else {
            navigate("/product/edit/"+ id)
        }
    }

    const handleDelete = (id: string) => {
        setProductId(id);
        document.getElementById('modal-delete')?.showModal();
    }

    const deleteCurrentProduct = () => {
        console.log(productId);
        document.getElementById('modal-delete')?.close();
        toast.success("Berhasil mengahapus data")
    }

    const updateFormValue = ({updateType}: any) => {
        console.log(updateType)
    }

    return(
        <>
            <ConfirmationModal onClickYes={deleteCurrentProduct} message={'Anda yakin ingin menghapus data produk ?'}/>
            <TitleCard
                title="Produk"
                topMargin="mt-2"
                topSideButtons={<TopSideButtons onClick={() => handleAddOrEdit()} componentChildren={<TopSideSort updateFormValue={updateFormValue} />}/>}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-5'}>
                    {ProductsDummy.map((data, index) => (
                        <ProductCard
                            imageUrl={data.imageUrl}
                            name={data.name}
                            price={data.productPrices[0].price}
                            key={index}
                            onClickDetail={() => {
                                window.scrollTo(0, 0);
                                navigate("/product/detail/" + data.id)
                            }}
                            onClickDelete={() => handleDelete(data.id)} />
                    ))}
                </div>
            </TitleCard>
        </>
    )
}