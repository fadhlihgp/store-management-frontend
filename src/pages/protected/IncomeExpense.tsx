import Layout from "../../widgets/Layout";
import {IncomeExpenseContainer} from "../../features/IncomeExpense";

export const IncomeExpense = () => {
    return(
        <Layout pageTitle={"Catatan Pengeluaran dan Pemasukkan"}>
            <IncomeExpenseContainer />
        </Layout>
    )
}
