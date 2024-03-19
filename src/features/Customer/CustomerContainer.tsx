import {useNavigate} from "react-router-dom";
import {useState} from "react";
import toast from "react-hot-toast";
import {ConfirmationModal} from "../../components/Modals/ConfirmationModal.tsx";
import TitleCard from "../../components/Cards/TitleCard.tsx";
import {TopSideButtons} from "../../components/Input/TopSideButtons.tsx";
import {EyeIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {CustomersDummy} from "./CustomerDummy.ts";

export const CustomerContainer = () => {
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState<string>("-1");

    const handleAddOrEdit = (id:string = "-1") => {
        window.scrollTo(0, 0);
        if (id === "-1"){
            navigate("/customer/add")
        } else {
            navigate("/customer/edit/"+ id)
        }
    }

    const handleDelete = (id: string) => {
        setCustomerId(id);
        document.getElementById('modal-delete')?.showModal();
    }

    const deleteCurrentCustomer = () => {
        console.log(customerId);
        document.getElementById('modal-delete')?.close();
        toast.success("Berhasil mengahapus data")
    }
    return(
        <>
            <ConfirmationModal onClickYes={deleteCurrentCustomer} message={'Anda yakin ingin menghapus data pelanggan ?'}/>
            <TitleCard
                title="Daftar Pelanggan"
                topMargin="mt-2"
                topSideButtons={<TopSideButtons onClick={() => handleAddOrEdit()} />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                        <tr className={'text-center'}>
                            <th>No</th>
                            <th>Nama Lengkap</th>
                            <th>Alamat</th>
                            <th>Email</th>
                            <th>No Hp</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            CustomersDummy.map((u, k) => {
                                return(
                                    <tr key={k} className={'text-center'}>
                                        <td>{k + 1}</td>
                                        <td>
                                            {u.fullName}
                                        </td>
                                        <td>{u.address ?? "-"}</td>
                                        <td>{u.email ?? "-"}</td>
                                        <td>{u.phone ?? "-"}</td>
                                        <td className={'flex'}>
                                            <button className="btn btn-square btn-ghost" onClick={() => {
                                                window.scrollTo(0, 0);
                                                navigate(`/customer/detail/${u.id}`)
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