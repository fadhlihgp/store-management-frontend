import { PurchaseListContainer } from "../../features/PurchaseTransaction/PurchaseList"
import Layout from "../../widgets/Layout"

export const TransactionHistory = () => {
    return(
        <Layout pageTitle="Transaksi">
            {/* <DevelopmentDisplay /> */}
            <PurchaseListContainer />
        </Layout>
    )
}