import Layout from "../../widgets/Layout.tsx";
import {useParams} from "react-router-dom";
import {ProductFormContainer} from "../../features/Product/ProductForm";

export const ProductForm = () => {
    const {id} = useParams();
    return(
        <Layout pageTitle={id ? "Edit Produk" : "Tambah Produk"}>
            <ProductFormContainer />
        </Layout>
    )
}