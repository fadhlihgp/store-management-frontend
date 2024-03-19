import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import TitleCard from "../../components/Cards/TitleCard.tsx";
import InputText from "../../components/Input/InputText.tsx";
import TextAreaInput from "../../components/Input/TextAreaInput.tsx";

const breadcrumbsData = [
    {
        name: "Data Pelanggan",
        url: "/customer"
    },
    {
        name: "Form",
        url: "/"
    }
]
export const CustomerFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const handleSaveStore = () => {
        if (!id) {
            window.scrollTo(0,0);
            navigate("/customer");
            toast.success("Berhasil menambah data pelanggan")
        } else {
            window.scrollTo(0,0);
            navigate("/customer");
            toast.success("Berhasil memperbarui data pelanggan");
        }
    }

    const updateFormValue = ({updateType}: any) => {
        console.log(updateType)
    }

    return(
        <TitleCard title={id ? "Edit Pelanggan" : "Tambah Pelanggan"} topMargin="mt-2" breadcrumbsData={breadcrumbsData}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText labelTitle="Nama" defaultValue="" updateFormValue={updateFormValue}/>
                <InputText labelTitle="No Ponsel" defaultValue="" updateFormValue={updateFormValue}/>
                <InputText labelTitle="email" type={"email"} defaultValue="" updateFormValue={updateFormValue}/>
                <TextAreaInput  labelTitle="Alamat" defaultValue="" updateFormValue={updateFormValue}/>
            </div>

            <div className={'flex gap-2 justify-end'}>
                <div className="mt-16"><button className="btn float-right" onClick={() => navigate(-1)}>Batal</button></div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={handleSaveStore}>{id ? "Update" : "Simpan"}</button></div>
            </div>
        </TitleCard>
    )
}