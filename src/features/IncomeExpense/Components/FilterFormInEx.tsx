import {months, years} from "../dummy";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import {PlusIcon} from "@heroicons/react/16/solid";
import {PrinterIcon} from "@heroicons/react/24/solid";

interface FilterFormInExProps {
    handleAdd: () => void
}
export const FilterFormInEx = ({handleAdd}:FilterFormInExProps) => {
    return(
        <div className={'flex flex-row gap-2 items-end'}>
            <label className="inline-block sm">
                <div className="label">
                    <span className="label-text">Filter Bulan</span>
                </div>
                <select className="select select-bordered select-sm">
                    <option disabled selected>Pilih Bulan</option>
                    {months.map(m => (
                        <option value={m.value}>{m.name}</option>
                    ))}
                </select>
            </label>

            <label className="inline-block sm">
                <div className="label">
                    <span className="label-text">Filter Tahun</span>
                </div>
                <select className="select select-bordered select-sm">
                    <option disabled selected>Pilih Tahun</option>
                    <option>Semua</option>
                    {years.map(y => (
                        <option value={y}>{y}</option>
                    ))}
                </select>
            </label>

            <label className="inline-block sm">
                <div className="label">
                    <span className="label-text">Filter Status</span>
                </div>
                <select className="select select-bordered select-sm">
                    <option disabled selected>Pilih Status</option>
                    <option>Semua</option>
                    <option>Pemasukkan</option>
                    <option>Pengeluaran</option>
                </select>
            </label>


            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-sm btn-primary text-slate-100">
                    Aksi <ChevronDownIcon className={'h-5 w-5 ml-2'} />
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box z-10 ">
                    <li onClick={() => {
                        document.getElementById('form-debt').showModal()
                    }}><button><PlusIcon className={'h-5 w-5'} /> Tambah</button></li>
                    <li><button><PrinterIcon className={'h-5 w-5'} /> Cetak</button></li>
                </ul>
            </div>
        </div>
    )
}
