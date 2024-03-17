import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ToogleInput from "../../components/Input/ToogleInput";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import SelectBox from "../../components/Input/SelectBox";

const breadcrumbsData = [
    {
        name: "User Management",
        url: "/user-management"
    },
    {
        name: "Form",
        url: "/"
    }
]

const options = [
    {
        name: "Anjasmara Store",
        value: "1"
    },
    {
        name: "Ramayana Store",
        value: "2"
    },
    {
        name: "Nainggolan Store",
        value: "3"
    }
]
export const UserManagementFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const handleSaveUser = () => {
        if (!id) {
            window.scrollTo(0,0);
            navigate("/user-management");
            toast.success("Berhasil menambah user");
        } else {
            window.scrollTo(0,0);
            navigate("/user-management");
            toast.success("Berhasil memperbarui user");
        }
    }

    const updateFormValue = ({updateType}: any) => {
        console.log(updateType)
    }

    return(
        <TitleCard title={id ? "Edit User" : "Tambah User"} topMargin="mt-2" breadcrumbsData={breadcrumbsData}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText labelTitle="Nama Lengkap" defaultValue="Alex" updateFormValue={updateFormValue}/>
                <InputText labelTitle="Username" defaultValue="Alex" updateFormValue={updateFormValue}/>
                <InputText labelTitle="Email" defaultValue="alex@dashwind.com" updateFormValue={updateFormValue}/>
                <InputText labelTitle="No Telephone" defaultValue="UI/UX Designer" updateFormValue={updateFormValue}/>
                <TextAreaInput  labelTitle="Alamat" defaultValue="Doing what I love, part time traveller" updateFormValue={updateFormValue}/>
                <SelectBox updateFormValue={updateFormValue} labelTitle={"Toko"} options={options} placeholder={"Pilih Toko"}  />
            </div>
            <div className="divider" ></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <ToogleInput updateType="syncData" labelTitle="Status Aktif" defaultValue={true} updateFormValue={updateFormValue}/>
            </div>

            <div className={'flex gap-2 justify-end'}>
                <div className="mt-16"><button className="btn float-right" onClick={() => navigate("/user-management")}>Batal</button></div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={handleSaveUser}>{id ? "Update" : "Simpan"}</button></div>
            </div>
        </TitleCard>
    )
}
