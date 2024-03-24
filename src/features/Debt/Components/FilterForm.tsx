import {useState} from "react";
import SelectBox from "../../../components/Input/SelectBox.tsx";

interface FilterFormProps {
    updateFormValue: (e:any) => void,
    handleAdd: () => void
}
export const FilterForm = ({updateFormValue, handleAdd}:FilterFormProps) => {
    const [arrange, setArrange] = useState<string>('none');

    const updateArrangeValue = (e: HTMLInputElement) => {
        const {value} = e;
        setArrange(value);
        updateFormValue(e);
    }

    const arranges = [
        {
            name: "None",
            value: "none"
        },
        {
            name: "Nama",
            value: "name"
        },
        {
            name: "Nominal",
            value: "price"
        }
    ]

    const sorts = [
        {
            name: "Menaik",
            value: "asc"
        },
        {
            name: "Menurun",
            value: "desc"
        }
    ]

    return(
        <div className={'flex flex-row gap-2 items-end'}>
            <SelectBox defaultValue={arrange} selectStyle={'select-sm'} containerStyle={'sm'} labelStyle={'font-normal'} placeholder={''} labelTitle={"Sortir Berdasarkan"} options={arranges} updateFormValue={updateArrangeValue} />
            {arrange !== 'none' && (
                <SelectBox defaultValue={'asc'} selectStyle={'select-sm'} containerStyle={'sm'} labelStyle={'font-normal'} placeholder={''} labelTitle={"Urutan"} options={sorts} updateFormValue={updateFormValue} />
            )}
            <button className={'btn btn-primary btn-sm'} onClick={handleAdd}>Tambah</button>
        </div>
    )
}