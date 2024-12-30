import {
    PencilIcon,
} from '@heroicons/react/20/solid'
import {IBreadcrumbData} from "../../utils/TableDataType.ts";
import {BreadcrumbComponent} from "../Breadcrumbs/BreadcrumbComponent.tsx";
import {
    CalendarIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import moment from "moment";
import React from 'react';

interface PageHeadingProps {
    breadcrumbsData?: IBreadcrumbData[],
    titlePage: string,
    buttonSide?: React.ReactNode,
    editOnClick?: () => void,
    showManipulation?: boolean,
    createdBy?: string,
    createdAt?: Date,
    editedBy?: string,
    editedAt?: Date
}

export const PageHeading = ({titlePage, buttonSide, breadcrumbsData, showManipulation = false, editedAt, editedBy, createdAt, createdBy, editOnClick}: PageHeadingProps) => {
    return (
        <div className="lg:flex lg:flex-row lg:items-center lg:justify-between flex flex-col">

            <div className="min-w-0 flex-1 flex-col">
                {breadcrumbsData && (
                    <BreadcrumbComponent breadcrumbsData={breadcrumbsData} />
                )}
                <div className={'flex gap-5 items-center'}>
                    {/* <button onClick={() => navigate(-1)}>
                        <ArrowLeftIcon className={'h-7 w-7'} />
                    </button> */}
                    <div className={"min-w-0 flex-1 flex-col"}>
                        <h2 className="text-xl font-bold leading-7 sm:truncate sm:text-xl sm:tracking-tight">
                            {titlePage}
                        </h2>


                    </div>
                </div>

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

            </div>

            {buttonSide && (
                buttonSide
            )}

            {editOnClick && (
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className="">
                  <button
                      type="button"
                      onClick={editOnClick}
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Edit
                  </button>
                </span>
                </div>
            )}

        </div>
    )
}
