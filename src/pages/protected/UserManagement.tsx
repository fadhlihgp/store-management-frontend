import {UserContainer} from "../../features/UserManagement";
import Layout from "../../widgets/Layout";

export const UserManagement = () => {
    return(
        <Layout pageTitle={'User Management'}>
            <UserContainer />
        </Layout>
    )
}
