import Subtitle from "../Typography/Subtitle"
import {ReactNode} from "react";
import {IBreadcrumbData} from "../../utils/TableDataType.ts";
import {BreadcrumbComponent} from "../Breadcrumbs/BreadcrumbComponent.tsx";
import {ArrowLeftIcon, CalendarIcon, UserIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import moment from "moment";



interface TitleCardProps {
    title: string,
    children: ReactNode,
    topMargin?: string,
    topSideButtons?: ReactNode,
    breadcrumbsData?: IBreadcrumbData[],
    showButtonBack?: boolean,
    showManipulation?: boolean,
    createdBy?: string,
    createdAt?: Date,
    editedBy?: string,
    editedAt?: Date
}

  function TitleCard({title, children, showManipulation = false, createdBy, createdAt, editedAt, editedBy, topMargin, topSideButtons, breadcrumbsData, showButtonBack}: TitleCardProps){
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

                  {showManipulation && (
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <UserIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                Dibuat oleh: {createdBy ?? "-"}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                Dibuat pada: {moment(createdAt).format("DD MMM YYYY HH:mm:ss") ?? "-"}
                            </div>
                        </div>
                        <div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <UserIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                Diedit oleh: {editedBy ?? "-"}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                Diedit pada: {moment(editedAt).format("DD MMM YYYY HH:mm:ss") ?? "-"}
                            </div>
                        </div>
                    </div>
                )}

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
