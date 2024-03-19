import {ReactNode} from "react";

interface CollapseComponentProps {
    title: string,
    content: ReactNode,
    icon?: string
}

export const CollapseComponent = ({content, title, icon}: CollapseComponentProps) => {
    return(
        <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
                {icon && (<div dangerouslySetInnerHTML={{ __html: icon }} />)} {title}
            </div>
            <div className="collapse-content">
                {content}
            </div>
        </div>
    )
}