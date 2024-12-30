import  {useEffect, useState} from "react";
import {PageHeading} from "../../../components/Cards/PageHeading.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {DetailProduct} from "../components/DetailProduct.tsx";
import {ListPrice} from "../components/ListPrice.tsx";
import { useGetProductByIdQuery } from "../../../apps/services/productApi.ts";
import { IProductDetailResponse } from "../../../utils/interfaces.ts";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad.tsx";

export const ProductDetailContainer = () => {
    const {id} = useParams();
    const { data: product, isLoading, isError, isSuccess } = useGetProductByIdQuery(id ?? "");
    const [productDetail, setProductDetail] = useState<IProductDetailResponse | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            setProductDetail(product.data)
        }
    }, [isSuccess, product]);

    return(
        <div className={'bg-base-100 p-5 shadow-xl rounded-xl'}>
            {isLoading ? <LoadingProcess loadingName="Mengambil data detail produk" /> : isError ? <FailedLoad /> : <>
                <PageHeading
                    titlePage={productDetail?.name ?? "-"}
                    editOnClick={() => navigate("/product/edit/" + id) }
                    editedBy={productDetail?.editedBy}
                    createdBy={productDetail?.createdBy}
                    editedAt={productDetail?.editedAt}
                    createdAt={productDetail?.createdAt}
                    showManipulation={true}
                    breadcrumbsData={[
                        {
                            name: "Produk",
                            url: "/product"
                        },
                        {
                            name: productDetail?.name ?? "-",
                            url: ""
                        }
                    ]}
                />

                <DetailProduct
                    stock={productDetail?.stock ?? 0}
                    category={productDetail?.category ?? ""}
                    imageUrl={productDetail?.imageUrl}
                    barcode={productDetail?.barcode}
                    description={productDetail?.description} />

                <ListPrice  productForm={productDetail} />
            </> }
        </div>
    )
}