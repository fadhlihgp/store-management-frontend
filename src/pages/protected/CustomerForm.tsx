import Layout from "../../widgets/Layout.tsx";
import {CustomerFormContainer} from "../../features/Customer/CustomerFormContainer.tsx";

export const CustomerForm = () => {
    return(
        <Layout pageTitle={"Data Pelanggan"}>
            <CustomerFormContainer />
        </Layout>
    )
}