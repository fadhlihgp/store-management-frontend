interface DashboardStatProps {
    title: string,
    icon: any,
    value: string | number,
    colorIndex: number
}

function DashboardStats({title, icon, value, colorIndex}: DashboardStatProps){

    const COLORS = ["primary", "primary"]

    return(
        <div className="stats shadow">
            <div className="stat">
                <div className={`stat-figure dark:text-slate-300 text-${COLORS[colorIndex%2]}`}>{icon}</div>
                <div className="stat-title dark:text-blue-300 font-semibold">{title}</div>
                <div className={` text-blue-500 font-bold text-md`}>{value}</div>
            </div>
        </div>
    )
}

export default DashboardStats
