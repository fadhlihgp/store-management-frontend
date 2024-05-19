import Layout from "../../widgets/Layout";
import {PurchaseTransactionContainer} from "../../features/PurchaseTransaction";

export const TransactionPurchase = () => {
    return(
        <Layout pageTitle={"Transaksi Pembelian"} >
            <PurchaseTransactionContainer />
        </Layout>
    )
}
