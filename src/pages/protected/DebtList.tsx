import Layout from "../../widgets/Layout.tsx";
import {DebtListContainer} from "../../features/Debt/DebtList";

export const DebtList = () => {
    return(
        <Layout pageTitle={"Catatan Hutang"}>
            <DebtListContainer />
        </Layout>
    )
}