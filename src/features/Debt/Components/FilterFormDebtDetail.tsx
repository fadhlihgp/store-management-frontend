import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import {PlusIcon} from "@heroicons/react/16/solid";
import {PrinterIcon} from "@heroicons/react/24/solid";
import React from "react";
import { months, years } from "../../IncomeExpense/dummy";

interface FilterFormDebtDetail {
    handleAdd: () => void,
    handleOnChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const FilterFormDebtDetail = ({handleAdd, handleOnChangeSelect}:FilterFormDebtDetail) => {
    return(
        <div className={'flex sm:flex-row flex-col gap-2 items-end'}>
            <div className="flex flex-row gap-2 items-end">

                <label className="inline-block sm">
                    <div className="label">
                        <span className="label-text">Filter Bulan</span>
                    </div>
                    <select className="select select-bordered select-sm" onChange={handleOnChangeSelect} name="month">
                        <option disabled selected>Pilih Bulan</option>
                        <option value={99}>Semua</option>
                        {months.map(m => (
                            <option value={m.value}>{m.name}</option>
                        ))}
                    </select>
                </label>

                <label className="inline-block sm">
                    <div className="label">
                        <span className="label-text">Filter Tahun</span>
                    </div>
                    <select className="select select-bordered select-sm" name="year" onChange={handleOnChangeSelect}>
                        <option disabled selected>Pilih Tahun</option>
                        <option value={99}>Semua</option>
                        {years.map(y => (
                            <option value={y}>{y}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="flex flex-row gap-2 items-end">

                <label className="inline-block sm">
                    <div className="label">
                        <span className="label-text">Filter Status</span>
                    </div>
                    <select className="select select-bordered select-sm" name="type" onChange={handleOnChangeSelect}>
                        <option disabled selected>Pilih Status</option>
                        <option value={"none"}>Semua</option>
                        <option value={"true"}>Sudah Lunas</option>
                        <option value={"false"}>Belum Lunas</option>
                    </select>
                </label>


                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-sm w-28 btn-primary text-slate-100">
                        Aksi <ChevronDownIcon className={'h-5 w-5 ml-2'} />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box z-10 ">
                        <li onClick={handleAdd}><button><PlusIcon className={'h-5 w-5'} /> Tambah</button></li>
                        <li><button><PrinterIcon className={'h-5 w-5'} /> Cetak</button></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
