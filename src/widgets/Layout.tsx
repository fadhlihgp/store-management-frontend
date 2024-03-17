import LeftSidebar from "../containers/LeftSidebar"
import {ReactNode} from "react"
import 'react-notifications/lib/notifications.css';
import Header from "../containers/Header";
import {Footer} from "../containers/Footer";
interface LayoutProps {
    children: ReactNode;
    pageTitle: string
}
function Layout({children, pageTitle}: LayoutProps ){
  // const dispatch = useDispatch()
  // const {newNotificationMessage, newNotificationStatus} = useSelector(state => state.header)
  //
  //
  // useEffect(() => {
  //     if(newNotificationMessage !== ""){
  //         if(newNotificationStatus === 1)NotificationManager.success(newNotificationMessage, 'Success')
  //         if(newNotificationStatus === 0)NotificationManager.error( newNotificationMessage, 'Error')
  //         dispatch(removeNotificationMessage())
  //     }
  // }, [newNotificationMessage])

    return(
      <>
        { /* Left drawer - containing page content and side bar (always open) */ }
        <div className="drawer  lg:drawer-open">
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
            {/*<PageContent/>*/}
            <div className="drawer-content flex flex-col ">
                <Header title={pageTitle}/>
                <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200">
                    {children}
                    <div className="h-16"></div>
                </main>
                <Footer />
            </div>
            <LeftSidebar />
        </div>
      </>
    )
}

export default Layout
