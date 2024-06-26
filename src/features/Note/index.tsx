import TitleCard from "../../components/Cards/TitleCard";
import { PencilSquareIcon} from "@heroicons/react/24/outline";
import {MaximumWordLength} from "../../utils/MaximumWordLength";
import moment from "moment";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {TopSideButtons} from "../../components/Input/TopSideButtons";
import {NoteForm} from "./Components/NoteForm";
import React, {useEffect, useState} from "react";
import { useDeleteNoteOtherMutation, useGetNoteOtherListQuery } from "../../apps/services/noteOtherApi";
import { INoteOtherResponse } from "../../utils/interfaces";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";
import { showOrCloseModal } from "../../utils/showModalHelper";
import { ConfirmationModal } from "../../components/Modals/ConfirmationModal";
import toast from "react-hot-toast";
import { PaginationComponent } from "../../components/Pagination";

export const NoteContainer = () => {
    const [id, setId] = useState<string>("-1");
    const {data: noteOthers, isLoading, isError, isSuccess } = useGetNoteOtherListQuery();
    const [noteOtherFilters, setNoteOtherFilters] = useState<INoteOtherResponse[]>();
    const [deleteNote] = useDeleteNoteOtherMutation();

    useEffect(() => {
        if (isSuccess) {
            setNoteOtherFilters(noteOthers.data)
        }
    }, [isSuccess, noteOthers]);

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const data = noteOthers?.data.filter(n => n.title.toLowerCase().includes(value.toLowerCase()));
        setNoteOtherFilters(data);
    }
    const handleDelete = () => {
        deleteNote(id).unwrap()
        .then((res) => {
            toast.success(res.message);
            setId("-1");
            showOrCloseModal("modal-delete", "close");
        })
        .catch((err) => {
            toast.error(err.message ?? "Gagal menghapus catatan");
        })
    }

    const MainContent = isError ? <FailedLoad key={"1"} /> : (
        noteOtherFilters && (
            <PaginationComponent
                data={noteOtherFilters}
                itemsPerPage={15}
                titleTables={["No", "Judul", "Isi", "Dibuat", "Diperbarui", "Aksi"]}
                renderTitle={(item, index) => (
                    <th key={index} className="text-center">{item}</th>
                )} 
                renderItem={(u, index) => (
                    <tr key={index} className={'text-center'}>
                        <td>{index + 1}</td>
                        <td>
                                {u.title}
                        </td>
                        <td>{MaximumWordLength(u.content, 50)}</td>
                        <td>{moment(u.createdAt).format("DD MMM YYYY HH:mm")}</td>
                        <td>{moment(u.editedAt).format("DD MMM YYYY HH:mm") ?? "-"}</td>
                        <td className={'flex items-center justify-center'}>
                            <button className="btn btn-square btn-ghost" onClick={() => {
                                setId(u.id)
                                showOrCloseModal("form-note", "show");
                            }}><PencilSquareIcon className="w-5"/></button>
                            <button className="btn btn-square btn-ghost" onClick={() => {
                                setId(u.id);
                                showOrCloseModal("modal-delete", "show");
                            }}><TrashIcon className="w-5"/>
                            </button>
                        </td>
                    </tr>
                )}
            />
        )
    );

    return(
        <>
            <ConfirmationModal 
                title="Konfirmasi hapus catatan" 
                message="Anda yakin ingin menghapus catatan ?" 
                id="modal-delete"
                onClickYes={handleDelete}
            />
            <NoteForm id={id} setId={setId} noteOthers={noteOthers?.data} />
            <TitleCard
                title={"Daftar Catatan"}
                topSideButtons={<TopSideButtons onClick={() => {
                    setId("-1");
                    showOrCloseModal("form-note", "show");
                }} 
                onChangeInput={handleFilter} />}
            >
                <div className="overflow-x-auto w-full">
                    {isLoading ? <LoadingProcess loadingName="Memproses data catatan" /> : MainContent}
                </div>
            </TitleCard>
        </>

    )
}
