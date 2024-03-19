import  {useEffect, useState} from "react";
import {PageHeading} from "../../../components/Cards/PageHeading.tsx";
import {IProduct} from "../../../utils/TableDataType.ts";
import {ProductsDummy} from "../ProductDummy.ts";
import {useNavigate, useParams} from "react-router-dom";
import {DetailProduct} from "../components/DetailProduct.tsx";
import {ListPrice} from "../components/ListPrice.tsx";

export const ProductDetailContainer = () => {
    const [productDetail, setProductDetail] = useState<IProduct | undefined>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const detail = ProductsDummy.find(p => p.id === id);
        setProductDetail(detail);
    }, [id]);

    return(
        <div className={'bg-base-100 p-5 shadow-xl rounded-xl'}>
            <PageHeading
                titlePage={productDetail?.name ?? "-"}
                editOnClick={() => navigate("/product/edit/" + id) }
                editedBy={productDetail?.editedBy}
                createdBy={productDetail?.createdBy}
                editedAt={productDetail?.editedAt}
                createdAt={productDetail?.createdAt}
                showManipulation={true}
            />

            <DetailProduct
                stock={productDetail?.stock ?? 0}
                imageUrl={productDetail?.imageUrl}
                barcode={productDetail?.barcode}
                description={productDetail?.description} />

            <ListPrice productPrices={productDetail?.productPrices} />

        </div>
    )
}