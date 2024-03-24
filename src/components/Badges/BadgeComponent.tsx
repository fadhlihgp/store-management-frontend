interface BadgeComponentProps {
    titleBadge: string,
    styleBadge?: string
}

export const BadgeComponent = ({styleBadge, titleBadge}: BadgeComponentProps) => {
    return(
        <div className={`badge  lg:badge-md badge-lg md:text-md text-xs  text-slate-100 ${styleBadge ?? 'badge-success'}`}>{titleBadge}</div>
    )
}