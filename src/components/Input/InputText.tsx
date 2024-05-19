import { useState } from "react"

interface InputTextProps {
    labelTitle: string,
    labelStyle?: string,
    type?: string,
    containerStyle?: string,
    defaultValue?: any,
    placeholder?: string,
    updateFormValue: (e: any) => void,
    updateType?: any,
    isRequired?: boolean
}

function InputText({labelTitle, isRequired = false, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType}: InputTextProps){

    const [value, setValue] = useState<string | number>(defaultValue)

    const updateInputValue = (val: string): void => {
        setValue(val)
        updateFormValue({updateType, value : val})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input required={isRequired} type={type || "text"} value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)} className="input  input-bordered w-full " />
        </div>
    )
}


export default InputText
