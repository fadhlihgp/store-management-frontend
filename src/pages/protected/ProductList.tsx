import Layout from "../../widgets/Layout.tsx";
import { ProductContainer} from "../../features/Product/ProductList";

export const ProductList = () => {
    return (
        <Layout pageTitle={"Produk"}>
            <ProductContainer />
        </Layout>
    )
}