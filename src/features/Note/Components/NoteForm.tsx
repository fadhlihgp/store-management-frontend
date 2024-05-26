import {FormModal} from "../../../components/Modals/FormModal";
import React, {SetStateAction, useEffect, useState} from "react";
import InputText2 from "../../../components/Input/InputText2";
import TextAreaInput2 from "../../../components/Input/TextAreaInput2";
import toast from "react-hot-toast";
import moment from "moment";
import { showOrCloseModal } from "../../../utils/showModalHelper";
import { INoteOtherRequest, INoteOtherResponse } from "../../../utils/interfaces";
import { useCreateNoteOtherMutation, useUpdateNoteOtherMutation } from "../../../apps/services/noteOtherApi";

interface NoteFormProps {
    id: string,
    setId: React.Dispatch<SetStateAction<string>>,
    noteOthers?: INoteOtherResponse[]
}
export const NoteForm = ({id, setId, noteOthers}: NoteFormProps) => {

    const [noteForm, setNoteForm] = useState<INoteOtherRequest>({
        title: "",
        content: ""
    });
    const [addNoteOther] = useCreateNoteOtherMutation();
    const [editNoteOther] = useUpdateNoteOtherMutation();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [noteDetail, setNoteDetail] = useState<INoteOtherResponse>();

    useEffect(() => {
        if (id === "-1") {
            setNoteForm({
                title: "",
                content: ""
            })
        } else {
            const note = noteOthers?.find((note) => note.id === id);
            if (note) {
                setNoteForm({
                    title: note.title,
                    content: note.content
                });
                setNoteDetail(note);
            }
        }
    }, [id])

    const reset = () => {
        setNoteForm({
            content: "",
            title: ""
        });
        setId("-1");
        setErrorMessage(undefined);
    }

    const handleSubmit = () => {
        if (noteForm.title.length < 1 && noteForm.content.length < 1) {
            setErrorMessage("Judul dan deskripsi tidak boleh kosong");
            return;
        }
        if (noteForm.title.length < 1) {
            setErrorMessage("Judul tidak boleh kosong");
            return;
        }
        if (noteForm.content.length < 1) {
            setErrorMessage("Deskripsi tidak boleh kosong");
            return;
        }

        if (id === "-1") {
            console.log("eksekusi ini")
            addNoteOther(noteForm).unwrap()
            .then((res) => {
                toast.success(res.message);
                reset();
                showOrCloseModal("form-note", "close");
            })
            .catch((err) => {
                setErrorMessage(err.message ?? "Gagal menambah data");
            })
        } else {
            console.log("eksekusi edit")
            const dataEdit = {
                id: id,
                data: noteForm
            }

            editNoteOther(dataEdit).unwrap()
            .then((res) => {
                toast.success(res.message);
                reset();
                showOrCloseModal("form-note", "close");
            })
            .catch((err) => {
                setErrorMessage(err.message ?? "Gagal memperbarui data");
            })
        }
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {value, name} = event.target;
        setNoteForm({...noteForm, [name]: value});
        setErrorMessage(undefined)
    };

    const handleCancel = () => {
        reset();
        showOrCloseModal("form-note", "close");
    }

    return(
        <FormModal
            onClickYes={handleSubmit}
            title={id === "-1" ? "Tambah Catatan" : "Perbarui Catatan"}
            id={"form-note"}
            onClickCancel={handleCancel}>
            <div className={'grid grid-cols-1 gap-2'}>
            {id !== "-1" && (
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-1 text-slate-400 mb-2 text-sm'}>
                <div>Dibuat Oleh: {noteDetail?.createdBy}</div>
                <div>Diperbarui Oleh: {noteDetail?.editedBy}</div>
                <div>Dibuat Pada: {moment(noteDetail?.createdAt).format("DD MMMM YYYY HH:mm")}</div>
                <div>Diperbarui Pada: {moment(noteDetail?.editedAt).format("DD MMMM YYYY HH:mm")}</div>
            </div>
            )}
            {errorMessage && (
                <p className="text-md text-red-600">{errorMessage}</p>
            )}
            <InputText2 
                labelTitle={"Judul Catatan"} 
                value={noteForm.title} 
                name={"title"}
                isRequired={true} 
                handleOnChange={handleOnChange} />
            <TextAreaInput2
                // textAreaStyle={'rows-1'}
                textAreaStyle="textarea-lg textarea-success rows-5"
                labelTitle={"Isi catatan"}
                value={noteForm.content}
                name={"Isi Catatan"}
                handleOnChange={(e) => {
                    setNoteForm({...noteForm, content: e.target.value});
                    setErrorMessage(undefined)
                }} />
        </div>
        </FormModal>
    )
}
