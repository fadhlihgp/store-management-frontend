import Subtitle from "../Typography/Subtitle"
import {ReactNode} from "react";
import {Link} from "react-router-dom";

interface IBreadcrumbData {
    name: string,
    url: string
}

interface TitleCardProps {
    title: string,
    children: ReactNode,
    topMargin?: string,
    topSideButtons?: ReactNode,
    breadcrumbsData?: IBreadcrumbData[]

}

  function TitleCard({title, children, topMargin, topSideButtons, breadcrumbsData}: TitleCardProps){
      return(
          <div className={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}>

              {breadcrumbsData && (
                  <div className="text-sm breadcrumbs mb-1">
                      <ul>
                          {breadcrumbsData.map((b, i) => (
                              (breadcrumbsData?.length - i) !== 1 ?
                              <li key={i}><Link to={b.url}>{b.name}</Link></li> : <li>{b.name}</li>
                              ))}
                      </ul>
                  </div>

              )}

            {/* Title for Card */}
              <Subtitle styleClass={topSideButtons ? "inline-block flex lg:flex-row md:flex-row flex-col items-center justify-between " : ""}>
                {title}

                {/* Top side button, show only if present */}
                {
                    topSideButtons && <div className="inline-block float-right">{topSideButtons}</div>
                }
              </Subtitle>

              <div className="divider mt-2"></div>

              {/** Card Body */}
              <div className='h-full w-full pb-6 bg-base-100'>
                  {children}
              </div>
          </div>

      )
  }


  export default TitleCard
