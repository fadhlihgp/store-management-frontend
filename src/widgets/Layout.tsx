import LeftSidebar from "../containers/LeftSidebar"
import {ReactNode} from "react"
import 'react-notifications/lib/notifications.css';
import Header from "../containers/Header";
import {Footer} from "../containers/Footer";
import {Helmet} from "react-helmet";
interface LayoutProps {
    children: ReactNode;
    pageTitle: string
}
const ogData = {
    title: 'KelolaWarung by FadhlihCodes', // Judul halaman
    description: 'Aplikasi untuk mengelola usaha warung Anda dengan mudah dan efisien.', // Deskripsi singkat
    url: 'https://www.kelolawarung.fadhlih.com', // URL halaman
    siteName: 'KelolaWarung', // Nama situs
    type: 'website', // Tipe konten (bisa website, article, dll.)
    locale: 'id_ID', // Locale bahasa dan wilayah
};


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
      <div>
          <Helmet>
              {/* Open Graph Meta Tags */}
              <meta property="og:title" content={ogData.title} />
              <meta property="og:description" content={ogData.description} />
              <meta property="og:url" content={ogData.url} />
              <meta property="og:site_name" content={ogData.siteName} />
              <meta property="og:type" content={ogData.type} />
              <meta property="og:locale" content={ogData.locale} />

              {/* Twitter Card Meta Tags */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={ogData.title} />
              <meta name="twitter:description" content={ogData.description} />

              {/* Other standard meta tags */}
              <meta name="description" content={ogData.description} />

          </Helmet>
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
      </div>
    )
}

export default Layout
