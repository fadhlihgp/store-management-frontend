import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {ConfirmationModal} from "../../../components/Modals/ConfirmationModal.tsx";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {ProductCard} from "../components/ProductCard.tsx";
import SelectBox from "../../../components/Input/SelectBox.tsx";
import { useDeleteProductMutation, useGetProductsQuery } from "../../../apps/services/productApi.ts";
import { IProductListResponse } from "../../../utils/interfaces.ts";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad.tsx";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";

interface TopSideSortProps {
    updateFormValue: (e:any) => void
}

const TopSideSort = ({updateFormValue}: TopSideSortProps) => {
    const navigate = useNavigate();
    const [arrange, setArrange] = useState<string>('none');

    const updateArrangeValue = ({e}: any) => {
        // const {value} = e.target;
        setArrange(e);
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
    const [productList, setProductList] = useState<IProductListResponse[] | undefined>([]);
    const { data: products, isLoading, isError, isSuccess } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (isSuccess) {
            setProductList(products.data);
            console.log(products)
        }
    }, [products]);

    const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const filters = products?.data.filter(p => p.name.toLowerCase().includes(value.toLowerCase()));
        setProductList(filters);
    }

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
        showOrCloseModal('show');
    }

    const deleteCurrentProduct = () => {
        deleteProduct(productId).unwrap()
            .then((res) => {
                toast.success(res.message)
            })
            .catch((res) => {
                toast.error(res.message ?? "Gagal menghapus data produk")
            })
        showOrCloseModal('close');
    }

    const showOrCloseModal = (type: string ) => {
        const modal = document.getElementById("modal-delete");
            if (modal) {
                if (type === "show") {
                    (modal as HTMLDialogElement).showModal();
                } else if (type === "close") {
                    (modal as HTMLDialogElement).close();
                }
            }
    }

    const MainContent = isError ? (<FailedLoad />) : ( productList && productList?.length < 1 ? <p className="text-lg text-slate-700 text-center font-semibold">Data Tidak Ditemukan</p> : 
    <div className={'grid grid-cols-1 md:grid-cols-3 gap-5'}>
        {productList?.map((data, index) => (
            <ProductCard
                imageUrl={data.imageUrl}
                name={data.name}
                price={data.price}
                unit={data.unit}
                key={index}
                onClickDetail={() => {
                    window.scrollTo(0, 0);
                    navigate("/product/detail/" + data.id)
                }}
                onClickDelete={() => handleDelete(data.id)} />
        ))}
    </div> );

    return(
        <>
            <ConfirmationModal onClickYes={deleteCurrentProduct} message={'Anda yakin ingin menghapus data produk ?'}/>
            <TitleCard
                title="Produk"
                topMargin="mt-2"
                topSideButtons={<TopSideButtons onChangeInput={handleOnChangeSearch} onClick={() => handleAddOrEdit()}/>}
                >
                    {isLoading ? <LoadingProcess loadingName="Mengambil data produk" key={"1"} /> : MainContent}
                {/* Leads List in table format loaded from slice after api call */}
                
            </TitleCard>
        </>
    )
}