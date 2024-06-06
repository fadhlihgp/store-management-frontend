import React from "react";

interface FilterFormProps {
    updateFormValue?: (e:React.ChangeEvent<HTMLSelectElement>) => void,
    handleAdd: () => void
}
export const FilterForm = ({updateFormValue, handleAdd}:FilterFormProps) => {

    return(
        <div className={'flex flex-row gap-2 items-end'}>
            <select className="select select-bordered select-sm" name="year" onChange={updateFormValue}>
                        <option disabled selected>Pilih Filter</option>
                        <option value={"none"}>Semua</option>
                        <option value={"true"}>Sudah Lunas</option>
                        <option value={"false"}>Belum Lunas</option>
                    </select>
            <button className={'btn btn-primary btn-sm'} onClick={handleAdd}>Tambah</button>
        </div>
    )
}
