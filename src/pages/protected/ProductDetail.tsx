import Layout from "../../widgets/Layout.tsx";
import {ProductDetailContainer} from "../../features/Product/ProductDetail";

export const ProductDetail = () => {
    return(
        <Layout pageTitle={"Detail Produk"}>
            <ProductDetailContainer key={"productDetail"} />
        </Layout>
    )
}