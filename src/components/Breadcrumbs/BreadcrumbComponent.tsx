import {Link} from "react-router-dom";
import {IBreadcrumbData} from "../../utils/TableDataType.ts";

interface BreadcrumbComponentProps {
    breadcrumbsData: IBreadcrumbData[]
}
export const BreadcrumbComponent = ({breadcrumbsData}: BreadcrumbComponentProps) => {
  return(
      <div className="text-sm breadcrumbs mb-1">
          <ul>
              {breadcrumbsData.map((b, i) => (
                  (breadcrumbsData?.length - i) !== 1 ?
                      <li key={i}><Link to={b.url}>{b.name}</Link></li> : <li>{b.name}</li>
              ))}
          </ul>
      </div>
  )
}