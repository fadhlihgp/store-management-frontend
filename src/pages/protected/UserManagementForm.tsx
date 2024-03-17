import Layout from "../../widgets/Layout";
import {useParams} from "react-router-dom";
import {UserManagementFormContainer} from "../../features/UserManagementForm";

export const UserManagementForm = () => {
    const {id} = useParams();
  return(
      <Layout pageTitle={id ? "Edit User" : "Tambah User"}>
          <UserManagementFormContainer />
      </Layout>
  )
}
