import Subtitle from "../Typography/Subtitle"
import {ReactNode} from "react";
import {IBreadcrumbData} from "../../utils/TableDataType.ts";
import {BreadcrumbComponent} from "../Breadcrumbs/BreadcrumbComponent.tsx";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";



interface TitleCardProps {
    title: string,
    children: ReactNode,
    topMargin?: string,
    topSideButtons?: ReactNode,
    breadcrumbsData?: IBreadcrumbData[],
    showButtonBack?: boolean

}

  function TitleCard({title, children, topMargin, topSideButtons, breadcrumbsData, showButtonBack}: TitleCardProps){
    const navigate = useNavigate();
    return(
          <div className={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}>

              {breadcrumbsData && (
                  <BreadcrumbComponent breadcrumbsData={breadcrumbsData} />
              )}

            {/* Title for Card */}
              <Subtitle styleClass={topSideButtons ? "inline-block flex lg:flex-row md:flex-row flex-col items-center justify-between " : ""}>
                  {showButtonBack && (
                      <button className={'mr-3'} onClick={() => navigate(-1)}><ArrowLeftIcon className={'h-5 w-5'} /></button>
                  )}
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
