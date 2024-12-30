import {Route, routeAdmin, routeOwner, routeSuperAdmin} from '../routes/sidebar'
import { NavLink, Link , useLocation} from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

function LeftSidebar(){
    const location = useLocation();
    const [routesData, setRoutesData] = useState<Route[]>([{
        name: '',
        path: '',
        icon: '',
    }]);

    useEffect(() => {
        const userString = Cookies.get("user");
        let userJson = null;
        if (userString) {
            userJson = JSON.parse(userString);
        }

        switch (userJson.roleId) {
            case "1": setRoutesData(routeSuperAdmin); break;
            case "2": setRoutesData(routeOwner); break;
            case "3": setRoutesData(routeAdmin); break;
            default:
                break;

        }
    }, [setRoutesData])

    // const dispatch = useDispatch()


    const close = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        document.getElementById('left-sidebar-drawer').click()
    }

    return(
        <div className="drawer-side  z-30  ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
            <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
            <XMarkIcon className="h-5 inline-block w-5"/>
            </button>

                <li className="mb-2 font-semibold text-xl">

                    <Link to={'/dashboard'}><img className="mask mask-squircle w-10" src="/fadhlih-code.png" alt="Store Logo"/>KelolaWarung</Link> </li>

                {
                    routesData.map((route, k) => {
                        return(
                            <li className="" key={k}>
                                {
                                    route.submenu ?
                                        <SidebarSubmenu submenu={route.submenu} icon={route.icon} name={route.name} path={route.path} /> :
                                    (<NavLink
                                        end
                                        to={route.path}
                                        className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                        <div dangerouslySetInnerHTML={{ __html: route.icon }} />

                                        {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>) : null
                                            }
                                    </NavLink>)
                                }

                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar
