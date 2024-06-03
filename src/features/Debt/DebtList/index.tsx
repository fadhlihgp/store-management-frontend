import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {EyeIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import {FilterForm} from "../Components/FilterForm.tsx";
import {FormComponentDebt} from "../Components/FormComponentDebt.tsx";
import { useGetNoteDebtListQuery } from "../../../apps/services/noteDebtApi.ts";
import { useEffect, useState } from "react";
import { IDebtResponseList } from "../../../utils/interfaces.ts";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad.tsx";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";

export const DebtListContainer = () => {
    const navigate = useNavigate();
    const {data: debtList, isSuccess, isLoading, isError} = useGetNoteDebtListQuery();
    const [debtListFilter, setDebtListFilter] = useState<IDebtResponseList[]>([]);


    useEffect(() => {
        if(isSuccess) {
            setDebtListFilter(debtList.data);
        }
    }, [debtList])


    const handleAddOrDetail = (id: string = "-1") => {
        const modal = document.getElementById('form-debt');
        if (id === "-1" && modal) {
            // Set CSS property top to 0 to make modal appear from the top
            modal.style.top = "0";
            showOrCloseModal("form-debt", "show");
        } else {
            window.scrollTo(0, 0);
            navigate("/note-debt/detail/"+id);
        }
    }

    const updateFormValue = ({updateType}: any) => {
        console.log(updateType)
    }

    const MainContent = isError ? <FailedLoad /> : (
        <div className="overflow-x-auto w-full">
                    <table className="table w-full table-pin-rows">
                        <thead>
                        <tr className={'text-center'}>
                            <th>No</th>
                            <th>Nama Pelanggan</th>
                            <th>Keterangan</th>
                            <th>Total Hutang</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            debtListFilter.map((u, k) => {
                                return(
                                    <tr key={u.id} className={'text-center'}>
                                        <td>{k + 1}</td>
                                        <td>
                                            {u.customerName}
                                        </td>
                                        <td>{u.isPaidOff ?
                                            <div className={'badge badge-success lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>Sudah Lunas</div> :
                                            <div className={'badge badge-error lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>Belum Lunas</div>
                                        }</td>
                                        <td>{convertCurrency("Rp", u.debtAmount)}</td>
                                        <td className={'flex items-center justify-center'}>
                                            <button className="btn btn-square btn-ghost" onClick={() => handleAddOrDetail(u.id)}><EyeIcon className="w-5"/></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    {!debtListFilter || debtListFilter.length < 1 && (
                        <div className={'w-full flex justify-center items-center'}>
                            Data tidak ditemukan
                        </div>
                    )}
                </div>
    )
    return(
        <>
            {/* <FormComponentDebt dataProducts={}/> */}
            <TitleCard
                topSideButtons={<TopSideButtons 
                    onClick={handleAddOrDetail} 
                    componentChildren={<FilterForm handleAdd={() => navigate("/note-debt/add")} 
                    updateFormValue={updateFormValue} />}/>}
                title={"Daftar Hutang"}
            >
                {isLoading ? <LoadingProcess key={1} loadingName="Mengambil data hutang" /> : MainContent}
            </TitleCard>
        </>
    )
}
