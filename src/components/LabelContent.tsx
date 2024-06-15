interface LabelContentProps {
    title: string,
    content: string
}

export const LabelContent = ({title, content}: LabelContentProps) => {
    return(
        <div>
            <label className="font-bold text-md">{title}</label>
            <p className="text-md">{content}</p>
        </div>
    )
}