// import {useDispatch} from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import moment from "moment/moment";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {useNavigate} from "react-router-dom";
import {ConfirmationModal} from "../../../components/Modals/ConfirmationModal.tsx";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useDeleteAccountMutation, useGetAccountListQuery} from "../../../apps/services/accountApi";
import {LoadingProcess} from "../../../components/Loading/LoadingProcess";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad";
import {IAccountResponse} from "../../../utils/interfaces";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";
import { PaginationComponent } from "../../../components/Pagination.tsx";

export const UserContainer = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string>("-1");
    const { data: accountList, isLoading, isError, isSuccess } = useGetAccountListQuery();
    const [deleteAccount] = useDeleteAccountMutation();
    const [accountFilters, setAccountFilters] = useState<IAccountResponse[] | undefined>([]);

    useEffect(() => {
        if (isSuccess) {
            setAccountFilters(accountList.data)
        }
    }, [accountList, isSuccess])

    const handleAddOrEdit = (id:string = "-1") => {
        window.scrollTo(0, 0);
        if (id === "-1"){
            navigate("/user-management/add")
        } else {
            navigate("/user-management/edit/"+ id)
        }
    }

    const handleDelete = (id: string) => {
        setUserId(id);
        showOrCloseModal("modal-delete", "show");
    }

    const deleteCurrentUser = () => {
        console.log(userId);
        deleteAccount(userId).unwrap()
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
        const accs = accountList?.data.filter((item) => item.username.includes(value) || item.fullName.includes(value));
        setAccountFilters(accs);
    }

    const MainContent = isError ? (<FailedLoad />)
        : (
            accountFilters && (
                <PaginationComponent 
                    data={accountFilters}
                    itemsPerPage={15}
                    titleTables={["No", "Username", "Nama Lengkap", "Role", "Toko", "Status", "Terakhir Login", "Aksi"]}
                    renderTitle={(item, index) => (
                        <th className="text-center" key={index}>
                            {item}
                        </th>
                    )}
                    renderItem={(item, index) => (
                        <tr key={index} className={'text-center'}>
                            <td>{index + 1}</td>
                             <td>
                                 {item.username}
                             </td>
                             <td>{item.fullName}</td>
                             <td>{item.roleName}</td>
                             <td>{item.storeName ?? "-"}</td>
                             <td>{item.isActive ?
                                 <div className="badge badge-success text-white">
                                     Aktif
                                 </div> :
                                 <div className="badge badge-error text-white">
                                     Tidak Aktif
                                 </div>}
                             </td>
                             <td>{item.lastLogin ? moment(item.lastLogin).format("DD-MMM-YY HH:mm:ss") : "-"}</td>
                             <td className={'flex'}>
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
            <ConfirmationModal onClickYes={deleteCurrentUser}/>
            <TitleCard
                title="Users"
                topMargin="mt-2"
                topSideButtons={<TopSideButtons onClick={() => handleAddOrEdit()} onChangeInput={handleOnChangeSearch}  />}>

                {isLoading ? <LoadingProcess loadingName={"Memuat data user"} /> : MainContent }
                {/* Leads List in table format loaded from slice after api call */}

            </TitleCard>
        </>
    )
}
