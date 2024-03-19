import Layout from "../../widgets/Layout.tsx";
import {StoreManagementFormContainer} from "../../features/StoreManagement/Form/StoreManagementFormContainer.tsx";

export const StoreManagementForm = () => {
    return(
        <Layout pageTitle={"Store Management"}>
            <StoreManagementFormContainer />
        </Layout>
    )
}