import Layout from "../../widgets/Layout.tsx";
import {StoreManagementContainer} from "../../features/StoreManagement/List/StoreManagementContainer.tsx";

export const StoreManagement = () => {
    return(
        <Layout pageTitle={"Store Management"}>
            <StoreManagementContainer />
        </Layout>
    )
}