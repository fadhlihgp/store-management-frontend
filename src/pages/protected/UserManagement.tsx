import {UserContainer} from "../../features/UserManagement/List";
import Layout from "../../widgets/Layout";

export const UserManagement = () => {
    return(
        <Layout pageTitle={'User Management'}>
            <UserContainer />
        </Layout>
    )
}
