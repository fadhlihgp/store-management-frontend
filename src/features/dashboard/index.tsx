import DashboardStats from './components/DashboardStats'
import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import BarChart from './components/BarChart'
import {BanknotesIcon, TagIcon} from "@heroicons/react/24/outline";
import { useGetDashboardQuery } from '../../apps/services/otherApi'
import FailedLoad from '../../components/OtherDisplay/FailedLoad'
import { LoadingProcess } from '../../components/Loading/LoadingProcess'
import { useEffect, useState } from 'react'
import { convertCurrency } from '../../utils/convertCurrency'



function DashboardContainer(){
    const {data, isLoading, isError, isSuccess} = useGetDashboardQuery();
    const [statsData, setStatsData] = useState<any>([
        {title : "Total Pelanggan", value : 126, icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ 2300 (22%)"},
        {title : "Total Produk", value : "150", icon : <TagIcon className='w-8 h-8'/>, description : "Current month"},
        {title : "Transaksi", value : "Rp. 2.300.000", icon : <BanknotesIcon className='w-8 h-8'/>, description : "50 in hot leads"},
        {title : "Hutang", value : "Rp. 5.000.000", icon : <BanknotesIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
    ])
    // const statsData = [
       

    useEffect(() => {
        if (isSuccess) {
            const newData = [
                {title : data.data.stats[0].message, value : data.data.stats[0].value, icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ 2300 (22%)"},
                {title : data.data.stats[1].message, value : data.data.stats[1].value, icon : <TagIcon className='w-8 h-8'/>, description : "Current month"},
                {title : data.data.stats[2].message, value : convertCurrency("Rp", data.data.stats[2].value), icon : <BanknotesIcon className='w-8 h-8'/>, description : "50 in hot leads"},
                {title : data.data.stats[3].message, value : convertCurrency("Rp", data.data.stats[3].value), icon : <BanknotesIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
            ]
            setStatsData(newData);
        }
    }, [isSuccess, data])

    // const updateDashboardPeriod = (newRange: any) => {
    //     // Dashboard range changed, write code to refresh your values
    //     dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    // }

    const MainContent = isError ? <FailedLoad key={"1"} /> : <>
        {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}

        {/** ---------------------- Different stats content 1 ------------------------- */}
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d: any, k: any) => {
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
        {data && (
            <div className="grid mt-4 grid-cols-1">
                <BarChart transactionTotals={data?.data.transactionTotals} />
            </div>
        )}
    </>
    return(
        <>
        {isLoading ? <LoadingProcess loadingName='Mengambil data dashboard' /> : MainContent}
        </>
    )
}

export default DashboardContainer
