import InputText from "../../../components/Input/InputText.tsx";
import TextAreaInput from "../../../components/Input/TextAreaInput.tsx";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";

const breadcrumbsData = [
    {
        name: "Store Management",
        url: "/store-management"
    },
    {
        name: "Form",
        url: "/"
    }
]
export const StoreManagementFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const handleSaveStore = () => {
        if (!id) {
            window.scrollTo(0,0);
            navigate("/store-management");
            toast.success("Berhasil menambah store");
        } else {
            window.scrollTo(0,0);
            navigate("/store-management");
            toast.success("Berhasil memperbarui store");
        }
    }

    const updateFormValue = ({updateType}: any) => {
        console.log(updateType)
    }

    return(
        <TitleCard title={id ? "Edit Store" : "Tambah Store"} topMargin="mt-2" breadcrumbsData={breadcrumbsData}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText labelTitle="Nama" defaultValue="" updateFormValue={updateFormValue}/>
                <InputText labelTitle="Phone" defaultValue="" updateFormValue={updateFormValue}/>
                <InputText labelTitle="Tipe Usaha" defaultValue="" updateFormValue={updateFormValue}/>
                <InputText labelTitle="Didirikan" type={"number"} defaultValue="" updateFormValue={updateFormValue}/>
                <TextAreaInput  labelTitle="Alamat" defaultValue="" updateFormValue={updateFormValue}/>
            </div>

            <div className={'flex gap-2 justify-end'}>
                <div className="mt-16"><button className="btn float-right" onClick={() => navigate(-1)}>Batal</button></div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={handleSaveStore}>{id ? "Update" : "Simpan"}</button></div>
            </div>
        </TitleCard>
    )
}