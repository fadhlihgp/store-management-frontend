import{ useState } from 'react'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

interface IOption {
    name: string | number,
    value?: string | number,
    id?: string | number
}

interface SelectBox2Props {
    labelTitle: string,
    labelDescription?: string,
    // defaultValue?: string,
    value: any,
    name: string,
    containerStyle?: string,
    placeholder?: string,
    labelStyle?: string,
    options: IOption[],
    updateType?:any,
    handleOnChange: (e:any) => void,
    selectStyle?: string
}

function SelectBox2({labelTitle, selectStyle, handleOnChange, labelDescription, value, name, containerStyle, placeholder, labelStyle, options}: SelectBox2Props){

    return (
        <div className={`inline-block ${containerStyle}`}>
            <label  className={`label  ${labelStyle}`}>
                <div className="label-text">{labelTitle}
                    {labelDescription && <div className="tooltip tooltip-right" data-tip={labelDescription}><InformationCircleIcon className='w-4 h-4'/></div>}
                </div>
            </label>

            <select className={`select select-bordered w-full ${selectStyle}`} value={value} name={name} onChange={handleOnChange}>
                <option disabled value="">{placeholder}</option>
                {
                    options.map((o, k) => {
                        return <option value={o.id || o.value} key={k}>{o.name}</option>
                    })
                }
            </select>
        </div>
    )
}

export default SelectBox2
