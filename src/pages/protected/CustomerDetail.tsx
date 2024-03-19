import Layout from "../../widgets/Layout.tsx";
import {CustomerDetailContainer} from "../../features/Customer/CustomerDetailContainer.tsx";

export const CustomerDetail = () => {
    return(
        <Layout pageTitle={"Data Pelanggan"}>
            <CustomerDetailContainer />
        </Layout>
    )
}