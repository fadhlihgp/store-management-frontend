import React from "react";
import { months, years } from "../../IncomeExpense/dummy";
import { showOrCloseModal } from "../../../utils/showModalHelper";

interface FilterFormDebtDetail {
    handleFilter: () => void,
    handleReset: () => void,
    title: string,
    id: string,
    handleOnChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const FilterFormDebtDetail = ({handleFilter, handleReset, handleOnChangeSelect, title, id}: FilterFormDebtDetail) => {

    const reset = () => {
        // setMonth(months[0])
        const monthSelect = document.querySelector('select[name="month"]') as HTMLSelectElement
        monthSelect.value = "99"
        const yearSelect = document.querySelector('select[name="year"]') as HTMLSelectElement
        yearSelect.value = "99"
        const typeSelect = document.querySelector('select[name="type"]') as HTMLSelectElement
        typeSelect.value = "none"
        handleReset()
    }

    return(
        <dialog id={id} className="modal modal-bottom sm:modal-middle">
            <div className={'modal-box w-1/2'}>
            <p className="py-2 mt-1 text-center font-bold">{title}</p>
                <div className="flex flex-col gap-2">

                    <label className="form-control sm">
                        <div className="label">
                            <span className="label-text">Filter Bulan</span>
                        </div>
                        <select className="select select-bordered select-sm" name="month" onChange={handleOnChangeSelect}>
                            {/* <option disabled selected>Pilih Bulan</option> */}
                            <option value={99}>Semua</option>
                            {months.map(m => (
                                <option value={m.value}>{m.name}</option>
                            ))}
                        </select>
                    </label>

                    <label className="form-control sm">
                        <div className="label">
                            <span className="label-text">Filter Tahun</span>
                        </div>
                        <select className="select select-bordered select-sm" name="year" onChange={handleOnChangeSelect}>
                            {/* <option disabled selected>Pilih Tahun</option> */}
                            <option value={99}>Semua</option>
                            {years.map(y => (
                                <option value={y}>{y}</option>
                            ))}
                        </select>
                    </label>

                    <label className="form-control sm">
                        <div className="label">
                            <span className="label-text">Filter Status</span>
                        </div>
                        <select className="select select-bordered select-sm" name="type" onChange={handleOnChangeSelect}>
                            {/* <option disabled selected>Pilih Status</option> */}
                            <option value={"none"}>Semua</option>
                            <option value={"true"}>Sudah Lunas</option>
                            <option value={"false"}>Belum Lunas</option>
                        </select>
                    </label>

                    <div className="flex gap-2">
                        <button onClick={handleFilter} className="btn btn-sm w-28 btn-primary text-slate-100">
                            Pilih
                        </button>
                        <button onClick={() => {
                            showOrCloseModal("filter-debt-modal", "close");
                            reset()
                        }} className="btn btn-sm w-28">
                            Reset
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-end">

{/* 
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-sm w-28 btn-primary text-slate-100">
                            Aksi <ChevronDownIcon className={'h-5 w-5 ml-2'} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box z-10 ">
                            <li onClick={handleAdd}><button><PlusIcon className={'h-5 w-5'} /> Tambah</button></li>
                            <li><button><PrinterIcon className={'h-5 w-5'} /> Cetak</button></li>
                        </ul>
                    </div> */}
                    
                </div>

            </div>
        </dialog>
    )
}
