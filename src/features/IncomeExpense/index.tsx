import {FormComponentDebt} from "../Debt/Components/FormComponentDebt.tsx";
import TitleCard from "../../components/Cards/TitleCard.tsx";
import {TopSideButtons} from "../../components/Input/TopSideButtons.tsx";
import {FilterForm} from "../Debt/Components/FilterForm.tsx";
import {DebtsDummy} from "../Debt/DebtDummy.ts";
import {convertCurrency} from "../../utils/convertCurrency.ts";
import {EyeIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import {FormComponentInEx} from "./Components/FormComponentInEx";
import {useState} from "react";
import {incomeExpensesDummy} from "./incomeExpenseDummy";
import moment from "moment";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {FilterFormInEx} from "./Components/FilterFormInEx";

export const IncomeExpenseContainer = () => {
    const navigate = useNavigate();
    const [inExId, setInExId] = useState<string>("-1");

    const handleAddOrEdit = (id: string = "-1") => {
        const modal = document.getElementById('form-debt');
        if (id === "-1" && modal) {
            // Set CSS property top to 0 to make modal appear from the top
            modal.style.top = "0";
            modal.showModal();
        } else {
            setInExId(id);
            modal.showModal();
        }
    }

    return(
        <>
            <FormComponentInEx incomeExpenseId={inExId} setIncomeExpenseId={setInExId}/>
            <TitleCard
                topSideButtons=
                    {<TopSideButtons
                        onClick={handleAddOrEdit}
                        showInput={false}
                        componentChildren={<FilterFormInEx handleAdd={() => handleAddOrEdit("-1")} />}/>}
                title={"Daftar Pemasukkan & Pengeluaran"}
            >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full table-pin-rows">
                        <thead>
                        <tr className={'text-center'}>
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Nominal</th>
                            <th>Jenis</th>
                            <th>Catatan</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            incomeExpensesDummy.map((u, k) => {
                                return(
                                    <tr key={k} className={'text-center'}>
                                        <td>{k + 1}</td>
                                        <td>
                                            {moment(u.dateNote).format("DD MMM YYYY")}
                                        </td>
                                        <td>{convertCurrency("Rp", u.nominal)}</td>
                                        <td>{u.status ?
                                            <div className={'badge badge-success lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>Pemasukkan</div> :
                                            <div className={'badge badge-error lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>pengeluaran</div>
                                        }</td>
                                        <td>{u.note ?? "-"}</td>
                                        <td className={'flex items-center justify-center'}>
                                            <button className="btn btn-square btn-ghost" onClick={() => handleAddOrEdit(u.id)}><PencilSquareIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={() => handleAddOrEdit(u.id)}><TrashIcon className="w-5"/></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    {!incomeExpensesDummy && (
                        <div className={'w-full flex items-center justify-center'}>
                            Data tidak ditemukan
                        </div>
                    )}
                </div>
            </TitleCard>
        </>
    )
}
