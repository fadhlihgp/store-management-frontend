import {FormModal} from "../../../components/Modals/FormModal";
import React, {useState} from "react";
import {INoteForm} from "../../../utils/TableDataType";
import InputText2 from "../../../components/Input/InputText2";
import TextAreaInput2 from "../../../components/Input/TextAreaInput2";
import toast from "react-hot-toast";

interface FormProps {
    noteForm: INoteForm,
    setNoteForm: React.Dispatch<React.SetStateAction<INoteForm>>
}
const Form = ({ noteForm, setNoteForm}: FormProps) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setNoteForm({...noteForm, [name]: value})
    }

    return(
        <div className={'grid grid-cols-1 gap-2'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-1 text-slate-400 mb-2 text-sm'}>
                <div>Dibuat Oleh: Andi</div>
                <div>Diperbarui Oleh: Royan</div>
                <div>Dibuat Pada: 22 Jan 2023 05:16</div>
                <div>Diperbarui Pada: 23 Jan 2024 06:17</div>
            </div>
            <InputText2 labelTitle={"Judul Catatan"} value={noteForm.title} name={"title"} handleOnChange={handleOnChange} />
            <TextAreaInput2
                // textAreaStyle={'rows-1'}
                labelTitle={"Isi catatan"}
                value={noteForm.description}
                name={"description"}
                handleOnChange={(e) => setNoteForm({...noteForm, description: e.target.value})} />
        </div>
    )
}

interface NoteFormProps {
    id: string
}
export const NoteForm = ({id}: NoteFormProps) => {

    const [noteForm, setNoteForm] = useState<INoteForm>({
        title: "",
        description: ""
    })

    const reset = () => {
        setNoteForm({
            description: "",
            title: ""
        })
    }

    const handleSubmit = () => {
        toast.success('Berhasil menambah catatan');
        reset()
        document.getElementById("form-note").close();
    }

    const handleCancel = () => {
        document.getElementById("form-note").close();
    }

    return(
        <FormModal
            onClickYes={handleSubmit}
            title={id === "-1" ? "Tambah Catatan" : "Perbarui Catatan"}
            id={"form-note"}
            onClickCancel={handleCancel}>
            <Form setNoteForm={setNoteForm} noteForm={noteForm} />
        </FormModal>
    )
}
