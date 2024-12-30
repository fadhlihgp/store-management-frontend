import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import { TopSideButtons } from "../../components/Input/TopSideButtons";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";
import { ConfirmationModal } from "../../components/Modals/ConfirmationModal";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import { PaginationComponent } from "../../components/Pagination";
import { IMasterParameterResponse } from "../../utils/interfaces";
import { showOrCloseModal } from "../../utils/showModalHelper";
import { useDeleteMasterParameterMutation, useGetMasterParameterQuery } from "../../apps/services/otherApi";

export const MasterParameterListContainer = () => {
    const navigate = useNavigate();
    const {data: parameters, isLoading, isError, isSuccess} = useGetMasterParameterQuery();
    const [parameterList, setParameterList] = useState<IMasterParameterResponse[] | undefined>([]);
    const [parameterId, setParameterId] = useState("-1");
    const [deleteParameter] = useDeleteMasterParameterMutation();

    useEffect(() => {
        if (isSuccess) {
            setParameterList(parameters.data);
        }
    }, [isError, isSuccess, parameters])

    const handleAddOrEdit = (id:string = "-1") => {
        window.scrollTo(0, 0);
        if (id === "-1"){
            navigate("/master-parameter/add")
        } else {
            navigate("/master-parameter/edit/"+ id)
        }
    }

    const handleDelete = (id: string) => {
        setParameterId(id);
        showOrCloseModal("modal-delete", "show");
    }

    const deleteCurrentSupplier = () => {
        deleteParameter(parameterId).unwrap()
            .then((res) => {
                toast.success(res.message);
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
            .finally(() => {
                showOrCloseModal("modal-delete", "close");
            })
    }

    const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        if (parameters?.data){
            const accs = parameters?.data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()) || item.type?.toLowerCase().includes(value.toLowerCase()));
            setParameterList(accs);
        }
    }

    const MainContent = isError ? (<FailedLoad />)
        : (
            parameterList && (
                <PaginationComponent 
                    data={parameterList}
                    itemsPerPage={15}
                    titleTables={["No", "Nama", "Type", "Order Data", "Aksi"]}
                    renderTitle={(item, index) => (
                        <th className="text-center" key={index}>
                            {item}
                        </th>
                    )}
                    renderItem={(item, index) => (
                        <tr key={index} className={'text-center'}>
                            <td>{index + 1}</td>
                             <td>
                                 {item.name}
                             </td>
                             <td>{item.type}</td>
                             <td>{item.orderData}</td>
                             <td className={'flex justify-center'}>
                                 <button className="btn btn-square btn-ghost" onClick={() => handleAddOrEdit(item.id)}><PencilSquareIcon className="w-5"/></button>
                                 <button className="btn btn-square btn-ghost" onClick={() => handleDelete(item.id)}><TrashIcon className="w-5"/></button>
                             </td>
                         </tr>
                    )}
                />
            )
        )

    return(
        <>
            <ConfirmationModal onClickYes={deleteCurrentSupplier} message="Apakah anda yakin ingin menghapus data master parameter ?"/>
            <TitleCard
                title="Data Master Parameter"
                topMargin="mt-2"
                topSideButtons={<TopSideButtons onClick={() => handleAddOrEdit()} onChangeInput={handleOnChangeSearch}  />}>

                {isLoading ? <LoadingProcess loadingName={"Memuat data master parameter"} /> : MainContent }
                {/* Leads List in table format loaded from slice after api call */}

            </TitleCard>
        </>
    )
}