import Layout from "../../widgets/Layout.tsx";
import {DebtDetailContainer} from "../../features/Debt/Detail";

export const DebtDetail = () => {
    return(
        <Layout pageTitle={"Detail Hutang"}>
            <DebtDetailContainer />
        </Layout>
    )
}