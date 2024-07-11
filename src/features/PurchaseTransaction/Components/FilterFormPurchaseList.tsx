import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import {PlusIcon} from "@heroicons/react/16/solid";
import {PrinterIcon} from "@heroicons/react/24/solid";
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import InputText from "../../../components/Input/InputText";

interface FilterFormPurchaseList {
    handleAdd: () => void,
    dateValue: {startDate: Date, endDate: Date},
    setDateValue: React.Dispatch<React.SetStateAction<{startDate: Date, endDate: Date}>>,
    updateSearchValue: (value:string) => void,
    handlePrint: () => void
}

export const FilterFormPurchaseList = ({handleAdd, handlePrint, dateValue, setDateValue, updateSearchValue}:FilterFormPurchaseList) => {
    // const [dateValue, setDateValue] = useState({
    //     startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    //     endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    // });

    const handleDatePickerValueChange = (newValue:any) => {
        console.log("newValue:", newValue);
        setDateValue(newValue);
        // updateDashboardPeriod(newValue);
        console.log(newValue)
    }
    
    return(
        <div className={'flex sm:flex-row flex-col gap-2 items-center'}>
            <div>
                <InputText 
                    placeholder="cari pelanggan, invoice"
                    updateFormValue={updateSearchValue}
                />
            </div>
            <div className="flex flex-row gap-2 items-end">
                <div className="">
                    <div className="label">
                        <span className="label-text">Filter Tanggal</span>
                    </div>         
                    <Datepicker
                        containerClassName="w-64"
                        value={dateValue}
                        inputClassName="input input-bordered w-64"
                        popoverDirection={"down"}
                        toggleClassName="invisible"
                        onChange={handleDatePickerValueChange}
                        showShortcuts={true}
                    />
                </div>
            </div>

            <div className="flex flex-row gap-2 items-end">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-md w-48 btn-primary text-slate-100">
                        Aksi <ChevronDownIcon className={'h-5 w-5 ml-2'} />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box z-10 ">
                        <li onClick={handleAdd}><button><PlusIcon className={'h-5 w-5'} /> Buat Transaksi</button></li>
                        <li onClick={handlePrint}><button><PrinterIcon className={'h-5 w-5'} /> Cetak</button></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
