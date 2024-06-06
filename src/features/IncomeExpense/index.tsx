import TitleCard from "../../components/Cards/TitleCard.tsx";
import {TopSideButtons} from "../../components/Input/TopSideButtons.tsx";
import {convertCurrency} from "../../utils/convertCurrency.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {FormComponentInEx} from "./Components/FormComponentInEx";
import React, {useEffect, useState} from "react";
import moment from "moment";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {FilterFormInEx} from "./Components/FilterFormInEx";
import { useDeleteNoteIncomeExpenseMutation, useGetNoteIncomeExpensesQuery } from "../../apps/services/noteIncomeExpenseApi.ts";
import { IIncomeExpenseResponse } from "../../utils/interfaces.ts";
import { showOrCloseModal } from "../../utils/showModalHelper.ts";
import FailedLoad from "../../components/OtherDisplay/FailedLoad.tsx";
import { LoadingProcess } from "../../components/Loading/LoadingProcess.tsx";
import { ConfirmationModal } from "../../components/Modals/ConfirmationModal.tsx";
import toast from "react-hot-toast";
import { PaginationComponent } from "../../components/Pagination.tsx";

export interface FilterNoteInEx {
    month: number,
    year: number,
    type: string
}

export const IncomeExpenseContainer = () => {
    const [inExId, setInExId] = useState<string>("-1");
    const {data: incomeExpenses, isSuccess, isLoading, isError} = useGetNoteIncomeExpensesQuery();
    const [incomeExepensesFilter, setIncomeExpensesFilter] = useState<IIncomeExpenseResponse[]>();
    const [deleteNote] = useDeleteNoteIncomeExpenseMutation();
    const [filter, setFilter] = useState<FilterNoteInEx>({
        month: 99,
        type: "none",
        year:99
    });

    useEffect(() => {
        if (isSuccess) {
            setIncomeExpensesFilter(incomeExpenses.data);
        }
    }, [incomeExpenses, isSuccess]);

    useEffect(() => {
        if (filter.month === 99 && filter.year === 99 && filter.type === "none") {
            setIncomeExpensesFilter(incomeExpenses?.data);
            return;
        }

        filterFunc();
    }, [filter, setFilter])

    const handleOnChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        console.log(value);
        setFilter({...filter, [name]: value});
    }

    const filterFunc = () => {
    const filters = incomeExpenses?.data.filter((item) => {
            const itemDate = new Date(item.date);
            const itemMonth = itemDate.getMonth();
            const itemYear = itemDate.getFullYear();
            const itemType = item.type;

            const isMonthMatch = filter.month === '99' || itemMonth === parseInt(filter.month - 1, 10);
            const isYearMatch = filter.year === '99' || itemYear === parseInt(filter.year, 10);
            const isTypeMatch = filter.type === 'none' || itemType === (filter.type === "true");
            return isMonthMatch && isYearMatch && isTypeMatch;
        });
        setIncomeExpensesFilter(filters)
    }

    const handleAddOrEdit = (id: string = "-1") => {
        // const modal = document.getElementById('form-income-expense');
        if (id === "-1") {
            // Set CSS property top to 0 to make modal appear from the top
            // modal.style.top = "0";
            showOrCloseModal("form-income-expense", "show");
        } else {
            setInExId(id);
            showOrCloseModal("form-income-expense", "show");
        }
    }

    const handleDelete = () => {
        // console.log(inExId);
        deleteNote(inExId).unwrap()
        .then((res) => {
            console.log(res);
            toast.success(res.message);
            setInExId("-1");
            showOrCloseModal("delete-income-expense", "close");
        })
        .catch((err) => {
            toast.error(err.message ?? "Gagal menghapus data");
        })
    }

    const showDeleteConfirm = (id: string) => {
        setInExId(id);
        showOrCloseModal("delete-income-expense", "show");
    } 

    const MainContent = isError ? <FailedLoad /> : (
        <>
        {incomeExepensesFilter && (
            <PaginationComponent
                data={incomeExepensesFilter}
                itemsPerPage={15}
                titleTables={["No", "Tanggal", "Nominal", "Jenis", "Catatan", "Aksi"]}
                renderTitle={(item, index) => (
                    <th key={index} className="text-center">{item}</th>
                )} 
                renderItem={(u, k) => (
                    <tr key={k} className={'text-center'}>
                        <td>{k + 1}</td>
                        <td>
                            {moment(u.date).format("DD MMM YYYY")}
                        </td>
                        <td>{convertCurrency("Rp", u.amount)}</td>
                        <td>{u.type ?
                            <div className={'badge badge-success lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>Pemasukkan</div> :
                            <div className={'badge badge-error lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>pengeluaran</div>
                        }</td>
                        <td>{u.note ?? "-"}</td>
                        <td className={'flex items-center justify-center'}>
                            <button className="btn btn-square btn-ghost" onClick={() => handleAddOrEdit(u.id)}><PencilSquareIcon className="w-5"/></button>
                            <button className="btn btn-square btn-ghost" onClick={() => showDeleteConfirm(u.id)}><TrashIcon className="w-5"/></button>
                        </td>
                    </tr>
                )}
            />
        )}
        </>
    )

    return(
        <>
            <ConfirmationModal 
                id="delete-income-expense" 
                title="Konfirmasi hapus catatan pemasukkan/pengeluaran" 
                message="Data yang sudah dihapus tidak dapat dikembalikan. Anda yakin ?"
                onClickYes={handleDelete}
            />
            <FormComponentInEx incomeExpenseId={inExId} setIncomeExpenseId={setInExId} incomeExpenses={incomeExpenses?.data}/>
            <TitleCard
                topSideButtons=
                    {<TopSideButtons
                        onClick={handleAddOrEdit}
                        showInput={false}
                        componentChildren={
                            <FilterFormInEx 
                                handleAdd={() => handleAddOrEdit("-1")} 
                                handleOnChangeSelect={handleOnChangeFilter}
                            />
                        }/> 
                    }
                title={"Daftar Pemasukkan & Pengeluaran"}
            >
                <div className="overflow-x-auto w-full">
                {isLoading ? <LoadingProcess key={"1"} loadingName="Memproses data pengeluaran dan pemasukan" /> : MainContent}
                </div>
            </TitleCard>
        </>
    )
}
