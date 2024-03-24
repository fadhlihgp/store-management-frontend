import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {IDebtDetail} from "../../../utils/TableDataType.ts";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {BadgeComponent} from "../../../components/Badges/BadgeComponent.tsx";
import {MaximumWordLength} from "../../../utils/MaximumWordLength.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import SelectBox from "../../../components/Input/SelectBox.tsx";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import {PlusIcon} from "@heroicons/react/16/solid";
import {PrinterIcon} from "@heroicons/react/24/solid";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import moment from "moment";
import InputText2 from "../../../components/Input/InputText2.tsx";

interface TopSideSortProps {
    updateFormValue: (e:any) => void
}
const TopSideSort = ({updateFormValue}: TopSideSortProps) => {
    const navigate = useNavigate();
    const [arrange, setArrange] = useState<string>('none');

    const updateArrangeValue = (e: HTMLInputElement) => {
        const {value} = e;
        setArrange(value);
        updateFormValue(e);
    }

    const arranges = [
        {
            name: "Semua",
            value: "none"
        },
        {
            name: "Januari",
            value: "1"
        },
        {
            name: "Februari",
            value: "2"
        },
        {
            name: "Maret",
            value: "3"
        },
        {
            name: "April",
            value: "4"
        },
        {
            name: "Mei",
            value: "5"
        },
        {
            name: "Juni",
            value: "6"
        },
        {
            name: "Juli",
            value: "7"
        },
        {
            name: "Agustus",
            value: "8"
        },
        {
            name: "September",
            value: "9"
        },
        {
            name: "Oktober",
            value: "10"
        },
        {
            name: "November",
            value: "11"
        },
        {
            name: "Desember",
            value: "12"
        }
    ]

    const sorts = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];


    return(
        <div className={'flex flex-row gap-2 items-end'}>
            <SelectBox defaultValue={arrange} selectStyle={'select-sm'} containerStyle={'sm'} labelStyle={'font-normal'} placeholder={''} labelTitle={"Filter Bulan"} options={arranges} updateFormValue={updateArrangeValue} />
            {/*<SelectBox defaultValue={'asc'} selectStyle={'select-sm'} containerStyle={'sm'} labelStyle={'font-normal'} placeholder={''} labelTitle={"Filter Tahun"} options={sorts} updateFormValue={updateFormValue} />*/}
            <div className={`inline-block sm`}>
                <label  className={`label font-normal`}>
                    <div className="label-text">Pilih Tahun
                    </div>
                </label>

                <select className={`select select-bordered w-full select-sm`} onChange={(e) => updateValue(e.target.value)}>
                    <option disabled>Filter Tahun</option>
                    <option value={0}>Semua</option>
                    {sorts.map(s => (
                        <option value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <div className={`inline-block sm`}>
                <label  className={`label font-normal`}>
                    <div className="label-text">Filter Status
                    </div>
                </label>

                <select className={`select select-bordered w-full select-sm`} onChange={(e) => updateValue(e.target.value)}>
                    <option disabled>Pilih Status</option>
                    <option value={0}>Semua</option>
                    <option value={0}>Sudah Dibayar</option>
                    <option value={0}>Belum Dibayar</option>
                </select>
            </div>


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
            {/*<button className={'btn btn-primary btn-sm'} onClick={() => {*/}
            {/*    document.getElementById('form-debt').showModal()*/}
            {/*}}>Tambah</button>*/}
        </div>
    )
}

interface DebtListDetailProps {
    debtDetails?: IDebtDetail[],
    showEdited?: boolean,
    handleAddOrEdit?:() => void,
    handleDelete?: () => void
}

export const DebtListDetail = ({debtDetails, showEdited = false, handleAddOrEdit, handleDelete}: DebtListDetailProps) => {
    const updateFormValue = ({updateType}: any) => {
        console.log(updateType)
    }

    return(
        <TitleCard
            title="Daftar Hutang"
            topMargin="mt-2"
            topSideButtons={(showEdited && handleAddOrEdit) && (
                <TopSideSort updateFormValue={updateFormValue}  />
            )}
        >

            {/* Leads List in table format loaded from slice after api call */}
            <div className="overflow-x-auto">
                <table className="table table-zebra table-auto">
                    <thead>
                    <tr className={'text-center'}>
                        <th>No</th>
                        <th>Produk</th>
                        <th>Jumlah</th>
                        <th>Satuan</th>
                        <th>Harga</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Tanggal</th>
                        <th>Catatan</th>
                        {showEdited && (
                            <th>Aksi</th>
                        )}
                        <th>Pilih</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        debtDetails?.map((u, k) => {
                            return(
                                <tr key={k} className={'text-center'}>
                                    <td>{k + 1}</td>
                                    <td>{MaximumWordLength(u.productName, 25)}</td>
                                    <td>{u.count}</td>
                                    <td>{u.unit}</td>
                                    <td>
                                        {convertCurrency("Rp", u.price)}
                                    </td>
                                    <td>{u.count * u.price}</td>
                                    <td>
                                        {u.isPaid ?
                                            <BadgeComponent titleBadge={"Lunas"} /> :
                                            <BadgeComponent titleBadge={'Belum'} styleBadge={'badge-error'} />
                                        }
                                    </td>
                                    <td>{moment(u.debtDate).format("DD MMM YY")}</td>
                                    <td>
                                        {MaximumWordLength(u.note ?? "-", 20)}
                                    </td>
                                    {showEdited && (
                                        <td className={'flex items-center justify-center'}>
                                            <button className="btn btn-square btn-ghost" onClick={handleAddOrEdit}><PencilSquareIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={handleDelete}><TrashIcon className="w-5"/></button>
                                        </td>
                                    )}
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                {!debtDetails && (
                    <div className={'flex w-full justify-center items-center font-semibold mt-2'}>
                        Tidak ada data hutang
                    </div>
                )}
            </div>
            {debtDetails && (
                <div className={'w-full flex justify-between mt-3'}>
                    <div className={'font-semibold'}>Total Hutang: Rp 2000000</div>
                    <div className={'font-semibold'}>
                        <p>Total dipilih: - </p>
                        <button className={'btn btn-success text-slate-100 btn-sm'} onClick={() => document.getElementById("pay-debt").showModal()}>Bayar Hutang</button>
                    </div>
                </div>
            )}
        </TitleCard>
    )
}
