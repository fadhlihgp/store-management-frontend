// import {useDispatch} from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import moment from "moment/moment";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {useNavigate} from "react-router-dom";
import {ConfirmationModal} from "../../../components/Modals/ConfirmationModal.tsx";
import {useState} from "react";
import toast from "react-hot-toast";

const users = [
    {
        id: "1",
        email: "andri@example.com",
        fullName: "Andri Ningrat",
        userName: "andri17",
        noTelephone: "089898",
        password: undefined,
        address: "Bekasi",
        role: "Admin",
        store: "Agra Store",
        lastLogin: new Date(),
        isActive:true
    },
    {
        id: "2",
        email: "omar@example.com",
        fullName: "Omar Bakri",
        userName: "omar17",
        noTelephone: "089898",
        password: undefined,
        address: "Bekasi",
        store: "Agra Store",
        role: "Admin",
        lastLogin: new Date(),
        isActive:true
    },
    {
        id: "3",
        email: "sidiq@example.com",
        fullName: "Sidiq Bakri",
        userName: "sidiq17",
        noTelephone: "089898",
        password: undefined,
        address: "Bekasi",
        store: "Agra Store",
        role: "Admin",
        lastLogin: new Date(),
        isActive:true
    }
]

export const UserContainer = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string>("-1");
    // const users = useSelector(state => state.user.users);

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
        document.getElementById('modal-delete').showModal();
    }

    // const dispatch = useDispatch()
    //
    // useEffect(() => {
    //     dispatch(getLeadsContent())
    // }, [])



    // const getDummyStatus = (index) => {
    //     if(index % 5 === 0)return <div className="badge">Not Interested</div>
    //     else if(index % 5 === 1)return <div className="badge badge-primary">In Progress</div>
    //     else if(index % 5 === 2)return <div className="badge badge-secondary">Sold</div>
    //     else if(index % 5 === 3)return <div className="badge badge-accent">Need Followup</div>
    //     else return <div className="badge badge-ghost">Open</div>
    // }

    // const deleteCurrentLead = (index: any) => {
    //     dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION,
    //         extraObject : { message : `Are you sure you want to delete this lead?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index}}))
    // }

    const deleteCurrentUser = () => {
        console.log(userId);
        document.getElementById('modal-delete').close();
        toast.success("Berhasil mengahapus data")
    }
    return(
        <>
            <ConfirmationModal onClickYes={deleteCurrentUser}/>
            <TitleCard
                title="Users"
                topMargin="mt-2"
                topSideButtons={<TopSideButtons onClick={() => handleAddOrEdit()} />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                        <tr className={'text-center'}>
                            <th>No</th>
                            <th>Username</th>
                            <th>Nama Lengkap</th>
                            <th>Role</th>
                            <th>Toko</th>
                            <th>Status</th>
                            <th>Terakhir Login</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((u, k) => {
                                return(
                                    <tr key={k} className={'text-center'}>
                                        <td>{k + 1}</td>
                                        <td>
                                            {u.userName}
                                        </td>
                                        <td>{u.fullName}</td>
                                        <td>{u.store}</td>
                                        <td>{u.role}</td>
                                        <td>{u.isActive ?
                                            <div className="badge badge-success text-white">
                                                Aktif
                                            </div> :
                                            <div className="badge badge-error text-white">
                                                Tidak Aktif
                                            </div>}
                                        </td>
                                        <td>{u.lastLogin ? moment(u.lastLogin).format("DD-MMM-YY hh:mm:ss") : "-"}</td>
                                        <td className={'flex'}>
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
