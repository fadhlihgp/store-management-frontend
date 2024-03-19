// import {useDispatch} from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import moment from "moment/moment";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {EyeIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {useNavigate} from "react-router-dom";
import {ConfirmationModal} from "../../../components/Modals/ConfirmationModal.tsx";
import {useState} from "react";
import toast from "react-hot-toast";
import {StoresDummy} from "../StoreDummy.ts";

export const StoreManagementContainer = () => {
    const navigate = useNavigate();
    const [storeId, setUserId] = useState<string>("-1");

    const handleAddOrEdit = (id:string = "-1") => {
        window.scrollTo(0, 0);
        if (id === "-1"){
            navigate("/store-management/add")
        } else {
            navigate("/store-management/edit/"+ id)
        }
    }

    const handleDelete = (id: string) => {
        setUserId(id);
        document.getElementById('modal-delete')?.showModal();
    }

    const deleteCurrentUser = () => {
        console.log(storeId);
        document.getElementById('modal-delete')?.close();
        toast.success("Berhasil mengahapus data")
    }
    return(
        <>
            <ConfirmationModal onClickYes={deleteCurrentUser} message={'Anda yakin ingin menghapus data toko ?'}/>
            <TitleCard
                title="Toko"
                topMargin="mt-2"
                topSideButtons={<TopSideButtons onClick={() => handleAddOrEdit()} />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                        <tr className={'text-center'}>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Phone</th>
                            <th>Tipe Usaha</th>
                            <th>Tanggal Daftar</th>
                            <th>Didirikan</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            StoresDummy.map((u, k) => {
                                return(
                                    <tr key={k} className={'text-center'}>
                                        <td>{k + 1}</td>
                                        <td>
                                            {u.name}
                                        </td>
                                        <td>{u.address}</td>
                                        <td>{u.phone}</td>
                                        <td>{u.businessType}</td>
                                        <td>{moment(u.registerDate).format("DD-MMM-YYYY hh:mm:ss")}</td>
                                        <td>{u.established ? u.established : "-"}</td>
                                        <td className={'flex'}>
                                            <button className="btn btn-square btn-ghost" onClick={() => {
                                                window.scrollTo(0, 0);
                                                navigate(`/store-management/detail/${u.id}`)
                                            }}><EyeIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={() => handleAddOrEdit(u.id)}><PencilSquareIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={() => handleDelete(u.id)}><TrashIcon className="w-5"/></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}
