import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {EyeIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import {DebtsDummy} from "../DebtDummy.ts";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import {FilterForm} from "../Components/FilterForm.tsx";
import {FormComponentDebt} from "../Components/FormComponentDebt.tsx";

export const DebtListContainer = () => {
    const navigate = useNavigate();

    const handleAddOrDetail = (id: string = "-1") => {
        const modal = document.getElementById('form-debt');
        if (id === "-1" && modal) {
            // Set CSS property top to 0 to make modal appear from the top
            modal.style.top = "0";
            modal.showModal();
        } else {
            window.scrollTo(0, 0);
            navigate("/note-debt/detail/"+id);
        }
    }

    const updateFormValue = ({updateType}: any) => {
        console.log(updateType)
    }


    return(
        <>
            <FormComponentDebt/>
            <TitleCard
                topSideButtons={<TopSideButtons onClick={handleAddOrDetail} componentChildren={<FilterForm handleAdd={() => handleAddOrDetail("-1")} updateFormValue={updateFormValue} />}/>}
                title={"Daftar Hutang"}
            >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full table-pin-rows">
                        <thead>
                        <tr className={'text-center'}>
                            <th>No</th>
                            <th>Nama Pelanggan</th>
                            <th>Catatan Hutang</th>
                            <th>Total Hutang</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            DebtsDummy.map((u, k) => {
                                return(
                                    <tr key={k} className={'text-center'}>
                                        <td>{k + 1}</td>
                                        <td>
                                            {u.customer.fullName}
                                        </td>
                                        <td>{u.debtDetails ?
                                            <div className={'badge badge-error lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>Sudah Ada</div> :
                                            <div className={'badge badge-success lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>Belum Ada</div>
                                        }</td>
                                        <td>{convertCurrency("Rp", u.totalDebt)}</td>
                                        <td className={'flex items-center justify-center'}>
                                            <button className="btn btn-square btn-ghost" onClick={() => handleAddOrDetail(u.id)}><EyeIcon className="w-5"/></button>
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
