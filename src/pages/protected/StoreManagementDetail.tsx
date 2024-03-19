import {StoreManagementDetailContainer} from "../../features/StoreManagement/Detail/StoreManagementDetailContainer.tsx";
import Layout from "../../widgets/Layout.tsx";

export const StoreManagementDetail = () => {
    return(
        <Layout pageTitle={"Store Detail"}>
            <StoreManagementDetailContainer />
        </Layout>
    )
}