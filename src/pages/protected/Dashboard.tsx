// import {useDispatch} from "react-redux";



import Layout from "../../widgets/Layout";
import DashboardContainer from "../../features/dashboard";

export const Dashboard = () => {
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setPageTitle({ title : "Dashboard"}))
    // }, [])


    return(
        <Layout pageTitle={'Dashboard'} >
            <DashboardContainer />
        </Layout>
    )
}
