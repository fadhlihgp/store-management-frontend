import{ useState } from 'react'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

interface IOption {
    name: string | number,
    value?: string | number,
    id? : string | number | undefined
}

interface SelectBoxProps {
    labelTitle: string,
    labelDescription?: string,
    defaultValue?: string,
    containerStyle?: string,
    placeholder?: string,
    labelStyle?: string,
    options?: IOption[],
    updateType?:any,
    updateFormValue: (e:any) => void,
    selectStyle?: string,
    isDisabled?: boolean
}

function SelectBox({labelTitle, selectStyle, isDisabled = false, labelDescription, defaultValue, containerStyle, placeholder, labelStyle, options, updateType, updateFormValue}: SelectBoxProps){

    // const {labelTitle, labelDescription, defaultValue, containerStyle, placeholder, labelStyle, options, updateType, updateFormValue} = props

    const [value, setValue] = useState(defaultValue || "")


    const updateValue = (newValue: any) =>{
        updateFormValue({updateType, value : newValue})
        setValue(newValue)
    }


    return (
        <div className={`inline-block ${containerStyle}`}>
            <label  className={`label  ${labelStyle}`}>
                <div className="label-text">{labelTitle}
                {labelDescription && <div className="tooltip tooltip-right" data-tip={labelDescription}><InformationCircleIcon className='w-4 h-4'/></div>}
                </div>
            </label>

            <select className={`select select-bordered w-full ${selectStyle}`} disabled={isDisabled} value={value} onChange={(e) => updateValue(e.target.value)}>
                <option disabled value="">{placeholder}</option>
                {
                    options?.map((o, k) => {
                        return <option value={ o.id || o.name} key={k}>{o.name}</option>
                    })
                }
            </select>
        </div>
    )
}

export default SelectBox
