import DashboardStats from './components/DashboardStats'
import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import {BanknotesIcon, TagIcon} from "@heroicons/react/24/outline";

const statsData = [
    {title : "Total Pelanggan", value : "120", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ 2300 (22%)"},
    {title : "Total Produk", value : "150", icon : <TagIcon className='w-8 h-8'/>, description : "Current month"},
    {title : "Pemasukkan", value : "Rp. 2.300.000", icon : <BanknotesIcon className='w-8 h-8'/>, description : "50 in hot leads"},
    {title : "Pengeluaran", value : "Rp. 5.000.000", icon : <BanknotesIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
]



function DashboardContainer(){

    const dispatch = useDispatch()


    const updateDashboardPeriod = (newRange: any) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}

        {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats
                                key={k}
                                colorIndex={k}
                                title={d.title}
                                icon={d.icon}
                                value={d.value}
                                />
                        )
                    })
                }
            </div>



        {/** ---------------------- Different charts ------------------------- */}
            <div className="grid mt-4 grid-cols-1">
                <BarChart />
            </div>

        </>
    )
}

export default DashboardContainer
