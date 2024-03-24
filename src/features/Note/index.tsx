import TitleCard from "../../components/Cards/TitleCard";
import {DebtsDummy} from "../Debt/DebtDummy";
import { PencilSquareIcon} from "@heroicons/react/24/outline";
import {notesDummy} from "./noteDummy";
import {MaximumWordLength} from "../../utils/MaximumWordLength";
import moment from "moment";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {TopSideButtons} from "../../components/Input/TopSideButtons";
import {NoteForm} from "./Components/NoteForm";
import {useState} from "react";

export const NoteContainer = () => {
    const [id, setId] = useState<string>("-1");

    return(
        <>
            <NoteForm id={id} />
            <TitleCard
                title={"Daftar Catatan"}
                topSideButtons={<TopSideButtons onClick={() => document.getElementById("form-note").showModal()} />}
            >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full table-pin-rows">
                        <thead>
                        <tr className={'text-center'}>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Isi</th>
                            <th>Dibuat</th>
                            <th>Diperbarui</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            notesDummy.map((u, k) => {
                                return(
                                    <tr key={k} className={'text-center'}>
                                        <td>{k + 1}</td>
                                        <td>
                                            {u.title}
                                        </td>
                                        <td>{MaximumWordLength(u.description, 50)}</td>
                                        <td>{moment(u.createdAt).format("DD MMM YYYY hh:mm")}</td>
                                        <td>{moment(u.editedAt).format("DD MMM YYYY hh:mm") ?? "-"}</td>
                                        <td className={'flex items-center justify-center'}>
                                            <button className="btn btn-square btn-ghost" onClick={() => {
                                                setId(u.id)
                                                document.getElementById("form-note").showModal()
                                            }}><PencilSquareIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost"><TrashIcon className="w-5"/></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    {!DebtsDummy && (
                        <div className={'w-full flex justify-center items-center'}>
                            Data tidak ditemukan
                        </div>
                    )}
                </div>
            </TitleCard>
        </>

    )
}
