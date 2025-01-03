import { themeChange } from 'theme-change'
import {  useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import BellIcon  from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon  from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'
import {Link, useNavigate} from "react-router-dom";
import {ConfirmationModal} from "../components/Modals/ConfirmationModal.tsx";
import Cookies from "js-cookie";
import {AppDispatch} from "../apps/store";
import {logoutSuccess} from "../apps/slice/profileSlice";
import {showOrCloseModal} from "../utils/showModalHelper";

// import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'

interface HeaderProps {
    title: string
}
function Header({title}: HeaderProps){
    const dispatch = useDispatch<AppDispatch>()
    // const {noOfNotifications} = useSelector(state => state.header)
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));
    const navigate = useNavigate();
    const [roleId, setRoleId] = useState<string>("");
    useEffect(() => {
        themeChange(false)
        if(currentTheme === null){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
                setCurrentTheme("dark")
            }else{
                setCurrentTheme("light")
            }
        }
        // 👆 false parameter is required for react project
      }, [])


    // Opening right sidebar for notification
    const openNotification = () => {
        dispatch(openRightDrawer({header : "Notifications", bodyType : RIGHT_DRAWER_TYPES.NOTIFICATION}))
    }


    function logoutUser(){
        Cookies.remove("token");
        Cookies.remove("user");
        dispatch(logoutSuccess());
        navigate("/login");
    }

    useEffect(() => {
        const userString = Cookies.get("user");
        let userJson = null;
        if (userString) {
            userJson = JSON.parse(userString);
        }
        setRoleId(userJson.roleId);
    }, [roleId, setRoleId]);

    return(
        // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md

        <>
            <ConfirmationModal id={"modal-confirmation"} title={"Konfirmasi keluar"} message={"Anda yakin ingin keluar aplikasi ?"} onClickYes={logoutUser} />
            <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">


                {/* Menu toogle for mobile view or small screen */}
                <div className="flex-1">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                    <Bars3Icon className="h-5 inline-block w-5"/></label>
                    <h1 className="text-2xl font-semibold ml-2">{title}</h1>
                </div>



            <div className="flex-none ">

            {/* Light and dark theme selection toogle **/}
            <label className="swap ">
                <input type="checkbox"/>
                <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
            </label>

                <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
                    <div className="indicator">
                        <BellIcon className="h-6 w-6"/>
                        <span className="indicator-item badge badge-secondary badge-sm">5</span>
                        {/*{noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null }*/}
                    </div>
                </button>


                {/* Profile icon, opening menu on click */}
                <div className="dropdown dropdown-end ml-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src="https://res.cloudinary.com/do5gw4vcx/image/upload/v1708619090/p5a3o4c9yuciwnbjpib8.png" alt="profile" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="justify-between">
                            <Link to={'/profile'}>
                                Profile
                            </Link>
                        </li>
                        {roleId === "2" && (
                            <li className=''><Link to={'/store-profile'}>Profile Toko</Link></li>
                        )}
                        <li className=''><Link to={'/change-password'}>Ganti Password</Link></li>
                        {/* <li className=''><Link to={'/report-problem'}>Laporkan Masalah</Link></li> */}
                        <div className="divider mt-0 mb-0"></div>
                        <li><a onClick={() => showOrCloseModal("modal-confirmation", "show")}>Logout</a></li>
                    </ul>
                </div>
            </div>
            </div>

        </>
    )
}

export default Header
