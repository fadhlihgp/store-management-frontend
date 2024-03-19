import Layout from "../../widgets/Layout.tsx";
import {CustomerContainer} from "../../features/Customer/CustomerContainer.tsx";

export const Customer = () => {
    return(
        <Layout pageTitle={"Data Pelanggan"}>
            <CustomerContainer />
        </Layout>
    )
}