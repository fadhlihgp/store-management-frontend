import Layout from "../../widgets/Layout.tsx";
import { ProductContainer} from "../../features/Product/ProductList";

export const ProductList = () => {
    return (
        <Layout pageTitle={"Data Produk"}>
            <ProductContainer />
        </Layout>
    )
}